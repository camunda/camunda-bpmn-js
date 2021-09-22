import {
  bootstrapCamundaCloudModeler,
  inject
} from 'test/TestHelper';

import {
  find
} from 'min-dash';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import copyPasteModule from 'diagram-js/lib/features/copy-paste';
import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';

import {
  getCalledElement,
  getCalledElements
} from 'lib/camunda-cloud/helper/CalledElementHelper';

import zeebeModelingModule from 'lib/camunda-cloud/features/modeling';

import emptyProcessDiagramXML from './process-empty.bpmn';

import callActivitiesXML from './process-call-activities.bpmn';


describe('camunda-cloud/features/modeling - CreateCallActivitiesBehavior', function() {

  const moddleExtensions = {
    zeebe: zeebeModdleExtensions
  };

  describe('populate propagateAllChildVariables', function() {

    describe('when creating new shapes', function() {

      const testModules = [
        coreModule,
        modelingModule,
        zeebeModelingModule
      ];

      beforeEach(bootstrapCamundaCloudModeler(emptyProcessDiagramXML, {
        modules: testModules,
        moddleExtensions
      }));


      it('should execute when creating bpmn:CallActivity', inject(function(canvas, modeling) {

        // given
        const rootElement = canvas.getRootElement();

        // when
        const newShape = modeling.createShape({ type: 'bpmn:CallActivity' }, { x: 100, y: 100 }, rootElement);

        // then
        const calledElementExtension = getCalledElement(newShape);

        expect(calledElementExtension).to.exist;
        expect(calledElementExtension.get('zeebe:propagateAllChildVariables')).to.be.false;
      }));


      it('should not execute when creating bpmn:Task', inject(function(canvas, modeling) {

        // given
        const rootElement = canvas.getRootElement();

        // when
        const newShape = modeling.createShape({ type: 'bpmn:Task' }, { x: 100, y: 100 }, rootElement);

        // then
        const calledElementExtension = getCalledElement(newShape);

        expect(calledElementExtension).not.to.exist;
      }));

    });


    describe('when copying bpmn:CallActivity', function() {

      const testModules = [
        copyPasteModule,
        coreModule,
        modelingModule,
        zeebeModelingModule
      ];

      beforeEach(bootstrapCamundaCloudModeler(callActivitiesXML, {
        modules: testModules,
        moddleExtensions
      }));


      it('should re-use existing extensionElements', inject(function(canvas, copyPaste, elementRegistry) {

        // given
        const rootElement = canvas.getRootElement();

        const callActivity = elementRegistry.get('CallActivity_1');

        // when
        copyPaste.copy(callActivity);

        const elements = copyPaste.paste({
          element: rootElement,
          point: {
            x: 1000,
            y: 1000
          }
        });

        // then
        const pastedCallActivity = find(elements, (element) => is(element, 'bpmn:CallActivity'));

        const calledElementExtensions = getCalledElements(pastedCallActivity);

        expect(calledElementExtensions).to.have.length(1);
      }));


      it('should not alter existing propagateAllChildVariables attribute', inject(function(canvas, copyPaste, elementRegistry) {

        // given
        const rootElement = canvas.getRootElement();

        const callActivity = elementRegistry.get('CallActivity_1');

        // when
        copyPaste.copy(callActivity);

        const elements = copyPaste.paste({
          element: rootElement,
          point: {
            x: 1000,
            y: 1000
          }
        });

        // then
        const pastedCallActivity = find(elements, (element) => is(element, 'bpmn:CallActivity'));

        const calledElementExtensions = getCalledElements(pastedCallActivity);

        expect(calledElementExtensions).to.have.length(1);

        const calledElementExtension = getCalledElement(pastedCallActivity);

        expect(calledElementExtension).to.exist;
        expect(calledElementExtension.get('zeebe:propagateAllChildVariables')).to.be.true;
      }));


      it('should not alter existing processRef attribute', inject(function(canvas, copyPaste, elementRegistry) {

        // given
        const rootElement = canvas.getRootElement();

        const callActivity = elementRegistry.get('CallActivity_1');

        // when
        copyPaste.copy(callActivity);

        const elements = copyPaste.paste({
          element: rootElement,
          point: {
            x: 1000,
            y: 1000
          }
        });

        // then
        const pastedCallActivity = find(elements, (element) => is(element, 'bpmn:CallActivity'));

        const calledElementExtensions = getCalledElements(pastedCallActivity);

        expect(calledElementExtensions).to.have.length(1);

        const calledElementExtension = getCalledElement(pastedCallActivity);

        expect(calledElementExtension).to.exist;
        expect(calledElementExtension.get('zeebe:processId')).to.equal('ProcessRef_1');
      }));


      // call activities created with older versions might not have zeebe:propagateAllChildVariables set
      it('should not alter existing processRef attribute of legacy CallActivity', inject(
        function(canvas, copyPaste, elementRegistry) {

          // given
          const rootElement = canvas.getRootElement();

          const callActivity = elementRegistry.get('CallActivity_2');

          // when
          copyPaste.copy(callActivity);

          const elements = copyPaste.paste({
            element: rootElement,
            point: {
              x: 1000,
              y: 1000
            }
          });

          // then
          const pastedCallActivity = find(elements, (element) => is(element, 'bpmn:CallActivity'));

          const calledElementExtensions = getCalledElements(pastedCallActivity);

          expect(calledElementExtensions).to.have.length(1);

          const calledElementExtension = getCalledElement(pastedCallActivity);

          expect(calledElementExtension).to.exist;
          expect(calledElementExtension.get('zeebe:processId')).to.equal('ProcessRef_2');
        }
      ));

    });

  });

});
