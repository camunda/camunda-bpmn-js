// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'Safari' ]
var browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

module.exports = function(karma) {
  var VARIANT = process.env.VARIANT;

  var NODE_ENV = process.env.NODE_ENV;

  karma.set({

    basePath: '.',

    frameworks: [
      'mocha'
    ],

    files: [
      'dist/' + VARIANT + '.' + (NODE_ENV === 'production' ? 'production.min' : 'development') + '.js',
      { pattern: 'test/fixtures/diagram.bpmn', included: false },
      { pattern: 'dist/assets/**/*', included: false },
      'test/distro/helper.js',
      'test/distro/' + VARIANT + '.js'
    ],

    reporters: [ 'tldr' ],

    client: {
      mocha: {

        // we verify that distributions work, not how fast
        // they are; stay forgiving on slow CI machines
        timeout: 10000
      }
    },

    browsers,

    browserNoActivityTimeout: 30000,

    singleRun: true,
    autoWatch: false
  });

};
