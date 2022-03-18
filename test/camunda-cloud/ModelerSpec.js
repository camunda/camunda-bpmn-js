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

import ElementTemplateChooserModule from '@bpmn-io/element-template-chooser';

import simpleXml from 'test/fixtures/simple.bpmn';

import propertiesPanelCSS from 'bpmn-js-properties-panel/dist/assets/properties-panel.css';
import elementTemplatesCSS from 'bpmn-js-properties-panel/dist/assets/element-templates.css';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'camunda-cloud-modeler';

var startIcons = window.__env__ && window.__env__.SINGLE_START === 'icons-demo';

insertCSS(
  'properties-panel.css',
  propertiesPanelCSS
);

insertCSS(
  'element-templates.css',
  elementTemplatesCSS
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

  function createModeler(xml, options = {}) {

    const {
      additionalModules,
      elementTemplates
    } = options;

    clearBpmnJS();

    modeler = new Modeler({
      container: modelerContainer,
      additionalModules,
      keyboard: {
        bindTo: document
      },
      propertiesPanel: {
        parent: propertiesContainer
      },
      elementTemplates
    });

    (singleStart || startIcons) && modeler.on('commandStack.changed', debounce(function() {
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
    return createModeler(require('test/fixtures/simple.bpmn').default).then(function(result) {

      expect(result.error).not.to.exist;
    });
  });


  // TODO(pinussilvestrus): remove me, demo only.
  (startIcons ? it.only : it)('integration - template icons', function() {

    // given
    var templates = require('test/fixtures/icon-templates.json');

    // when
    return createModeler(require('test/fixtures/icons.bpmn').default, {
      additionalModules: [ ElementTemplateChooserModule ],
      elementTemplates: templates
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
      expect(modeler.get('propertiesPanel')).to.exist;
      expect(modeler.get('zeebePropertiesProvider')).to.exist;
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


  it('should disable drilldown', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('disabledCollapsedSubprocessPopupProvider')).to.exist;
      expect(modeler.get('drilldownOverlayBehavior')).not.to.exist;
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


  it('should inject descriptionContextProvider', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler,
          propertiesPanel = modeler.get('propertiesPanel');

      // then
      expect(propertiesPanel._descriptionConfig).to.exist;
    });

  });

});
