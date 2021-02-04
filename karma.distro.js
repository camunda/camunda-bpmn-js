// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'Safari' ]
var browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

// use puppeteer provided Chrome for testing
process.env.CHROME_BIN = require('puppeteer').executablePath();

var VARIANT = process.env.VARIANT;

var NODE_ENV = process.env.NODE_ENV;


module.exports = function(karma) {
  karma.set({

    basePath: '.',

    frameworks: [
      'mocha',
      'sinon-chai'
    ],

    files: [
      'dist/' + VARIANT + '.' + (NODE_ENV === 'production' ? 'production.min' : 'development') + '.js',
      { pattern: 'test/fixtures/diagram.bpmn', included: false },
      { pattern: 'dist/assets/**/*', included: false },
      'test/distro/helper.js',
      'test/distro/' + VARIANT + '.js'
    ],

    reporters: [ 'progress' ],

    browsers,

    browserNoActivityTimeout: 30000,

    singleRun: true,
    autoWatch: false
  });

};
