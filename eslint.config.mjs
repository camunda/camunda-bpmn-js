import bpmnIoPlugin from 'eslint-plugin-bpmn-io';
import camundaLicensedPlugin from 'eslint-plugin-camunda-licensed';


const files = {
  sources: [
    'lib/**/*.js',
  ],
  build: [
    'tasks/**/*.mjs',
    '*.js',
    '*.mjs'
  ],
  test: [
    'test/**/*.js',
    'test/**/*.cjs'
  ],
  ignored: [
    'dist'
  ]
};


export default [
  {
    'ignores': files.ignored
  },
  ...camundaLicensedPlugin.configs.mit.map((config) => {
    return {
      ...config,
      files: files.sources
    };
  }),
  ...bpmnIoPlugin.configs.browser.map(config => {

    return {
      ...config,
      ignores: files.build
    };
  }),
  ...bpmnIoPlugin.configs.node.map(config => {

    return {
      ...config,
      files: files.build
    };
  }),
  ...bpmnIoPlugin.configs.mocha.map(config => {

    return {
      ...config,
      files: files.test
    };
  })
];
