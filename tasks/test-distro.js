var execSync = require('execa').sync;

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

  runTest('base-modeler', 'development');
  runTest('base-modeler', 'production');

  runTest('camunda-cloud-modeler', 'development');
  runTest('camunda-cloud-modeler', 'production');

  runTest('camunda-platform-modeler', 'development');
  runTest('camunda-platform-modeler', 'production');

  if (failures) {
    process.exit(1);
  }
}


test();