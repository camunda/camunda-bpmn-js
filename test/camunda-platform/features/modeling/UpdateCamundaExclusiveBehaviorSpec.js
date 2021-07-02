import {
  bootstrapCamundaPlatformModeler,
  inject
} from 'test/TestHelper';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';

import { BpmnPropertiesPanelModule } from 'bpmn-js-properties-panel';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import diagramXML from './camunda-exclusive-diagram.bpmn';


describe('camunda-platform/features/modeling - UpdateCamundaExclusiveBehavior', function() {

  const testModules = [
    camundaPlatformModelingModules,
    coreModule,
    modelingModule,
    BpmnPropertiesPanelModule
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

      let shape, businessObject;

      beforeEach(inject(function(commandStack, elementRegistry) {

        // given
        shape = elementRegistry.get('ServiceTask_1');

        businessObject = getBusinessObject(shape);

        const context = {
          element: shape,
          businessObject: businessObject,
          properties: {
            'camunda:asyncBefore': false,
            'camunda:async': undefined
          }
        };

        // assume
        expect(businessObject.get('camunda:exclusive')).to.be.false;

        // when
        commandStack.execute('properties-panel.update-businessobject', context);
      }));


      it('should execute', inject(function() {

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));

    });


    describe('asyncAfter to false', function() {

      let shape, businessObject;

      beforeEach(inject(function(commandStack, elementRegistry) {

        // given
        shape = elementRegistry.get('ServiceTask_2');

        businessObject = getBusinessObject(shape);

        const context = {
          element: shape,
          businessObject: businessObject,
          properties: {
            'camunda:asyncAfter': false
          }
        };

        // assume
        expect(businessObject.get('camunda:exclusive')).to.be.false;

        // when
        commandStack.execute('properties-panel.update-businessobject', context);
      }));


      it('should execute', inject(function() {

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));

    });


    describe('double async', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry) {

        // given
        shape = elementRegistry.get('ServiceTask_3');

        businessObject = getBusinessObject(shape);

        // assume
        expect(businessObject.get('camunda:exclusive')).to.be.false;
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
        expect(businessObject.get('camunda:exclusive')).to.be.false;
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
        expect(businessObject.get('camunda:exclusive')).to.be.false;
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
        expect(businessObject.get('camunda:exclusive')).to.be.false;

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncBefore': false
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));

    });


    describe('asyncAfter to false', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        shape = elementRegistry.get('ServiceTask_2');

        businessObject = getBusinessObject(shape);

        // assume
        expect(businessObject.get('camunda:exclusive')).to.be.false;

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncAfter': false
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));

    });


    describe('asyncBoth to false', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        shape = elementRegistry.get('ServiceTask_3');

        businessObject = getBusinessObject(shape);

        // assume
        expect(businessObject.get('camunda:exclusive')).to.be.false;

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncAfter': false,
          'camunda:asyncBefore': false
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.true;
      }));

    });


    describe('double async', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry) {

        // given
        shape = elementRegistry.get('ServiceTask_3');

        businessObject = getBusinessObject(shape);

        // assume
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));


      it('should not execute when asyncBefore stays', inject(function(modeling) {

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncAfter': false
        });

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));


      it('should not execute when asyncAfter stays', inject(function(modeling) {

        // when
        modeling.updateProperties(shape, {
          'camunda:asyncBefore': false
        });

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));

    });

  });

});
