import TestContainer from 'mocha-test-container-support';

import {
  query as domQuery
} from 'min-dom';

import Modeler from 'lib/camunda-cloud/Modeler';

import {
  getBpmnJS,
  clearBpmnJS,
  setBpmnJS
} from 'test/TestHelper';

import simpleXML from 'test/fixtures/simple.bpmn';


describe('camunda-cloud/features - DisableUserTasks', function() {

  let modelerContainer,
      propertiesContainer;

  function createModeler(xml, options = {}) {

    clearBpmnJS();

    const modeler = new Modeler({
      container: modelerContainer,
      keyboard: {
        bindTo: document
      },
      propertiesPanel: {
        parent: propertiesContainer
      },
      ...options
    });

    setBpmnJS(modeler);

    return modeler.importXML(xml).then(function(result) {
      return { error: null, warnings: result.warnings, modeler: modeler };
    }).catch(function(err) {
      return { error: err, warnings: err.warnings, modeler: modeler };
    });
  }

  beforeEach(function() {
    modelerContainer = document.createElement('div');
    propertiesContainer = document.createElement('div');

    const container = TestContainer.get(this);

    container.appendChild(propertiesContainer);
    container.appendChild(modelerContainer);
  });


  /**
   * @pinussilvestrus: user tasks support is currently disabled
   * Cf. https://github.com/camunda/camunda-modeler/issues/2140
   */
  it('should disable support per default', function() {
    return createModeler(simpleXML).then(function(result) {
      const modeler = result.modeler;

      const elementRegistry = modeler.get('elementRegistry'),
            popupMenu = modeler.get('popupMenu'),
            bpmnjs = modeler.get('bpmnjs'),
            selection = modeler.get('selection');

      // given
      const element = elementRegistry.get('Activity_08bosyf');

      // when
      selection.select(element);

      openPopup(element);

      // then
      expect(queryEntry(popupMenu, 'replace-with-user-task')).not.to.exist;

      expect(findTab(propertiesContainer, 'forms')).not.to.exist;

      expect(bpmnjs.get('formDefinitionBehavior')).not.to.exist;
    });
  });


  it('should enable support if configured', function() {

    return createModeler(simpleXML, { enableZeebeUserTasks: true }).then(function(result) {
      const modeler = result.modeler;

      const elementRegistry = modeler.get('elementRegistry'),
            popupMenu = modeler.get('popupMenu'),
            bpmnjs = modeler.get('bpmnjs'),
            selection = modeler.get('selection');

      // given
      const element = elementRegistry.get('Activity_08bosyf');

      // when
      selection.select(element);

      openPopup(element);

      // then
      expect(queryEntry(popupMenu, 'replace-with-user-task')).to.exist;

      expect(findTab(propertiesContainer, 'forms')).to.exist;

      expect(bpmnjs.get('formDefinitionBehavior')).to.exist;
    });
  });

});


// helper /////////////////////////

function queryEntry(popupMenu, id) {
  return domQuery('[data-id="' + id + '"]', popupMenu._current.container);
}

function openPopup(element, offset) {
  offset = offset || 100;

  getBpmnJS().invoke(function(popupMenu) {

    popupMenu.open(element, 'bpmn-replace', {
      x: element.x + offset, y: element.y + offset
    });

  });
}

function findTab(container, tabName) {
  return domQuery(`div[data-tab="${tabName}"]`, container);
}
