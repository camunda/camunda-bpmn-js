import fs from 'node:fs';
import path from 'node:path';

import { getAllCombinations, toKebabCase } from './util.mjs';

import { execaSync as execSync } from 'execa';


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

const assets = [
  'bpmn-font/css/bpmn.css',
  'bpmn-font/css/bpmn-embedded.css',
  'bpmn-font/css/bpmn-codes.css',
  'base-modeler.css',
  'base-navigated-viewer.css',
  'base-viewer.css',
  'bpmn-js.css',
  'camunda-cloud-modeler.css',
  'camunda-cloud-navigated-viewer.css',
  'camunda-cloud-viewer.css',
  'camunda-platform-modeler.css',
  'camunda-platform-navigated-viewer.css',
  'camunda-platform-viewer.css',
  'diagram-js-minimap.css',
  'diagram-js.css',
  'element-templates.css',
  'properties-panel.css',
  'color-picker.css',
  'element-template-chooser.css'
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

function testAssets(assets) {
  assets.forEach(asset => {
    try {
      fs.accessSync(path.resolve('./dist/assets/', asset));
    } catch (err) {
      console.error('asset', asset, 'not found');

      failures++;
    }
  });
}

function test() {

  testMatrix.forEach(function([ domain, dist, env ]) {
    runTest(`${domain}-${toKebabCase(dist)}`, env);
  });

  testAssets(assets);

  if (failures) {
    process.exit(1);
  }
}


test();

