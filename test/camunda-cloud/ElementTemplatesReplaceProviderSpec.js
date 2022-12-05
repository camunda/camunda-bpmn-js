import {
  inject,
  getBpmnJS,
  bootstrapCamundaCloudModeler
} from 'test/TestHelper';

import {
  query as domQuery
} from 'min-dom';

import {
  isTemplateApplied
} from 'lib/camunda-cloud/features/replace/ElementTemplatesReplaceProvider';

import diagramXML from './ElementTemplatesReplaceProvider.bpmn';
import templates from './ElementTemplatesReplaceProvider.element-templates.json';


describe('<ElementTemplatesReplaceProvider>', function() {

  beforeEach(bootstrapCamundaCloudModeler(
    diagramXML, {
      elementTemplatesReplaceProvider: {
        replaceWithTemplates: true
      }
    }
  ));

  beforeEach(inject(function(elementTemplates) {
    elementTemplates.set(templates);
  }));


  describe('display', function() {

    it('should display matching element templates', inject(function(elementRegistry, popupMenu) {

      // given
      const task = elementRegistry.get('ServiceTask_1');

      // when
      openPopup(task);

      // then
      const entries = getTemplateEntries();
      expect(entries).to.have.length(6);
    }));


    it('should not display element templates that do not apply', inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('Task_1');

      // when
      openPopup(task);

      // then
      const entries = getTemplateEntries();
      expect(entries).to.have.length(5);
    }));


    it('should not display applied element template', inject(function(elementRegistry, elementTemplates) {

      // given
      const task = elementRegistry.get('ServiceTask_1');
      elementTemplates.applyTemplate(task, templates[0]);

      // when
      openPopup(task);

      // then
      const entries = getTemplateEntries();
      expect(entries).to.have.length(5);
    }));


    describe('display options to reset to plain element in correct order', function() {

      it('template service task -> service task', inject(function(elementRegistry, elementTemplates) {

        // given
        const task = elementRegistry.get('ServiceTask_1');
        elementTemplates.applyTemplate(task, templates[templates[0]]);

        // when
        openPopup(task);

        // then
        const entries = Object.keys(getEntries());
        const entryIndex = entries.indexOf('replace-with-service-task');

        expect(entryIndex).to.eql(6);
      }));


      it('template task -> task', inject(function(elementRegistry, elementTemplates) {

        // given
        const task = elementRegistry.get('Task_1');
        elementTemplates.applyTemplate(task, templates[templates[templates.length - 1]]);

        // when
        openPopup(task);

        // then
        const entries = Object.keys(getEntries());
        const entryIndex = entries.indexOf('replace-with-task');

        expect(entryIndex).to.eql(0);
      }));

    });

  });


  describe('options', function() {

    beforeEach(inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('ServiceTask_1');

      // when
      openPopup(task);
    }));


    it('should have title', inject(function() {

      // given
      const template = templates[0];
      const entry = getEntry(`replace-with-template-${template.id}`);

      // then
      expect(entry.name).to.eql(template.name);
    }));


    it('should have icon', inject(function() {

      // given
      const template = templates[0];
      const entry = getEntry(`replace-with-template-${template.id}`);

      // then
      expect(entry.imageUrl).to.eql(template.icon.contents);
    }));


    it('should have description', inject(function() {

      // given
      const template = templates[0];
      const entry = getEntry(`replace-with-template-${template.id}`);

      // then
      expect(entry.description).to.eql(template.description);
    }));


    it('should have documentation link', inject(function() {

      // given
      const template = templates[0];
      const entry = getEntry(`replace-with-template-${template.id}`);

      // then
      expect(entry.documentationRef).to.eql(template.documentationRef);
    }));


    it('should have group - default', inject(function() {

      // given
      const templateEntryId = getTemplateEntries()[0];
      const entry = getEntry(templateEntryId);

      // then
      expect(entry.group.id).to.eql('templates');
      expect(entry.group.name).to.eql('Templates');
    }));


    it('should have group - category', inject(function(popupMenu) {

      // given
      const templateEntryId = getTemplateEntries()[1];
      const entry = getEntry(templateEntryId);

      // then
      expect(entry.group.id).to.eql('connectors');
      expect(entry.group.name).to.eql('Connectors');
    }));

  });


  describe('replace', function() {

    it('should apply template', inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('ServiceTask_1');
      const template = templates[0];

      // when
      openPopup(task);

      triggerAction(`replace-with-template-${template.id}`);

      // then
      expect(isTemplateApplied(task, template)).to.be.true;

    }));


    it('should unbind template', inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('ServiceTask_1');
      const template = templates[0];

      openPopup(task);
      triggerAction(`replace-with-template-${template.id}`);

      // when
      openPopup(task);
      triggerAction('replace-with-service-task');

      // then
      expect(isTemplateApplied(task, template)).to.be.false;
    }));


    it('should undo', inject(function(elementRegistry, commandStack) {

      // given
      const task = elementRegistry.get('ServiceTask_1');
      const template = templates[0];

      openPopup(task);
      triggerAction(`replace-with-template-${template.id}`);

      // when
      commandStack.undo();

      // then
      expect(isTemplateApplied(task, template)).to.be.false;
    }));


    it('should redo', inject(function(elementRegistry, commandStack) {

      // given
      const task = elementRegistry.get('ServiceTask_1');
      const template = templates[0];

      openPopup(task);
      triggerAction(`replace-with-template-${template.id}`);

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

function getEntry(id) {
  const popupMenu = getBpmnJS().get('popupMenu');

  return popupMenu._getEntry(id);
}

function getTemplateEntries() {
  const entries = getEntries();
  const entryIds = Object.keys(entries);

  return entryIds.filter(entry => entry.startsWith('replace-with-template'));
}
