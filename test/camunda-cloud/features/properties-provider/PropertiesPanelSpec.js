import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS,
  insertCSS
} from '../../../TestHelper';

import Modeler from '../../../../lib/camunda-cloud/Modeler';

import simpleXML from '../../../fixtures/simple.bpmn';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-cloud-properties';

insertCSS(
  'properties.css',
  require('bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css').default
);

insertCSS('test.css', `
  .test-content-container {
    display: flex;
    flex-direction: row;
  }

  .modeler-container,
  .properties-container {
    height: 100%;
  }

  .modeler-container {
    width: 100%;
  }

  .properties-container {
    border-left: 1px solid #ccc;
    background: #f8f8f8;
    overflow: auto;
  }

  .properties-container:empty {
    display: none;
  }

  .properties-container .djs-properties-panel {
    padding-bottom: 70px;
    min-height:100%;
  }
`);


describe('camunda-cloud/features - PropertiesProvider', function() {

  var modelerContainer;

  var propertiesContainer;

  var modeler;

  beforeEach(function() {
    modelerContainer = document.createElement('div');
    modelerContainer.classList.add('modeler-container');

    propertiesContainer = document.createElement('div');
    propertiesContainer.classList.add('properties-container');

    const container = TestContainer.get(this);

    container.appendChild(modelerContainer);
    container.appendChild(propertiesContainer);
  });

  function createModeler(xml) {

    clearBpmnJS();

    modeler = new Modeler({
      container: modelerContainer,
      propertiesPanel: {
        parent: propertiesContainer
      },
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

  (singleStart ? it.only : it)('it should import simple process', function() {
    return createModeler(simpleXML).then(function(result) {

      expect(result.error).not.to.exist;
    });
  });

});