import TestContainer from 'mocha-test-container-support';

import {
  clearBpmnJS,
  setBpmnJS,
  insertCSS
} from 'test/TestHelper';

import {
  debounce
} from 'min-dash';

import Modeler from 'lib/base/Modeler';

import simpleXml from 'test/fixtures/simple.bpmn';

import propertiesPanelCSS from 'bpmn-js-properties-panel/dist/assets/properties-panel.css';

var singleStart = window.__env__ && window.__env__.SINGLE_START === 'base-modeler';

insertCSS(
  'properties.css',
  propertiesPanelCSS
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

describe('<BaseModeler>', function() {

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

  function createModeler(xml, options = {}) {

    clearBpmnJS();

    modeler = new Modeler({
      container: modelerContainer,
      keyboard: {
        bindTo: document
      },
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
    return createModeler(simpleXml).then(function(result) {

      expect(result.error).not.to.exist;
    });
  });


  it('should inject mandatory modules', function() {

    // when
    return createModeler(simpleXml).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get('minimap')).to.exist;
      expect(modeler.get('alignToOrigin')).to.exist;
      expect(modeler.get('signavioBehavior')).to.exist;
      expect(modeler.get('disabledCollapsedSubprocessPopupProvider')).to.exist;
      expect(modeler.get('propertiesPanel')).to.exist;
      expect(modeler.get('bpmnPropertiesProvider')).to.exist;
    });

  });


  it('should disable adjust origin', function() {

    // given
    var options = {
      disableAdjustOrigin: true
    };

    // when
    return createModeler(simpleXml, options).then(function(result) {

      var modeler = result.modeler;

      // then
      expect(modeler.get.bind(this, 'alignToOrigin')).to.throw();
    });

  });

});