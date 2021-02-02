import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS
} from '../../TestHelper';

import Modeler from '../../../lib/camunda-cloud/Modeler';

import simpleXml from '../../fixtures/simple.bpmn';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'modeler';


describe('<Modeler>', function() {

  var container;

  var modeler;

  beforeEach(function() {
    container = TestContainer.get(this);
  });

  function createModeler(xml) {

    clearBpmnJS();

    modeler = new Modeler({
      container: container,
      keyboard: {
        bindTo: document
      }
    });

    setBpmnJS(modeler);

    return modeler.importXML(xml).then(function(result) {
      return { error: null, warnings: result.warnings, modeler: modeler };
    }).catch(function(err) {
      return { error: err, warnings: err.warnings, modeler: modeler };
    });
  }

  (singleStart ? it.only : it)('should import simple process', function() {
    return createModeler(simpleXml).then(function(result) {

      expect(result.error).not.to.exist;
    });
  });

});