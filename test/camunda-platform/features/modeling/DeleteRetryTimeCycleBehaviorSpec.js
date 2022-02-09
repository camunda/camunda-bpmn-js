import {
  bootstrapCamundaPlatformModeler,
  getBpmnJS,
  inject
} from 'test/TestHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import diagramXML from './camunda-failed-job-retry-time-cycle-diagram.bpmn';


describe('camunda-platform/features/modeling - DeleteRetryTimeCycleBehavior', function() {

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

      describe('camunda:asyncAfter to false', function() {

        let element,
            businessObject;

        beforeEach(inject(function(elementRegistry) {

          // given
          element = elementRegistry.get('ServiceTask_2');

          businessObject = getBusinessObject(element);

          // assume
          expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');

          // when
          fn(element, {
            'camunda:asyncAfter': false
          });
        }));


        it('should execute', inject(function() {

          // then
          expect(getFailedJobRetryTimeCycleBody(businessObject)).not.to.exist;
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
          expect(getFailedJobRetryTimeCycleBody(businessObject)).not.to.exist;
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
          expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');

          // when
          fn(element, {
            'camunda:asyncBefore': false
          });
        }));


        it('should execute', inject(function() {

          // then
          expect(getFailedJobRetryTimeCycleBody(businessObject)).not.to.exist;
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
          expect(getFailedJobRetryTimeCycleBody(businessObject)).not.to.exist;
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
          expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');

          // when
          fn(element, {
            'camunda:asyncAfter': false,
            'camunda:asyncBefore': false
          });
        }));


        it('should execute', inject(function() {

          // then
          expect(getFailedJobRetryTimeCycleBody(businessObject)).not.to.exist;
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
          expect(getFailedJobRetryTimeCycleBody(businessObject)).not.to.exist;
        }));

      });


      it('should not execute when if camunda:asyncAfter set to true', inject(function(elementRegistry) {

        // given
        const shape = elementRegistry.get('ServiceTask_3');

        const businessObject = getBusinessObject(shape);

        // when
        fn(shape, {
          'camunda:asyncBefore': false
        });

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should not execute when if camunda:asyncBefore set to true', inject(function(elementRegistry) {

        // given
        const element = elementRegistry.get('ServiceTask_3');

        const businessObject = getBusinessObject(element);

        // when
        fn(element, {
          'camunda:asyncAfter': false
        });

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));


      it('should not execute if has camunda:TimerEventDefinition', inject(function(elementRegistry, modeling) {

        // given
        const element = elementRegistry.get('TimerCatchEvent_1');

        const businessObject = getBusinessObject(element);

        // assume
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');

        // when
        modeling.updateProperties(element, {
          'camunda:asyncAfter': false
        });

        // then
        expect(getFailedJobRetryTimeCycleBody(businessObject)).to.equal('2');
      }));

    });

  });

});


// helpers //////////

function getFailedJobRetryTimeCycleBody(businessObject) {
  const extensionElements = businessObject.get('extensionElements');

  if (!extensionElements) {
    return;
  }

  const failedJobRetryTimeCycle = extensionElements.get('values').find((value) => {
    return is(value, 'camunda:FailedJobRetryTimeCycle');
  });

  if (failedJobRetryTimeCycle) {
    return failedJobRetryTimeCycle.get('camunda:body');
  }
}