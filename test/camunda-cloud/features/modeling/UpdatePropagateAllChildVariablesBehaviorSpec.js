import {
  bootstrapCamundaCloudModeler,
  inject
} from 'test/TestHelper';

import {
  getOutputParameters,
  getInputOutput
} from 'lib/camunda-cloud/helper/InputOutputHelper';

import {
  getCalledElement
} from 'lib/camunda-cloud/helper/CalledElementHelper';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import diagramXML from './process-call-activities.bpmn';



describe('camunda-cloud/features/modeling - update propagateAllChildVariables attribute on call activities', function() {

  beforeEach(bootstrapCamundaCloudModeler(diagramXML));


  describe('remove outputParameters', function() {

    let element;

    beforeEach(inject(function(commandStack, elementRegistry) {

      // given
      element = elementRegistry.get('CallActivity_3');

      const businessObject = getBusinessObject(element);

      // when
      commandStack.execute('properties-panel.update-businessobject', {
        businessObject,
        element,
        properties: {
          propagateAllChildVariables: true
        }
      });
    }));


    it('should execute', inject(function() {

      // then
      const outputParameters = getOutputParameters(element);
      expect(outputParameters.length).to.equal(0);
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      const outputParameters = getOutputParameters(element);
      expect(outputParameters).to.exist;
      expect(outputParameters.length).to.equal(1);
    }));


    it('should undo/redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      const outputParameters = getOutputParameters(element);
      expect(outputParameters.length).to.equal(0);
    }));

  });


  describe('remove iOMapping', function() {

    let element;

    beforeEach(inject(function(commandStack, elementRegistry) {

      // given
      element = elementRegistry.get('CallActivity_5');

      const businessObject = getBusinessObject(element);

      // when
      commandStack.execute('properties-panel.update-businessobject', {
        businessObject,
        element,
        properties: {
          propagateAllChildVariables: true
        }
      });
    }));


    it('should execute', inject(function() {

      // then
      const inputOutput = getInputOutput(element);
      expect(inputOutput).to.not.exist;
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      const outputParameters = getOutputParameters(element);
      expect(outputParameters).to.exist;
      expect(outputParameters.length).to.equal(1);

      const inputOutput = getInputOutput(element);
      expect(inputOutput).to.exist;
    }));


    it('should undo/redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      const inputOutput = getInputOutput(element);
      expect(inputOutput).to.not.exist;
    }));

  });


  describe('set propagateAllChildVariables to false', function() {

    let element, calledElement;

    beforeEach(inject(function(bpmnFactory, commandStack, elementRegistry) {

      // given
      element = elementRegistry.get('CallActivity_7');

      const businessObject = getBusinessObject(element);

      const extensionElements = businessObject.get('extensionElements');

      const ioMapping = bpmnFactory.create('zeebe:IoMapping');

      calledElement = getCalledElement(element);

      // when
      commandStack.execute('properties-panel.update-businessobject-list', {
        element: element,
        currentObject: extensionElements,
        propertyName: 'values',
        objectsToAdd: [ ioMapping ]
      });

      commandStack.execute('properties-panel.update-businessobject-list', {
        element: element,
        currentObject: ioMapping,
        propertyName: 'outputParameters',
        objectsToAdd: [ bpmnFactory.create('zeebe:Output') ]
      });
    }));


    it('should execute', inject(function() {

      // then
      expect(calledElement.propagateAllChildVariables).to.equal(false);
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // assume
      expect(calledElement.propagateAllChildVariables).to.equal(true);
    }));


    it('should undo/redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      expect(calledElement.propagateAllChildVariables).to.equal(false);
    }));

  });

});
