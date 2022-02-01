import path from 'path';

import nodeResolve from '@rollup/plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';

import json from '@rollup/plugin-json';

import { terser } from 'rollup-plugin-terser';

import copy from 'rollup-plugin-copy';

const outputDir = 'dist';

const domains = [
  'base',
  'camunda-cloud',
  'camunda-platform'
];

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
    src: resolve('bpmn-js', '/dist/assets/bpmn-font/{font,css}/**'),
    dest: 'dist/assets/bpmn-font'
  },
  {
    src: resolve('diagram-js-minimap', '/assets/diagram-js-minimap.css'),
    dest: 'dist/assets'
  },
  {
    src: resolve('bpmn-js-properties-panel', '/dist/assets/properties-panel.css'),
    dest: 'dist/assets'
  },
  {
    src: resolve('bpmn-js-properties-panel', '/dist/assets/element-templates.css'),
    dest: 'dist/assets'
  }
].concat(domains.map(function(domain) {
  return {
    src: 'styles/' + domain + '-modeler.css',
    dest: 'dist/assets'
  };
}));

const distros = domains.map(function(domain) {
  return {
    input: domain + '/Modeler',
    output: domain + '-modeler'
  };
});

const configs = distros.reduce(function(configs, distro) {
  const {
    input,
    output
  } = distro;

  return [
    ...configs,
    {
      input: `./lib/${input}.js`,
      output: {
        name: 'BpmnModeler',
        file: `${outputDir}/${output}.development.js`,
        format: 'umd'
      },
      plugins: pgl([
        copyStyles(styles)
      ])
    },
    {
      input: `./lib/${input}.js`,
      output: {
        name: 'BpmnModeler',
        file: `${outputDir}/${output}.production.min.js`,
        format: 'umd'
      },
      plugins: pgl([
        terser()
      ])
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
        src: sheet.src,
        dest: sheet.dest
      };
    })
  });
}

function resolve(module, sub) {
  var pkg = require.resolve(module + '/package.json');

  return path.dirname(pkg) + sub;
}