
import {
  bootstrapModeler,
  inject,
  triggerEvent,
  triggerValue
} from 'test/TestHelper';

import TestContainer from 'mocha-test-container-support';

import propertiesPanelModule from 'bpmn-js-properties-panel';

import {
  query as domQuery
} from 'min-dom';

import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import extensionElementsHelper from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper';

import coreModule from 'bpmn-js/lib/core';

import selectionModule from 'diagram-js/lib/features/selection';

import modelingModule from 'bpmn-js/lib/features/modeling';

import propertiesProviderModule from 'lib/camunda-cloud/features/properties-provider';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';

import diagramXML from './Task.bpmn';


describe('camunda-cloud/features/properties-provider - headers property tab', function() {

  const testModules = [
    coreModule, selectionModule, modelingModule,
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
    modules: testModules,
    moddleExtensions
  }));


  beforeEach(inject(function(commandStack, propertiesPanel) {

    const undoButton = document.createElement('button');
    undoButton.textContent = 'UNDO';

    undoButton.addEventListener('click', () => {
      commandStack.undo();
    });

    container.appendChild(undoButton);

    propertiesPanel.attachTo(container);
  }));

  describe('create', function() {

    let bo;

    beforeEach(inject(function(elementRegistry, selection) {

      const shape = elementRegistry.get('Task_1');
      selection.select(shape);

      bo = getBusinessObject(shape);

      // assume
      expect(getTaskHeaders(bo)).to.be.empty;

      // when
      clickAddHeaderButton(container);

    }));

    it('should execute', function() {

      // then
      expect(getTaskHeaders(bo)).to.exist;

    });


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      expect(getTaskHeaders(bo)).to.be.empty;

    }));

    it('should redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      expect(getTaskHeaders(bo)).to.exist;

    }));

  });


  describe('update', function() {

    let input, header;

    beforeEach(inject(function(elementRegistry, selection) {

      // given
      const shape = elementRegistry.get('Task_2');
      selection.select(shape);

      const bo = getBusinessObject(shape);

      const taskHeaders = getTaskHeaders(bo);

      header = getTaskHeader(taskHeaders);

      // assume
      expect(header).to.exist;

      input = getInputField(container, 'camunda-table-row-cell-input-value', 'key');

      // when
      triggerValue(input, 'foo', 'change');

    }));

    describe('in the DOM', function() {

      it('should execute', function() {

        // then
        expect(input.value).to.equal('foo');
      });


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(input.value).to.equal('key');
      }));


      it('should redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(input.value).to.equal('foo');
      }));


      describe('on the business object', function() {

        it('should execute', function() {

          // then

          expect(header.key).to.equal('foo');
        });


        it('should undo', inject(function(commandStack) {

          // when
          commandStack.undo();

          // then
          expect(header.key).to.equal('key');
        }));


        it('should redo', inject(function(commandStack) {

          // when
          commandStack.undo();
          commandStack.redo();

          // then
          expect(header.key).to.equal('foo');
        }));

      });

    });

  });


  describe('remove', function() {

    let bo;

    beforeEach(inject(function(elementRegistry, selection) {

      const shape = elementRegistry.get('Task_2');
      selection.select(shape);

      bo = getBusinessObject(shape);

      const taskHeaders = getTaskHeaders(bo);

      // assume
      expect(getTaskHeader(taskHeaders)).to.exist;

      // when
      clickDeleteHeaderButton(container);

    }));

    it('should execute', function() {

      // then
      expect(getTaskHeaders(bo)).to.be.empty;

    });


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      const taskHeaders = getTaskHeaders(bo);

      // then
      expect(getTaskHeader(taskHeaders)).to.exist;

    }));

    it('should redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      expect(getTaskHeaders(bo)).to.be.empty;

    }));

  });

});


// helper /////////

const getTaskHeader = (headers) => {
  if (headers.length <= 0) {
    return;
  }

  return (headers[0].values || [])[0];
};

const getTaskHeaders = (bo) => {
  return extensionElementsHelper.getExtensionElements(bo, 'zeebe:TaskHeaders');
};

const getHeadersTab = (container) => {
  return domQuery('div[data-tab="headers"]', container);
};

const getDeleteHeaderButton = (container) => {
  return domQuery('button[data-action="deleteElement"]', getHeadersTab(container));
};

const clickDeleteHeaderButton = (container) => {
  const deleteButton = getDeleteHeaderButton(container);
  triggerEvent(deleteButton, 'click');
};

const getAddHeaderButton = (container) => {
  return domQuery('button[data-action="addElement"]', getHeadersTab(container));
};

const clickAddHeaderButton = (container) => {
  const addButton = getAddHeaderButton(container);
  triggerEvent(addButton, 'click');
};

const getDetailsGroup = (container) => {
  const tab = getHeadersTab(container);
  return domQuery('div[data-group="details"]', tab);
};

const getEntry = (container, entryId) => {
  return domQuery('div[data-entry="' + entryId + '"]', getDetailsGroup(container));
};

const getInputField = (container, entryId, inputName) => {
  const selector = 'input' + (inputName ? '[name="' + inputName + '"]' : '');
  return domQuery(selector, getEntry(container, entryId));
};