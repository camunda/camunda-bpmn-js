import {
  inject,
  getBpmnJS,
  bootstrapCamundaPlatformModeler
} from 'test/TestHelper';

import {
  query as domQuery
} from 'min-dom';

import diagramXML from './UnlinkTemplateReplaceProvider.bpmn';
import templates from './UnlinkTemplateReplaceProvider.element-templates.json';

import { isString } from 'min-dash';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';


describe('<UnlinkTemplateReplaceProvider>', function() {

  beforeEach(bootstrapCamundaPlatformModeler(diagramXML));

  beforeEach(inject(function(elementTemplates) {
    elementTemplates.set(templates);
  }));


  describe('display', function() {

    it('should not display unlink on plain task', inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('Task_1');

      // when
      openPopup(task);

      // then
      const entries = Object.keys(getEntries());
      expect(entries).not.to.include('replace-unlink-element-template');
    }));


    describe('display options to reset to plain element in correct order', function() {

      it('template service task -> service task', inject(function(elementRegistry, elementTemplates) {

        // given
        const element = applyTemplate(
          'ServiceTask_1',
          'com.camunda.example.MailTask'
        );

        // when
        openPopup(element);

        // then
        const entries = Object.keys(getEntries());
        const entryIndex = entries.indexOf('replace-unlink-element-template');

        expect(entryIndex).to.eql(6);
      }));


      it('template task -> task', inject(function(elementRegistry, elementTemplates) {

        // given
        const element = applyTemplate(
          'Task_1',
          'example.TaskTemplate'
        );

        // when
        openPopup(element);

        // then
        const entries = Object.keys(getEntries());
        const entryIndex = entries.indexOf('replace-unlink-element-template');

        expect(entryIndex).to.eql(0);
      }));


      it('template transaction -> transaction', inject(function(elementRegistry, elementTemplates) {

        // given
        const element = applyTemplate(
          'SUB_PROCESS',
          'example.TransactionTemplate'
        );

        // when
        openPopup(element);

        // then
        const entries = Object.keys(getEntries());
        const entryIndex = entries.indexOf('replace-unlink-element-template');

        expect(entryIndex).to.eql(0);
      }));

    });

  });


  describe('replace', function() {

    it('should unbind template', inject(function(elementRegistry, elementTemplates) {

      // given
      const task = elementRegistry.get('ServiceTask_1');
      const template = templates[0];

      openPopup(task);
      elementTemplates.applyTemplate(task, template);

      // when
      openPopup(task);
      triggerAction('replace-unlink-element-template');

      // then
      expect(isTemplateApplied(task, template)).to.be.false;
    }));


    it('should undo', inject(function(elementRegistry, commandStack, elementTemplates) {

      // given
      const task = elementRegistry.get('ServiceTask_1');
      const template = templates[0];

      openPopup(task);
      elementTemplates.applyTemplate(task, template);

      // when
      commandStack.undo();

      // then
      expect(isTemplateApplied(task, template)).to.be.false;
    }));


    it('should redo', inject(function(elementRegistry, commandStack, elementTemplates) {

      // given
      const task = elementRegistry.get('ServiceTask_1');
      const template = templates[0];

      openPopup(task);
      elementTemplates.applyTemplate(task, template);

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      expect(isTemplateApplied(task, template)).to.be.true;
    }));

  });

});


// helpers ////////////

function openPopup(element, offset) {
  offset = offset || 100;

  getBpmnJS().invoke(function(popupMenu) {
    popupMenu.open(element, 'bpmn-replace', {
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

function triggerAction(id) {
  const entry = queryEntry(id);

  if (!entry) {
    throw new Error('entry "' + id + '" not found in replace menu');
  }

  const popupMenu = getBpmnJS().get('popupMenu');
  const eventBus = getBpmnJS().get('eventBus');

  return popupMenu.trigger(
    eventBus.createEvent({
      target: entry,
      x: 0,
      y: 0,
    })
  );
}

function getEntries() {
  const popupMenu = getBpmnJS().get('popupMenu');
  return popupMenu._current.entries;
}

function applyTemplate(element, template) {

  return getBpmnJS().invoke(function(elementTemplates, elementRegistry) {

    if (isString(element)) {
      element = elementRegistry.get(element);
    }

    if (isString(template)) {
      template = templates.find(t => t.id === template);
    }

    expect(element).to.exist;
    expect(template).to.exist;

    return elementTemplates.applyTemplate(element, template);
  });
}

function isTemplateApplied(element, template) {
  const businessObject = getBusinessObject(element);

  if (businessObject) {
    return businessObject.get('modelerTemplate') === template.id;
  }

  return false;
}