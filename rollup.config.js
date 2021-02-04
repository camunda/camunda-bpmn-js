import nodeResolve from '@rollup/plugin-node-resolve';

import commonjs from '@rollup/plugin-commonjs';

import json from '@rollup/plugin-json';

import { terser } from 'rollup-plugin-terser';

const outputDir = 'dist';

const domains = [
  'base',
  'camunda-cloud',
  'camunda-platform'
];

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
      plugins: pgl()
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

function pgl(plugins=[]) {
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