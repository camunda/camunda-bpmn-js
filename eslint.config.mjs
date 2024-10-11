import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  build: [
    'tasks/**/*.mjs',
    '*.js',
    '*.mjs'
  ],
  dist: [ 'dist' ],
  test: [
    'test/**/*.js',
    'test/**/*.cjs'
  ]
};


export default [
  {
    'ignores': files.dist
  },
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