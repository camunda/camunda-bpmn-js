import { expect } from 'chai';

import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS,
  insertCSS
} from 'test/TestHelper';

import {
  debounce
} from 'min-dash';

import {
  query as domQuery
} from 'min-dom';

import Modeler from 'lib/camunda-cloud/Modeler';

import diagramXml from './ModelerSpec.simple.bpmn';

import simpleXml from 'test/fixtures/simple.bpmn';

import diagramJSCSS from 'diagram-js/assets/diagram-js.css';
import propertiesPanelCSS from '@bpmn-io/properties-panel/dist/assets/properties-panel.css';
import elementTemplatesCSS from 'bpmn-js-element-templates/dist/assets/element-templates.css';
import colorPickerCSS from 'bpmn-js-color-picker/colors/color-picker.css';

import elementTemplatesChooserCSS from '@bpmn-io/element-template-chooser/dist/element-template-chooser.css';

import popupMenuCSS from '../../styles/popup-menu.css';

import templates from './element-templates.json';
import resources from './resources.json';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-cloud-modeler';

// load diagram-js' own stylesheet rather than relying on the copies bundled
// into dependencies' dist output, so linked diagram-js changes are visible here
insertCSS(
  'diagram-js.css',
  diagramJSCSS
);

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

insertCSS(
  'popup-menu.css',
  popupMenuCSS
);

insertCSS('test-panel.css', `
  html {
    font-family: sans-serif;
  }

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
    position: relative;
    flex: none;
    height: 100%;
    width: 250px;
    border-left: solid 1px #cccccc;
  }
`);

describe('<CamundaCloudModeler>', function() {

  // CI (windows) takes its time
  this.timeout(5000);

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

  function createModeler(xml, additionalModules = [], options = {}) {

    clearBpmnJS();

    modeler = new Modeler({
      container: modelerContainer,
      additionalModules: [
        ...additionalModules
      ],
      propertiesPanel: {
        parent: propertiesContainer
      },
      ...options
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
    return createModeler(diagramXml).then(function(result) {

      const {
        error,
        modeler
      } = result;

      // then
      expect(error).not.to.exist;

      // but when
      modeler.get('elementTemplatesLoader').setTemplates(templates);
      modeler.get('resources').set(resources);

      // then
      // expect happy modeling
    });
  });


  it('should inject mandatory modules', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('bpmnRules')).to.exist;
      expect(modeler.get('propertiesPanel')).to.exist;
      expect(modeler.get('zeebePropertiesProvider')).to.exist;
      expect(modeler.get('elementTemplateIconRenderer')).to.exist;

      // behaviors
      expect(modeler.get('copyPasteBehavior')).to.exist;
      expect(modeler.get('cleanUpBusinessRuleTaskBehavior')).to.exist;
      expect(modeler.get('createZeebeCallActivityBehavior')).to.exist;
      expect(modeler.get('formsBehavior')).to.exist;
      expect(modeler.get('removeAssignmentDefinitionBehavior')).to.exist;
    });

  });


  describe('menu width', function() {

    it('should open the create menu at 360px', function() {

      // when
      return createModeler(simpleXml).then(function(result) {

        var palette = result.modeler.get('palette');

        // when
        palette.triggerEntry('create', 'click', { x: 0, y: 0 });

        // then
        expect(popupWidth()).to.eql('360px');
      });

    });


    it('should open the append menu at 360px', function() {

      // when
      return createModeler(simpleXml).then(function(result) {

        var modeler = result.modeler,
            contextPad = modeler.get('contextPad'),
            task = modeler.get('elementRegistry').get('Activity_08bosyf');

        contextPad.open(task);

        // when
        contextPad.triggerEntry('append', 'click', { x: 0, y: 0 });

        // then
        expect(popupWidth()).to.eql('360px');
      });

    });


    it('should open the replace menu at 360px', function() {

      // when
      return createModeler(simpleXml).then(function(result) {

        var modeler = result.modeler,
            contextPad = modeler.get('contextPad'),
            task = modeler.get('elementRegistry').get('Activity_08bosyf');

        contextPad.open(task);

        // when
        contextPad.triggerEntry('replace', 'click', { x: 0, y: 0 });

        // then
        expect(popupWidth()).to.eql('360px');
      });

    });

  });


  it('should inject element templates modules', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('elementTemplatesLoader')).to.exist;
      expect(modeler.get('elementTemplates')).to.exist;
      expect(modeler.get('elementTemplatesPropertiesProvider')).to.exist;
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


  it('should inject tooltipContextProvider', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler,
          propertiesPanel = modeler.get('propertiesPanel');

      // then
      expect(propertiesPanel._tooltipConfig).to.exist;
    });

  });


  it('should inject variable resolver', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('variableResolver')).to.exist;
      expect(modeler.get('dataPropertiesProvider')).to.exist;
    });

  });


  describe('element template chooser', function() {

    const options = {
      elementTemplateChooser: false
    };

    it('should inject element-template-chooser', function() {

      return createModeler(simpleXml).then(function(result) {
        let modeler = result.modeler;


        expect(modeler.get('elementTemplateChooser')).to.exist;
      });

    });


    it('should not inject element-template-chooser', function() {

      return createModeler(simpleXml, [], options).then(function(result) {
        let modeler = result.modeler;

        expect(modeler.get.bind(modeler, 'elementTemplateChooser')).to.throw();
      });


    });

  });


  it('should configure FEEL popup links', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler,
          config = modeler.get('config.propertiesPanel');

      // then
      expect(config.getFeelPopupLinks).to.exist;
    });

  });

});


// helpers //////////

function popupWidth() {
  return getComputedStyle(domQuery('.djs-popup')).width;
}
