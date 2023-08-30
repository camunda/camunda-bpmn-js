import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS,
  insertCSS
} from 'test/TestHelper';

import {
  debounce
} from 'min-dash';

import Modeler from 'lib/camunda-platform/Modeler';

import simpleXml from 'test/fixtures/simple.bpmn';

import propertiesPanelCSS from '@bpmn-io/properties-panel/dist/assets/properties-panel.css';
import elementTemplatesCSS from 'bpmn-js-element-templates/dist/assets/element-templates.css';

import elementTemplatesChooserCSS from '@bpmn-io/element-template-chooser/dist/element-template-chooser.css';
import colorPickerCSS from 'bpmn-js-color-picker/colors/color-picker.css';

import ElementTemplateChooserModule from '@bpmn-io/element-template-chooser';

import elementTemplates from './element-templates.json';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-platform-modeler';

insertCSS(
  'properties-panel.css',
  propertiesPanelCSS
);

insertCSS(
  'element-templates.css',
  elementTemplatesCSS
);

insertCSS(
  'color-picker.css',
  colorPickerCSS
);

insertCSS(
  'element-templates-chooser.css',
  elementTemplatesChooserCSS
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

  .properties-container .bpp-properties-panel {
    padding-bottom: 70px;
    min-height: 100%;
  }
`);

describe('<CamundaPlatformModeler>', function() {

  // CI (windows) takes its time
  this.timeout(5000);

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
      },
      additionalModules: [
        ElementTemplateChooserModule
      ]
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


  (singleStart ? it.only : it)('should import simple process', async function() {
    const {
      error
    } = await createModeler(simpleXml);

    // then
    expect(error).not.to.exist;

    // but when
    modeler.get('elementTemplatesLoader').setTemplates(elementTemplates);

    // then
    // expect happy modeling
  });


  it('should inject mandatory modules', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('propertiesPanel')).to.exist;

      // behaviors
      expect(modeler.get('copyPasteBehavior')).to.exist;
      expect(modeler.get('deleteErrorEventDefinitionBehavior')).to.exist;
      expect(modeler.get('deleteRetryTimeCycleBehavior')).to.exist;
      expect(modeler.get('updateCamundaExclusiveBehavior')).to.exist;
      expect(modeler.get('updateResultVariableBehavior')).to.exist;
      expect(modeler.get('updateInputOutputBehavior')).to.exist;
      expect(modeler.get('userTaskFormsBehavior')).to.exist;
      expect(modeler.get('userTaskGeneratedFormsBehavior')).to.exist;
    });

  });


  it('should inject camunda moddle descriptors', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler,
          moddle = modeler.get('moddle');

      // then
      expect(moddle.getPackage('camunda')).to.exist;
    });

  });


  it('should inject variable resolver', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('variableResolver')).to.exist;
    });

  });

});
