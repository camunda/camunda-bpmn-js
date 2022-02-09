import {
  bootstrapCamundaPlatformModeler,
  getBpmnJS,
  inject
} from 'test/TestHelper';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import diagramXML from './camunda-exclusive-diagram.bpmn';


describe('camunda-platform/features/modeling - UpdateCamundaExclusiveBehavior', function() {

  const testModules = [
    camundaPlatformModelingModules,
    coreModule,
    modelingModule
  ];

  const moddleExtensions = {
    camunda: camundaModdleExtensions
  };

  beforeEach(bootstrapCamundaPlatformModeler(diagramXML, {
    modules: testModules,
    moddleExtensions
  }));


  function updateProperties(element, properties) {
    getBpmnJS().invoke(function(modeling) {
      modeling.updateProperties(element, properties);
    });
  }

  function updateModdleProperties(element, properties) {
    getBpmnJS().invoke(function(modeling) {
      modeling.updateModdleProperties(element, getBusinessObject(element), properties);
    });
  }


  [
    [ 'element.updateProperties', updateProperties ],
    [ 'element.updateModdleProperties', updateModdleProperties ],
  ].forEach(([ command, fn ]) => {

    describe(command, function() {

      describe('camunda:asyncAfter set to false', function() {

        let element,
            businessObject;

        beforeEach(inject(function(elementRegistry) {

          // given
          element = elementRegistry.get('ServiceTask_2');

          businessObject = getBusinessObject(element);

          // assume
          expect(businessObject.get('camunda:exclusive')).to.be.false;

          // when
          fn(element, {
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


      describe('camunda:asyncBefore set to false', function() {

        let element,
            businessObject;

        beforeEach(inject(function(elementRegistry) {

          // given
          element = elementRegistry.get('ServiceTask_1');

          businessObject = getBusinessObject(element);

          // assume
          expect(businessObject.get('camunda:exclusive')).to.be.false;

          // when
          fn(element, {
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


      describe('both camunda:asyncAfter and camunda:asyncBefore set to false', function() {

        let element,
            businessObject;

        beforeEach(inject(function(elementRegistry) {

          // given
          element = elementRegistry.get('ServiceTask_3');

          businessObject = getBusinessObject(element);

          // assume
          expect(businessObject.get('camunda:exclusive')).to.be.false;

          // when
          fn(element, {
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


      it('should not execute when asyncBefore stays', inject(function(elementRegistry) {

        // given
        const element = elementRegistry.get('ServiceTask_3');

        const businessObject = getBusinessObject(element);

        // when
        fn(element, {
          'camunda:asyncAfter': false
        });

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));


      it('should not execute when asyncAfter stays', inject(function(elementRegistry) {

        // given
        const element = elementRegistry.get('ServiceTask_3');

        const businessObject = getBusinessObject(element);

        // when
        fn(element, {
          'camunda:asyncBefore': false
        });

        // then
        expect(businessObject.get('camunda:exclusive')).to.be.false;
      }));

    });

  });

});
