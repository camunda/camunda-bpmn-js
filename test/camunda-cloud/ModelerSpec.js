import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS,
  insertCSS
} from 'test/TestHelper';

import {
  debounce
} from 'min-dash';

import Modeler from 'lib/camunda-cloud/Modeler';

import simpleXml from 'test/fixtures/simple.bpmn';

import propertiesPanelCSS from '@bpmn-io/bpmn-properties-panel/dist/assets/properties-panel.css';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-cloud-modeler';

insertCSS(
  'properties-panel.css',
  propertiesPanelCSS
);

insertCSS('test-panel.css', `
  .test-content-container {
    display: flex;
    flex-direction: row;
  }

  .canvas {
    flex: 1;
    position: relative;
  }

  .canvas, .properties {
    overflow-y: auto;
  }

  .properties {
    font-family: sans-serif;
    position: relative;
    flex: none;
    height: 100%;
    width: 250px;
    border-left: solid 1px #cccccc;
  }
`);

describe('<CamundaCloudModeler>', function() {

  var modelerContainer;

  var propertiesContainer;

  var modeler;

  beforeEach(function() {
    modelerContainer = document.createElement('div');
    modelerContainer.classList.add('canvas');

    propertiesContainer = document.createElement('div');
    propertiesContainer.classList.add('properties');

    const container = TestContainer.get(this);

    container.appendChild(modelerContainer);
    container.appendChild(propertiesContainer);
  });

  function createModeler(xml) {

    clearBpmnJS();

    modeler = new Modeler({
      container: modelerContainer,
      keyboard: {
        bindTo: document
      },
      propertiesPanel: {
        parent: propertiesContainer
      }
    });

    singleStart && modeler.on('commandStack.changed', debounce(function() {
      modeler.saveXML({ format: true }).then(function(result) {
        console.log(result.xml);
      });
    }, 500));

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


  it('should inject mandatory modules', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('zeebePaletteProvider')).to.exist;
      expect(modeler.get('zeebeContextPadProvider')).to.exist;
      expect(modeler.get('zeebeReplaceMenuProvider')).to.exist;
      expect(modeler.get('bpmnRules')).to.exist;
      expect(modeler.get('createZeebeBoundaryEventBehavior')).to.exist;
      expect(modeler.get('createZeebeCallActivityBehavior')).to.exist;
      expect(modeler.get('updatePropagateAllChildVariablesBehavior')).to.exist;
      expect(modeler.get('zeebeModdleExtension')).to.exist;
    });

  });


  it('should inject zeebe moddle descriptors', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler,
          moddle = modeler.get('moddle');

      // then
      expect(moddle.getPackage('zeebe')).to.exist;
    });

  });

});