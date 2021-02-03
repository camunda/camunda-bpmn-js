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

import modelingModule from 'bpmn-js/lib/features/modeling';
import copyPasteModule from 'diagram-js/lib/features/copy-paste';
import coreModule from 'bpmn-js/lib/core';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';

import {
  getCalledElement,
  getCalledElements
} from 'lib/camunda-cloud/helper/CalledElementHelper';

import zeebeModelingModule from 'lib/camunda-cloud/features/modeling';

import emptyProcessDiagramXML from './process-empty.bpmn';

import callActivitiesXML from './process-call-activities.bpmn';


describe('camunda-cloud/features/modeling - create call activities behavior', function() {

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


      it('should execute when creating bpmn:CallActivity', inject(function(canvas,
          modeling) {

        // given
        const rootElement = canvas.getRootElement();

        // when
        const newShape = modeling.createShape({ type: 'bpmn:CallActivity' }, { x: 100, y: 100 }, rootElement);

        // then
        const calledElementExtension = getCalledElement(newShape);

        expect(calledElementExtension).to.exist;
        expect(calledElementExtension.propagateAllChildVariables).to.be.false;
      }));


      it('should not execute when creating bpmn:Task', inject(function(canvas,
          modeling) {

        // given
        const rootElement = canvas.getRootElement();

        // when
        const newShape = modeling.createShape({ type: 'bpmn:Task' }, { x: 100, y: 100 }, rootElement);

        // then
        const calledElementExtension = getCalledElement(newShape);

        expect(calledElementExtension).to.be.undefined;
      }));

    });


    describe('when copying bpmn:CallActivity', function() {

      const testModules = [
        coreModule,
        modelingModule,
        zeebeModelingModule,
        copyPasteModule
      ];

      beforeEach(bootstrapCamundaCloudModeler(callActivitiesXML, {
        modules: testModules,
        moddleExtensions
      }));


      it('should re-use existing extensionElements', inject(function(canvas,
          elementRegistry, copyPaste) {

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
        const pastedCallActivity = find(elements, function(element) {
          return is(element, 'bpmn:CallActivity');
        });

        const calledElementExtensions = getCalledElements(pastedCallActivity);

        expect(calledElementExtensions.length).to.equal(1);
      }));


      it('should not alter existing propagateAllChildVariables attribute', inject(function(canvas,
          elementRegistry, copyPaste) {

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

        // assume
        const pastedCallActivity = find(elements, function(element) {
          return is(element, 'bpmn:CallActivity');
        });

        const calledElementExtensions = getCalledElements(pastedCallActivity);

        expect(calledElementExtensions.length).to.equal(1);

        // then
        const calledElementExtension = getCalledElement(pastedCallActivity);

        expect(calledElementExtension).to.exist;
        expect(calledElementExtension.propagateAllChildVariables).to.be.true;
      }));


      it('should not alter existing processRef attribute', inject(function(canvas,
          elementRegistry, copyPaste) {

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

        // assume
        const pastedCallActivity = find(elements, function(element) {
          return is(element, 'bpmn:CallActivity');
        });

        const calledElementExtensions = getCalledElements(pastedCallActivity);

        expect(calledElementExtensions.length).to.equal(1);

        // then
        const calledElementExtension = getCalledElement(pastedCallActivity);

        expect(calledElementExtension).to.exist;
        expect(calledElementExtension.processId).to.equal('ProcessRef_1');
      }));


      // a legacy CallActivity refers to a CallActivity which was created with
      // a previous version and therefore does not have the propageteAllChildVariables
      // attribute set yet
      it('should not alter existing processRef attribute of legacy CallActivity', inject(function(canvas,
          elementRegistry, copyPaste) {

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

        // assume
        const pastedCallActivity = find(elements, function(element) {
          return is(element, 'bpmn:CallActivity');
        });

        const calledElementExtensions = getCalledElements(pastedCallActivity);
        expect(calledElementExtensions.length).to.equal(1);

        // then
        const calledElementExtension = getCalledElement(pastedCallActivity);
        expect(calledElementExtension).to.exist;
        expect(calledElementExtension.processId).to.equal('ProcessRef_2');
      }));

    });

  });

});
