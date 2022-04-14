const { getAllCombinations, toKebabCase } = require('../util');

var execSync = require('execa').sync;

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

const environments = [
  'development',
  'production'
];

const testMatrix = getAllCombinations(domains, distributions, environments);

var failures = 0;

function runTest(variant, env) {

  var NODE_ENV = process.env.NODE_ENV;

  process.env.VARIANT = variant;
  process.env.NODE_ENV = env;

  console.log('[TEST] ' + variant + '@' + env);
  console.log(`[EXEC] VARIANT=${variant} NODE_ENV=${env} karma start karma.distro.js`);

  try {
    execSync('karma', [ 'start', 'karma.distro.js' ]);
  } catch (e) {
    console.error('[TEST] FAILURE ' + variant + '@' + env);
    console.error(e);

    failures++;
  } finally {
    process.env.NODE_ENV = NODE_ENV;
  }
}

function test() {

  testMatrix.forEach(function([ domain, dist, env ]) {
    runTest(`${domain}-${toKebabCase(dist)}`, env);
  });

  if (failures) {
    process.exit(1);
  }
}


test();

