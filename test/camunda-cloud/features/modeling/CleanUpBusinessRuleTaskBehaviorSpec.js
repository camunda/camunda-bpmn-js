import {
  bootstrapCamundaCloudModeler,
  inject
} from 'test/TestHelper';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import { getExtensionElementsList } from '../../../../lib/util/ExtensionElementsUtil';

import { getIoMapping } from '../../../../lib/camunda-cloud/helper/InputOutputHelper';

import diagramXML from './process-businessRuleTask.bpmn';


describe('camunda-cloud/features/modeling - CleanUpBusinessRuleTaskBehavior', function() {

  beforeEach(bootstrapCamundaCloudModeler(diagramXML));


  describe('removing zeebe:CalledDecision when zeebe:TaskDefinition is added', function() {

    let element;

    beforeEach(inject(function(bpmnFactory, elementRegistry, modeling) {

      // given
      element = elementRegistry.get('BusinessRuleTask_1');

      const businessObject = getBusinessObject(element),
            extensionElements = businessObject.get('extensionElements'),
            taskDefinition = bpmnFactory.create('zeebe:TaskDefinition', { });

      taskDefinition.$parent = extensionElements;

      // when
      const values = extensionElements.get('values').concat(taskDefinition);

      modeling.updateModdleProperties(element, extensionElements, {
        values
      });
    }));


    it('should execute', function() {

      // then
      const calledDecision = getCalledDecision(element);

      expect(calledDecision).not.to.exist;
    });


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      const calledDecision = getCalledDecision(element);

      expect(calledDecision).to.exist;
      expect(calledDecision.decisionId).to.equal('a');
      expect(calledDecision.resultVariable).to.equal('b');
    }));


    it('should undo/redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      const calledDecision = getCalledDecision(element);

      expect(calledDecision).not.to.exist;
    }));

  });


  describe('removing zeebe:TaskDefinition when zeebe:CalledDecision is added', function() {

    let element;

    beforeEach(inject(function(bpmnFactory, elementRegistry, modeling) {

      // given
      element = elementRegistry.get('BusinessRuleTask_2');

      const businessObject = getBusinessObject(element),
            extensionElements = businessObject.get('extensionElements'),
            calledDecision = bpmnFactory.create('zeebe:CalledDecision', { });

      calledDecision.$parent = extensionElements;

      // when
      const values = extensionElements.get('values').concat(calledDecision);

      modeling.updateModdleProperties(element, extensionElements, {
        values
      });
    }));


    it('should execute', inject(function() {

      // then
      const taskDefiniton = getTaskDefinition(element);

      expect(taskDefiniton).not.to.exist;
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      const taskDefiniton = getTaskDefinition(element);

      expect(taskDefiniton).to.exist;
      expect(taskDefiniton.type).to.equal('a');
      expect(taskDefiniton.retries).to.equal('b');
    }));


    it('should undo/redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      const taskDefiniton = getTaskDefinition(element);

      expect(taskDefiniton).not.to.exist;
    }));

  });


  describe('removing zeebe:TaskHeaders when zeebe:CalledDecision is added', function() {

    let element;

    beforeEach(inject(function(commandStack, elementRegistry, bpmnFactory, modeling) {

      // given
      element = elementRegistry.get('BusinessRuleTask_3');

      const businessObject = getBusinessObject(element),
            extensionElements = businessObject.get('extensionElements'),
            calledDecision = bpmnFactory.create('zeebe:CalledDecision', { });

      calledDecision.$parent = extensionElements;

      // when
      const values = extensionElements.get('values').concat(calledDecision);

      modeling.updateModdleProperties(element, extensionElements, {
        values
      });
    }));


    it('should execute', inject(function() {

      // then
      const taskHeaders = getTaskHeaders(element);

      expect(taskHeaders).not.to.exist;
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      const taskHeaders = getTaskHeaders(element);

      expect(taskHeaders).to.exist;
      expect(taskHeaders.get('values')).to.have.length(1);
    }));


    it('should undo/redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      const taskHeaders = getTaskHeaders(element);

      expect(taskHeaders).not.to.exist;
    }));

  });


  describe('not removing zeebe:TaskHeaders when zeebe:IoMapping is added', function() {

    let element;

    beforeEach(inject(function(bpmnFactory, elementRegistry, modeling) {

      // given
      element = elementRegistry.get('BusinessRuleTask_3');

      const businessObject = getBusinessObject(element),
            extensionElements = businessObject.get('extensionElements'),
            ioMapping = bpmnFactory.create('zeebe:IoMapping');

      ioMapping.$parent = extensionElements;

      // when
      const values = extensionElements.get('values').concat(ioMapping);

      modeling.updateModdleProperties(element, extensionElements, {
        values
      });
    }));


    it('should NOT execute', inject(function() {

      // then
      const taskHeaders = getTaskHeaders(element),
            ioMapping = getIoMapping(element);

      expect(taskHeaders).to.exist;
      expect(ioMapping).to.exist;
    }));

  });

});

// helpers //////////

function getCalledDecision(element) {
  const businessObject = getBusinessObject(element);

  return getExtensionElementsList(businessObject, 'zeebe:CalledDecision')[ 0 ];
}

function getTaskDefinition(element) {
  const businessObject = getBusinessObject(element);

  return getExtensionElementsList(businessObject, 'zeebe:TaskDefinition')[ 0 ];
}

function getTaskHeaders(element) {
  const businessObject = getBusinessObject(element);

  return getExtensionElementsList(businessObject, 'zeebe:TaskHeaders')[ 0 ];
}
