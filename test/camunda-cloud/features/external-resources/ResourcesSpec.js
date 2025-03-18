import {
  bootstrapModeler,
  createCanvasEvent,
  createEvent as globalEvent,
  inject,
  getBpmnJS
} from 'test/TestHelper';

import { query as domQuery } from 'min-dom';

import coreModule from 'bpmn-js/lib/core';
import contexPadModule from 'diagram-js/lib/features/context-pad';
import paletteModule from 'diagram-js/lib/features/palette';
import editorActionsModule from 'bpmn-js/lib/features/editor-actions';
import popupMenuModule from 'bpmn-js/lib/features/popup-menu';
import modelingModule from 'bpmn-js/lib/features/modeling';

import { is } from 'bpmn-js/lib/util/ModelUtil';

import {
  CreateAppendAnythingModule as createAppendAnythingModule
} from 'bpmn-js-create-append-anything';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe';

import { ResourcesModule, DefaultHandlersModule } from 'lib/camunda-cloud/features/external-resources';

import diagramXML from './Resources.bpmn';
import resourcesJSON from '../../resources.json';


describe('camunda-cloud/features/external-resources - Resources', function() {

  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      coreModule,
      contexPadModule,
      paletteModule,
      editorActionsModule,
      popupMenuModule,
      modelingModule,
      createAppendAnythingModule,
      ResourcesModule,
      DefaultHandlersModule
    ],
    moddleExtensions: {
      zeebe: zeebeModdle
    }
  }));

  describe('create', function() {

    it('should add create options', inject(function(canvas, resources) {

      // given
      resources.set(resourcesJSON);
      const rootElement = canvas.getRootElement();

      // when
      const {
        entries
      } = openPopup(rootElement, 'bpmn-create');

      // then
      for (const resource of resourcesJSON) {
        expect(entries[`resources-create-${resource.type}-0`], `<create-${resource.type}> to exist`).to.exist;
      }
    }));


    it('should create call activity', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);

      // when
      triggerCreateEntry('resources-create-bpmnProcess-0');

      // then
      const createdElement = getLastAcitivity(elementRegistry);

      expect(is(createdElement, 'bpmn:CallActivity')).to.be.true;

      const calledElement = createdElement.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:CalledElement'));
      expect(calledElement.processId).to.eql('paymentProcess');
    }));


    it('should create decision task', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);

      // when
      triggerCreateEntry('resources-create-dmnDecision-0');

      // then
      const createdElement = getLastAcitivity(elementRegistry);

      expect(is(createdElement, 'bpmn:BusinessRuleTask')).to.be.true;
      expect(createdElement.businessObject.name).to.eql('Credit Score');

      const calledDecision = createdElement.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:CalledDecision'));
      expect(calledDecision.decisionId).to.eql('creditScore');
    }));


    it('should create form task', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);

      // when
      triggerCreateEntry('resources-create-form-0');

      // then
      const createdElement = getLastAcitivity(elementRegistry);

      expect(is(createdElement, 'bpmn:UserTask')).to.be.true;
      expect(createdElement.businessObject.name).to.eql('Invoice Form');

      const formDefinition = createdElement.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:FormDefinition'));
      expect(formDefinition.formId).to.eql('invoiceForm');

      const zeebeUserTask = createdElement.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:UserTask'));
      expect(zeebeUserTask).to.exist;
    }));
  });


  describe('append', function() {

    it('should add append options', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);
      const task = elementRegistry.get('TASK');

      // when
      const {
        entries
      } = openPopup(task, 'bpmn-append');

      // then
      for (const resource of resourcesJSON) {
        expect(entries[`resources-append-${resource.type}-0`], `<append-${resource.type}> to exist`).to.exist;
      }
    }));


    it('should append call activity', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);
      const task = elementRegistry.get('TASK');

      // when
      triggerEntry('resources-append-bpmnProcess-0', 'bpmn-append', task);

      // then
      const appended = getLastAcitivity(elementRegistry);

      expect(is(appended, 'bpmn:CallActivity')).to.be.true;

      const calledElement = appended.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:CalledElement'));
      expect(calledElement.processId).to.eql('paymentProcess');
    }));


    it('should append decision task', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);
      const task = elementRegistry.get('TASK');

      // when
      triggerEntry('resources-append-dmnDecision-0', 'bpmn-append', task);

      // then
      const appended = getLastAcitivity(elementRegistry);

      expect(is(appended, 'bpmn:BusinessRuleTask')).to.be.true;
      expect(appended.businessObject.name).to.eql('Credit Score');

      const calledDecision = appended.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:CalledDecision'));
      expect(calledDecision.decisionId).to.eql('creditScore');
    }));


    it('should append form task', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);
      const task = elementRegistry.get('TASK');

      // when
      triggerEntry('resources-append-form-0', 'bpmn-append', task);

      // then
      const appended = getLastAcitivity(elementRegistry);

      expect(is(appended, 'bpmn:UserTask')).to.be.true;
      expect(appended.businessObject.name).to.eql('Invoice Form');

      const formDefinition = appended.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:FormDefinition'));
      expect(formDefinition.formId).to.eql('invoiceForm');

      const zeebeUserTask = appended.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:UserTask'));
      expect(zeebeUserTask).to.exist;
    }));
  });


  describe('replace', function() {

    it('should add replace options', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);
      const task = elementRegistry.get('TASK');

      // when
      const {
        entries
      } = openPopup(task, 'bpmn-replace');

      // then
      for (const resource of resourcesJSON) {
        expect(entries[`resources-replace-${resource.type}-0`], `<append-${resource.type}> to exist`).to.exist;
      }
    }));


    it('should replace element with call activity', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);
      const task = elementRegistry.get('TASK');

      // when
      triggerEntry('resources-replace-bpmnProcess-0', 'bpmn-replace', task);

      // then
      const replacedElement = elementRegistry.get('TASK');

      expect(is(replacedElement, 'bpmn:CallActivity')).to.be.true;
      expect(replacedElement.businessObject.name).to.eql('Payment Process');

      const calledElement = replacedElement.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:CalledElement'));
      expect(calledElement.processId).to.eql('paymentProcess');
    }));


    it('should replace element with decision task', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);
      const task = elementRegistry.get('TASK');

      // when
      triggerEntry('resources-replace-dmnDecision-0', 'bpmn-replace', task);

      // then
      const replacedElement = elementRegistry.get('TASK');

      expect(is(replacedElement, 'bpmn:BusinessRuleTask')).to.be.true;
      expect(replacedElement.businessObject.name).to.eql('Credit Score');

      const calledDecision = replacedElement.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:CalledDecision'));
      expect(calledDecision.decisionId).to.eql('creditScore');
    }));


    it('should replace element with form task', inject(function(elementRegistry, resources) {

      // given
      resources.set(resourcesJSON);
      const task = elementRegistry.get('TASK');

      // when
      triggerEntry('resources-replace-form-0', 'bpmn-replace', task);

      // then
      const replacedElement = elementRegistry.get('TASK');

      expect(is(replacedElement, 'bpmn:UserTask')).to.be.true;
      expect(replacedElement.businessObject.name).to.eql('Invoice Form');

      const formDefinition = replacedElement.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:FormDefinition'));
      expect(formDefinition.formId).to.eql('invoiceForm');

      const zeebeUserTask = replacedElement.businessObject.extensionElements.values.find(
        value => is(value, 'zeebe:UserTask'));
      expect(zeebeUserTask).to.exist;
    }));
  });
});


