
import {
  bootstrapModeler,
  inject
} from 'test/TestHelper';

import TestContainer from 'mocha-test-container-support';

import propertiesPanelModule from 'bpmn-js-properties-panel';

import {
  query as domQuery,
  classes as domClasses
} from 'min-dom';

import coreModule from 'bpmn-js/lib/core';

import selectionModule from 'diagram-js/lib/features/selection';

import modelingModule from 'bpmn-js/lib/features/modeling';

import propertiesProviderModule from 'lib/camunda-cloud/features/properties-provider';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';

import diagramXML from './PropertiesProvider.bpmn';


describe('camunda-cloud/features - PropertiesProvider', function() {

  const modules = [
    coreModule,
    selectionModule,
    modelingModule,
    propertiesPanelModule,
    propertiesProviderModule
  ];

  const moddleExtensions = {
    zeebe: zeebeModdleExtensions
  };

  let container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });

  beforeEach(bootstrapModeler(diagramXML, {
    modules,
    moddleExtensions
  }));

  beforeEach(inject(function(propertiesPanel) {
    propertiesPanel.attachTo(container);
  }));

  describe('general tab', function() {

    it('should show general group', inject(function(selection, elementRegistry) {

      // given
      const shape = elementRegistry.get('ServiceTask_1');

      // when
      selection.select(shape);

      // then
      shouldHaveGroup(container, 'general', 'general');
    }));


    it('should show details group', inject(function(selection, elementRegistry) {

      // given
      const shape = elementRegistry.get('ServiceTask_1');

      // when
      selection.select(shape);

      // then
      shouldHaveGroup(container, 'general', 'details');
    }));


    it('should show multi instance group', inject(function(selection, elementRegistry) {

      // given
      const shape = elementRegistry.get('ServiceTask_1');

      // when
      selection.select(shape);

      // then
      shouldHaveGroup(container, 'general', 'multiInstance');
    }));

  });


  describe('forms tab', function() {

    it('should show forms group', inject(function(selection, elementRegistry) {

      // given
      const shape = elementRegistry.get('UserTask_1');

      // when
      selection.select(shape);

      // then
      shouldHaveGroup(container, 'forms', 'forms-properties');
    }));

  });


  describe('headers tab', function() {

    it('should show headers group', inject(function(selection, elementRegistry) {

      // given
      const shape = elementRegistry.get('ServiceTask_1');

      // when
      selection.select(shape);

      // then
      shouldHaveGroup(container, 'headers', 'headers-properties');
    }));

  });


  describe('input output tab', function() {

    describe('input and output group', function() {

      it('should show for serviceTasks', inject(function(selection, elementRegistry) {

        // given
        const shape = elementRegistry.get('ServiceTask_1');

        // when
        selection.select(shape);

        // then
        shouldHaveGroup(container, 'input', 'input');
        shouldHaveGroup(container, 'output', 'output');
      }));


      it('should show for sendTasks', inject(function(selection, elementRegistry) {

        // given
        const shape = elementRegistry.get('SendTask_1');

        // when
        selection.select(shape);

        // then
        shouldHaveGroup(container, 'input', 'input');
        shouldHaveGroup(container, 'output', 'output');
      }));


      it('should show for scriptTasks', inject(function(selection, elementRegistry) {

        // given
        const shape = elementRegistry.get('ScriptTask_1');

        // when
        selection.select(shape);

        // then
        shouldHaveGroup(container, 'input', 'input');
        shouldHaveGroup(container, 'output', 'output');
      }));


      it('should show for businessRuleTasks', inject(function(selection, elementRegistry) {

        // given
        const shape = elementRegistry.get('BusinessRuleTask_1');

        // when
        selection.select(shape);

        // then
        shouldHaveGroup(container, 'input', 'input');
        shouldHaveGroup(container, 'output', 'output');
      }));


      it('should show for callActivity', inject(function(selection, elementRegistry) {

        // given
        const shape = elementRegistry.get('CallActivity_1');

        // when
        selection.select(shape);

        // then
        shouldHaveGroup(container, 'input', 'input');
        shouldHaveGroup(container, 'output', 'output');
      }));


      it('should show for subProcess', inject(function(selection, elementRegistry) {

        // given
        const shape = elementRegistry.get('SubProcess_1');

        // when
        selection.select(shape);

        // then
        shouldHaveGroup(container, 'input', 'input');
        shouldHaveGroup(container, 'output', 'output');
      }));

    });

    describe('output group but not input group', function() {

      it('should show for receiveTask', inject(function(selection, elementRegistry) {

        // given
        const shape = elementRegistry.get('ReceiveTask_1');

        // when
        selection.select(shape);

        // then
        shouldNotHaveGroup(container, 'input', 'input');
        shouldHaveGroup(container, 'output', 'output');
      }));


      it('should show for events', inject(function(selection, elementRegistry) {

        // given
        const shape = elementRegistry.get('EndEvent_1');

        // when
        selection.select(shape);

        // then
        shouldNotHaveGroup(container, 'input', 'input');
        shouldHaveGroup(container, 'output', 'output');
      }));

    });

  });

});


// helper /////////

function getTab(container, tabName) {
  return domQuery(`div[data-tab="${tabName}"]`, container);
}

function getGroup(container, tabName, groupName) {
  const tab = getTab(container, tabName);
  return domQuery(`div[data-group="${groupName}"]`, tab);
}

const shouldHaveGroup = (container, tabName, groupName) => {
  const group = getGroup(container, tabName, groupName);
  expect(group).to.exist;
  expect(domClasses(group).has('bpp-hidden')).to.be.false;
};

const shouldNotHaveGroup = (container, tabName, groupName) => {
  const group = getGroup(container, tabName, groupName);
  expect(domClasses(group).has('bpp-hidden')).to.be.true;
};
