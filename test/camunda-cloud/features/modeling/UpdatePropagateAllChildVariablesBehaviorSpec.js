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

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';

import zeebeModelingModules from 'lib/camunda-cloud/features/modeling';

import diagramXML from './process-call-activities.bpmn';


describe('camunda-cloud/features/modeling - update propagateAllChildVariables attribute on call activities', function() {


  const testModules = [
    coreModule,
    modelingModule,
    zeebeModelingModules
  ];

  const moddleExtensions = {
    zeebe: zeebeModdleExtensions
  };

  beforeEach(bootstrapCamundaCloudModeler(diagramXML, {
    modules: testModules,
    moddleExtensions
  }));


  describe('remove outputParameters', function() {

    let shape, context;

    beforeEach(inject(function(elementRegistry, eventBus) {

      // given
      shape = elementRegistry.get('CallActivity_3');

      context = {
        context: {
          element: shape,
          properties: {
            propagateAllChildVariables: true
          }
        }
      };

      // when
      eventBus.fire('commandStack.properties-panel.update-businessobject.executed', context);
    }));


    it('should execute', inject(function() {

      // then
      const outputParameters = getOutputParameters(shape);
      expect(outputParameters.length).to.equal(0);
    }));


    it('should undo', inject(function(eventBus) {

      // when
      eventBus.fire('commandStack.properties-panel.update-businessobject.reverted', context);

      // then
      const outputParameters = getOutputParameters(shape);
      expect(outputParameters).to.exist;
      expect(outputParameters.length).to.equal(1);
    }));


    it('should undo/redo', inject(function(eventBus) {

      // when
      eventBus.fire('commandStack.properties-panel.update-businessobject.reverted', context);
      eventBus.fire('commandStack.properties-panel.update-businessobject.executed', context);

      // then
      const outputParameters = getOutputParameters(shape);
      expect(outputParameters.length).to.equal(0);
    }));

  });


  describe('remove iOMapping', function() {

    let shape, context;

    beforeEach(inject(function(eventBus, elementRegistry) {

      // given
      shape = elementRegistry.get('CallActivity_5');

      context = {
        context: {
          element: shape,
          properties: {
            propagateAllChildVariables: true
          }
        }
      };

      // when
      eventBus.fire('commandStack.properties-panel.update-businessobject.executed', context);
    }));


    it('should execute', inject(function() {

      // then
      const inputOutput = getInputOutput(shape);
      expect(inputOutput).to.not.exist;
    }));


    it('should undo', inject(function(eventBus) {

      // when
      eventBus.fire('commandStack.properties-panel.update-businessobject.reverted', context);

      // then
      const outputParameters = getOutputParameters(shape);
      expect(outputParameters).to.exist;
      expect(outputParameters.length).to.equal(1);

      const inputOutput = getInputOutput(shape);
      expect(inputOutput).to.exist;
    }));


    it('should undo/redo', inject(function(eventBus) {

      // when
      eventBus.fire('commandStack.properties-panel.update-businessobject.reverted', context);
      eventBus.fire('commandStack.properties-panel.update-businessobject.executed', context);

      // then
      const inputOutput = getInputOutput(shape);
      expect(inputOutput).to.not.exist;
    }));

  });


  describe('set propagateAllChildVariables to false', function() {

    let shape, calledElement, context;

    beforeEach(inject(function(eventBus, elementRegistry, elementFactory) {

      // given
      shape = elementRegistry.get('CallActivity_7');
      calledElement = getCalledElement(shape);

      context = {
        context: {
          element: shape,
          objectsToAdd: [ elementFactory.createShape({ type: 'zeebe:Output' }) ]
        }
      };

      // assume
      const inputOutput = getInputOutput(shape);
      expect(inputOutput).to.not.exist;

      // when
      eventBus.fire('commandStack.properties-panel.update-businessobject-list.executed', context);
    }));


    it('should execute', inject(function() {

      // then
      expect(calledElement.propagateAllChildVariables).to.equal(false);
    }));


    it('should undo', inject(function(eventBus) {

      // when
      eventBus.fire('commandStack.properties-panel.update-businessobject-list.reverted', context);

      // assume
      expect(calledElement.propagateAllChildVariables).to.equal(true);
    }));


    it('should undo/redo', inject(function(eventBus) {

      // when
      eventBus.fire('commandStack.properties-panel.update-businessobject-list.reverted', context);
      eventBus.fire('commandStack.properties-panel.update-businessobject-list.executed', context);

      // then
      expect(calledElement.propagateAllChildVariables).to.equal(false);
    }));

  });

});
