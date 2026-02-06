import path from 'node:path';
import { createRequire } from 'node:module';

import nodeResolve from '@rollup/plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';

import json from '@rollup/plugin-json';

import terser from '@rollup/plugin-terser';

import copy from 'rollup-plugin-copy';

import { capitalize, getAllCombinations, toKebabCase } from './tasks/util.mjs';


const require = createRequire(import.meta.url);

const outputDir = 'dist';

const domains = [
  'base',
  'camunda-cloud',
  'camunda-platform'
];

const distributions = [
  'modeler',
  'viewer',
  'navigatedViewer'
];

const buildMatrix = getAllCombinations(domains, distributions);

const styles = [
  {
    src: resolve('bpmn-js', '/dist/assets/diagram-js.css'),
    dest: 'dist/assets'
  },
  {
    src: resolve('bpmn-js', '/dist/assets/bpmn-js.css'),
    dest: 'dist/assets'
  },
  {
    src: resolve('bpmn-js', '/dist/assets/bpmn-font/{font,css}'),
    dest: 'dist/assets/bpmn-font'
  },
  {
    src: resolve('diagram-js-minimap', '/assets/diagram-js-minimap.css'),
    dest: 'dist/assets'
  },
  {
    src: resolve('@bpmn-io/properties-panel', '/dist/assets/properties-panel.css'),
    dest: 'dist/assets'
  },
  {
    src: resolve('bpmn-js-color-picker', '/colors/color-picker.css'),
    dest: 'dist/assets'
  },
  {
    src: resolve('bpmn-js-element-templates', '/dist/assets/element-templates.css'),
    dest: 'dist/assets'
  },
  {
    src: resolve('@bpmn-io/element-template-chooser', '/dist/element-template-chooser.css'),
    dest: 'dist/assets'
  },
].concat(buildMatrix.map(function([ domain, dist ]) {
  return {
    src: `styles/${domain}-${toKebabCase(dist)}.css`,
    dest: 'dist/assets'
  };
}));

const distros = buildMatrix.map(function([ domain, dist ]) {
  return {
    name: 'Bpmn' + capitalize(dist),
    input: `${domain}/${capitalize(dist)}`,
    output: `${domain}-${toKebabCase(dist)}`
  };
});

const configs = distros.reduce(function(configs, distro) {
  const {
    input,
    output,
    name
  } = distro;

  return [
    ...configs,
    {
      input: `./lib/${input}.js`,
      output: {
        name: name,
        file: `${outputDir}/${output}.development.js`,
        format: 'umd'
      },
      plugins: pgl([
        copyStyles(styles)
      ]),
      onwarn
    },
    {
      input: `./lib/${input}.js`,
      output: {
        name: name,
        file: `${outputDir}/${output}.production.min.js`,
        format: 'umd'
      },
      plugins: pgl([
        terser()
      ]),
      onwarn
    }
  ];
}, []);

export default configs;


// helpers //////////////////////

function pgl(plugins = []) {
  return [
    nodeResolve({
      mainFields: [
        'browser',
        'module',
        'main'
      ]
    }),
    commonjs(),
    json(),
    ...plugins
  ];
}

function copyStyles(styles) {
  return copy({
    targets: styles.map(function(sheet) {
      return {
        src: pathNormalize(sheet.src),
        dest: pathNormalize(sheet.dest)
      };
    })
  });
}

function resolve(module, sub) {
  var pkg = require.resolve(module + '/package.json');

  return path.dirname(pkg) + sub;
}

function pathNormalize(string) {
  return path.normalize(string).split('\\').join('/');
}

function onwarn(warning, warn) {
  const ERRORS_TO_IGNORE = [
    'CIRCULAR_DEPENDENCY',
    'THIS_IS_UNDEFINED'
  ];

  if (ERRORS_TO_IGNORE.includes(warning.code)) {
    return;
  }

  warn(warning);
}