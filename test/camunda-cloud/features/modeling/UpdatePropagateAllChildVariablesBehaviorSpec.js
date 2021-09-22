import {
  bootstrapCamundaCloudModeler,
  inject
} from 'test/TestHelper';

import {
  getOutputParameters,
  getIoMapping
} from 'lib/camunda-cloud/helper/InputOutputHelper';

import {
  getCalledElement
} from 'lib/camunda-cloud/helper/CalledElementHelper';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import diagramXML from './process-call-activities.bpmn';


describe('camunda-cloud/features/modeling - UpdatePropagateAllChildVariablesBehavior', function() {

  beforeEach(bootstrapCamundaCloudModeler(diagramXML));


  describe('removing zeebe:OutputParameters when zeebe:propagateAllChildVariables is set to true', function() {

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

      expect(outputParameters).to.exist;
      expect(outputParameters).to.be.empty;
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      const outputParameters = getOutputParameters(element);

      expect(outputParameters).to.exist;
      expect(outputParameters).to.have.length(1);
    }));


    it('should undo/redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      const outputParameters = getOutputParameters(element);

      expect(outputParameters).to.exist;
      expect(outputParameters).to.be.empty;
    }));

  });


  describe('removing zeebe:IoMapping when zeebe:propagateAllChildVariables is set to true', function() {

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
      const ioMapping = getIoMapping(element);

      expect(ioMapping).not.to.exist;
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      const ioMapping = getIoMapping(element);

      expect(ioMapping).to.exist;

      const outputParameters = getOutputParameters(element);

      expect(outputParameters).to.exist;
      expect(outputParameters).to.have.length(1);
    }));


    it('should undo/redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      const ioMapping = getIoMapping(element);

      expect(ioMapping).not.to.exist;
    }));

  });


  describe('setting zeebe:propagateAllChildVariables to false on zeebe:Output added', function() {

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
        propertyName: 'zeebe:outputParameters',
        objectsToAdd: [ bpmnFactory.create('zeebe:Output') ]
      });
    }));


    it('should execute', inject(function() {

      // then
      expect(calledElement.get('propagateAllChildVariables')).to.equal(false);
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // assume
      expect(calledElement.get('propagateAllChildVariables')).to.equal(true);
    }));


    it('should undo/redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      expect(calledElement.get('propagateAllChildVariables')).to.equal(false);
    }));

  });

});
