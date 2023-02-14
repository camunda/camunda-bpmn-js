import {
  inject,
  getBpmnJS,
  bootstrapCamundaCloudModeler,
  createEvent
} from 'test/TestHelper';

import {
  query as domQuery
} from 'min-dom';

import diagramXML from './ElementTemplatesAppendProvider.bpmn';
import templates from './ElementTemplatesAppendProvider.json';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';


describe('<ElementTemplatesAppendProvider>', function() {

  beforeEach(bootstrapCamundaCloudModeler(diagramXML));

  beforeEach(inject(function(elementTemplates) {
    elementTemplates.set(templates);
  }));


  describe('display', function() {

    it('should display template options', inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('Task_1');

      // when
      openPopup(task);

      // then
      const entries = Object.keys(getEntries());
      const templateEntries = entries.filter((entry) => entry.startsWith('append.template-'));

      expect(templateEntries.length).to.be.greaterThan(0);
    }));


    it('should not display template for Start Event', inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('Task_1');

      // when
      openPopup(task);

      // then
      const entries = Object.keys(getEntries());
      const startEventTemplateEntry = entries.includes('append.template-example.StartEventTemplate');

      expect(startEventTemplateEntry).to.not.be.true;
    }));


    it('should not display template for Participant', inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('Task_1');

      // when
      openPopup(task);

      // then
      const entries = Object.keys(getEntries());
      const participantTemplateEntry = entries.includes('append.template-example.ParticipantTemplate');

      expect(participantTemplateEntry).to.not.be.true;
    }));


    it('should not display template for Sequence Flow', inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('Task_1');

      // when
      openPopup(task);

      // then
      const entries = Object.keys(getEntries());
      const sequenceFlowTemplateEntry = entries.includes('append.template-example.SequenceFlowTemplate');

      expect(sequenceFlowTemplateEntry).to.not.be.true;
    }));

  });


  describe('append', function() {

    it('should append template', inject(function(elementRegistry, selection) {

      // given
      const task = elementRegistry.get('Task_1');
      const template = templates[0];

      openPopup(task);

      // when
      triggerAction(`append.template-${template.id}`);

      // then
      const outgoingFlows = getBusinessObject(task).outgoing;
      const newElement = outgoingFlows[0].targetRef;

      expect(outgoingFlows).to.have.length(1);
      expect(isTemplateApplied(newElement, template)).to.be.true;
    }));


    it('should append template via dragstart', inject(function(elementRegistry, selection) {

      // given
      const task = elementRegistry.get('Task_1');
      const template = templates[0];

      openPopup(task);

      // when
      placeDragElement(task, `append.template-${template.id}`);

      // then
      const outgoingFlows = getBusinessObject(task).outgoing;
      const newElement = outgoingFlows[0].targetRef;

      expect(outgoingFlows).to.have.length(1);
      expect(isTemplateApplied(newElement, template)).to.be.true;
    }));


    it('should undo', inject(function(elementRegistry, commandStack, elementTemplates) {

      // given
      const task = elementRegistry.get('Task_1');
      const template = templates[0];

      openPopup(task);

      // when
      triggerAction(`append.template-${template.id}`);

      // when
      commandStack.undo();

      // then
      const outgoingFlows = getBusinessObject(task).outgoing;

      expect(outgoingFlows).to.have.length(0);
    }));


    it('should redo', inject(function(elementRegistry, commandStack, elementTemplates) {

      // given
      const task = elementRegistry.get('Task_1');
      const template = templates[0];

      openPopup(task);

      // when
      triggerAction(`append.template-${template.id}`);

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      const outgoingFlows = getBusinessObject(task).outgoing;
      const newElement = outgoingFlows[0].targetRef;

      expect(outgoingFlows).to.have.length(1);
      expect(isTemplateApplied(newElement, template)).to.be.true;
    }));

  });

});


// helpers ////////////

function openPopup(element, offset) {
  offset = offset || 100;

  getBpmnJS().invoke(function(popupMenu) {
    popupMenu.open(element, 'bpmn-append', {
      x: element.x, y: element.y
    });

  });
}

function queryEntry(id) {
  var container = getMenuContainer();

  return domQuery('.djs-popup [data-id="' + id + '"]', container);
}

function getMenuContainer() {
  const popup = getBpmnJS().get('popupMenu');
  return popup._current.container;
}

function triggerAction(id, action = 'click') {
  const entry = queryEntry(id);

  if (!entry) {
    throw new Error('entry "' + id + '" not found in append menu');
  }

  const popupMenu = getBpmnJS().get('popupMenu');
  return popupMenu.trigger(createEvent(entry, { x: 400, y: 400 }), null, action);
}

function getEntries() {
  const popupMenu = getBpmnJS().get('popupMenu');
  return popupMenu._current.entries;
}

function isTemplateApplied(element, template) {
  const businessObject = getBusinessObject(element);

  if (businessObject) {
    return businessObject.get('modelerTemplate') === template.id;
  }

  return false;
}

function placeDragElement(element, action) {
  var dragging = getBpmnJS().get('dragging');
  var elementRegistry = getBpmnJS().get('elementRegistry');

  let processElement = elementRegistry.get('Process_1uc9zgy');

  triggerAction(action, 'dragstart');

  dragging.hover({ element: processElement });
  dragging.end();
}