import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS,
  insertCSS
} from '../TestHelper';

import Modeler from '../../lib/camunda-cloud/Modeler';

import simpleXml from '../fixtures/simple.bpmn';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-cloud-modeler';

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

describe('<CamundaCloudModeler>', function() {

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
      keyboard: {
        bindTo: document
      },
      propertiesPanel: {
        parent: propertiesContainer
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