// helpers //////////////

function openPopup(element, providerId) {

  return getBpmnJS().invoke(function(popupMenu) {

    popupMenu.open(element, providerId, { x: 100, y: 100 });

    return popupMenu._current;
  });
}

function queryEntry(id) {
  const container = getMenuContainer();

  return domQuery('.djs-popup [data-id="' + id + '"]', container);
}

function getMenuContainer() {
  const popup = getBpmnJS().get('popupMenu');
  return popup._current.container;
}

function triggerAction(id) {
  const entry = queryEntry(id);

  if (!entry) {
    throw new Error('entry "' + id + '" not found in append menu');
  }

  const popupMenu = getBpmnJS().get('popupMenu');

  return popupMenu.trigger(globalEvent(entry, { x: 0, y: 0 }));
}

function triggerCreateEntry(id) {
  return getBpmnJS().invoke(function(canvas, dragging) {

    const rootElement = canvas.getRootElement(),
          rootGfx = canvas.getGraphics(rootElement);

    triggerEntry(id, 'bpmn-create', rootElement);

    dragging.hover({ element: rootElement, gfx: rootGfx });
    dragging.move(createCanvasEvent({ x: 200, y: 300 }));

    // when
    dragging.end();
  });
}

function triggerEntry(id, providerId, element) {
  openPopup(element, providerId);
  triggerAction(id);
}

function getLastAcitivity(elementRegistry) {
  const elements = elementRegistry.getAll();

  return elements.slice().reverse().find(e => is(e, 'bpmn:Activity'));
}
