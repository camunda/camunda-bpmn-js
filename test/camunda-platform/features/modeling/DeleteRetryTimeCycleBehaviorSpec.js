import {
  bootstrapCamundaPlatformModeler,
  inject
} from 'test/TestHelper';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import propertiesPanelCommandHandler from 'bpmn-js-properties-panel/lib/cmd';

import diagramXML from './camunda-failed-job-retry-time-cycle-diagram.bpmn';


describe('camunda-platform/features/modeling - DeleteRetryTimeCycleBehavior', function() {

  const testModules = [
    camundaPlatformModelingModules,
    coreModule,
    modelingModule,
    propertiesPanelCommandHandler
  ];

  const moddleExtensions = {
    camunda: camundaModdleExtensions
  };

  beforeEach(bootstrapCamundaPlatformModeler(diagramXML, {
    modules: testModules,
    moddleExtensions
  }));

  describe('properties-panel.update-businessobject', function() {

    describe('asyncBefore to false', function() {

      let shape, context, businessObject;

      beforeEach(inject(function(elementRegistry, commandStack) {

        // given
        shape = elementRegistry.get('ServiceTask_1');
        businessObject = getBusinessObject(shape);

        context = {
          element: shape,
          businessObject: businessObject,
          properties: {
            'camunda:asyncBefore': false,
            'camunda:async': undefined
          }
        };

        // assume
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');

        // when
        commandStack.execute('properties-panel.update-businessobject', context);
      }));


      it('should execute', inject(function() {

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.be.undefined;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.be.undefined;
      }));

    });


    describe('asyncAfter to false', function() {

      let shape, context, businessObject;

      beforeEach(inject(function(elementRegistry, commandStack) {

        // given
        shape = elementRegistry.get('ServiceTask_2');
        businessObject = getBusinessObject(shape);

        context = {
          element: shape,
          businessObject: businessObject,
          properties: {
            'camunda:asyncAfter': false
          }
        };

        // assume
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');

        // when
        commandStack.execute('properties-panel.update-businessobject', context);
      }));


      it('should execute', inject(function() {

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.be.undefined;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.be.undefined;
      }));

    });


    describe('double async', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry) {

        // given
        shape = elementRegistry.get('ServiceTask_3');
        businessObject = getBusinessObject(shape);

        // assume
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should not execute when asyncBefore stays', inject(function(commandStack) {

        // when
        commandStack.execute('properties-panel.update-businessobject', {
          element: shape,
          businessObject: businessObject,
          properties: {
            'camunda:asyncAfter': false
          }
        });

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should not execute when asyncAfter stays', inject(function(commandStack) {

        // when
        commandStack.execute('properties-panel.update-businessobject', {
          element: shape,
          businessObject: businessObject,
          properties: {
            'camunda:asyncBefore': false
          }
        });

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));

    });


    describe('with TimerEventDefinition', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry) {

        // given
        shape = elementRegistry.get('TimerCatchEvent_1');
        businessObject = getBusinessObject(shape);

        // assume
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should not execute', inject(function(commandStack) {

        // when
        commandStack.execute('properties-panel.update-businessobject', {
          element: shape,
          businessObject: businessObject,
          properties: {
            'camunda:asyncAfter': false
          }
        });

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));

    });

  });


  describe('element.updateProperties', function() {

    describe('asyncBefore to false', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        shape = elementRegistry.get('ServiceTask_1');
        businessObject = getBusinessObject(shape);

        // assume
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncBefore': false
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.be.undefined;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.be.undefined;
      }));

    });


    describe('asyncAfter to false', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        shape = elementRegistry.get('ServiceTask_2');
        businessObject = getBusinessObject(shape);

        // assume
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncAfter': false
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.be.undefined;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.be.undefined;
      }));

    });


    describe('double async', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry) {

        // given
        shape = elementRegistry.get('ServiceTask_3');
        businessObject = getBusinessObject(shape);

        // assume
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should not execute when asyncBefore stays', inject(function(modeling) {

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncAfter': false
        });

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should not execute when asyncAfter stays', inject(function(modeling) {

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncBefore': false
        });

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));

    });


    describe('with TimerEventDefinition', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry) {

        // given
        shape = elementRegistry.get('TimerCatchEvent_1');
        businessObject = getBusinessObject(shape);

        // assume
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should not execute', inject(function(modeling) {

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncAfter': false
        });

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));

    });

  });

});


// helper ///////////

function getFailedJobRetryTimeCycleBody(businessObject) {
  const extElements = getExtensionElementsList(businessObject, 'camunda:FailedJobRetryTimeCycle');

  return extElements[0] && extElements[0].body;
}

function getExtensionElementsList(businessObject, type = undefined) {
  const elements = ((businessObject.get('extensionElements') &&
                  businessObject.get('extensionElements').get('values')) || []);

  return (elements.length && type) ?
    elements.filter((value) => is(value, type)) :
    elements;
}
