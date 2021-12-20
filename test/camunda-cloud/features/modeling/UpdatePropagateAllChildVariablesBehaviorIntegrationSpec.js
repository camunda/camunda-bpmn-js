import {
  bootstrapCamundaCloudModeler,
  inject,
  triggerEvent
} from 'test/TestHelper';

import {
  act
} from '@bpmn-io/properties-panel/preact/test-utils';

import {
  getOutputParameters,
  getIoMapping
} from 'lib/camunda-cloud/helper/InputOutputHelper';

import {
  getCalledElement
} from 'lib/camunda-cloud/helper/CalledElementHelper';

import TestContainer from 'mocha-test-container-support';

import {
  query as domQuery
} from 'min-dom';

import selectionModule from 'diagram-js/lib/features/selection';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';
import { BpmnPropertiesPanelModule, ZeebePropertiesProviderModule } from 'bpmn-js-properties-panel';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';

import zeebeModelingModules from 'lib/camunda-cloud/features/modeling';

import diagramXML from './process-call-activities.bpmn';


describe('camunda-cloud/features/modeling - UpdatePropagateAllChildVariablesBehavior (integration tests)', function() {

  const testModules = [
    coreModule,
    modelingModule,
    BpmnPropertiesPanelModule,
    ZeebePropertiesProviderModule,
    selectionModule,
    zeebeModelingModules
  ];

  const moddleExtensions = {
    zeebe: zeebeModdleExtensions
  };

  let container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });

  beforeEach(bootstrapCamundaCloudModeler(diagramXML, {
    modules: testModules,
    moddleExtensions
  }));

  beforeEach(inject(async function(propertiesPanel) {
    await act(function() {
      return propertiesPanel.attachTo(container);
    });

    // TODO @barmac: introduced to account for a bug in bpmn-js-properties-panel
    // where the properties panel selection listener is not registered immediately
    await sleep(10);
  }));


  describe('remove outputParameters', function() {


    describe('when toggling on with outputParameters and inputParameters', function() {

      let shape;


      describe('<propagateAllChildVariables> explicitly set', function() {

        beforeEach(inject(async function(selection, elementRegistry) {

          // given
          shape = elementRegistry.get('CallActivity_3');

          // when
          await act(() => {
            selection.select(shape);
          });

          return clickPropagateAllChildVariablesToggle(container);
        }));


        it('should execute', function() {

          // then
          const outputParameters = getOutputParameters(shape);
          expect(outputParameters.length).to.equal(0);
        });


        it('should undo', inject(function(commandStack) {

          // when
          commandStack.undo();

          // then
          const outputParameters = getOutputParameters(shape);
          expect(outputParameters).to.exist;
          expect(outputParameters.length).to.equal(1);
        }));


        it('should undo/redo', inject(function(commandStack) {

          // when
          commandStack.undo();
          commandStack.redo();

          // then
          const outputParameters = getOutputParameters(shape);
          expect(outputParameters.length).to.equal(0);
        }));

      });


      describe('<propagateAllChildVariables> not explicitly set (legacy callActivity)', function() {

        beforeEach(inject(async function(selection, elementRegistry) {

          // given
          shape = elementRegistry.get('CallActivity_4');

          // when
          await act(() => {
            selection.select(shape);
          });

          return clickPropagateAllChildVariablesToggle(container);
        }));


        it('should execute', function() {

          // then
          const outputParameters = getOutputParameters(shape);
          expect(outputParameters.length).to.equal(0);
        });


        it('should undo', inject(function(commandStack) {

          // when
          commandStack.undo();

          // then
          const outputParameters = getOutputParameters(shape);
          expect(outputParameters).to.exist;
          expect(outputParameters.length).to.equal(1);
        }));


        it('should undo/redo', inject(function(commandStack) {

          // when
          commandStack.undo();
          commandStack.redo();

          // then
          const outputParameters = getOutputParameters(shape);
          expect(outputParameters.length).to.equal(0);
        }));

      });

    });

  });


  describe('remove iOMapping', function() {


    describe('when toggling on with outputParameters', function() {

      let shape;


      describe('<propagateAllChildVariables> explicitly set', function() {

        beforeEach(inject(async function(selection, elementRegistry) {

          // given
          shape = elementRegistry.get('CallActivity_5');

          // when
          await act(() => {
            selection.select(shape);
          });

          return clickPropagateAllChildVariablesToggle(container);
        }));


        it('should execute', function() {

          // then
          const inputOutput = getIoMapping(shape);
          expect(inputOutput).not.to.exist;
        });


        it('should undo', inject(function(commandStack) {

          // when
          commandStack.undo();

          // then
          const outputParameters = getOutputParameters(shape);
          expect(outputParameters).to.exist;
          expect(outputParameters.length).to.equal(1);

          const inputOutput = getIoMapping(shape);
          expect(inputOutput).to.exist;
        }));


        it('should undo/redo', inject(function(commandStack) {

          // when
          commandStack.undo();
          commandStack.redo();

          // then
          const inputOutput = getIoMapping(shape);
          expect(inputOutput).not.to.exist;
        }));

      });


      describe('<propagateAllChildVariables> not explicitly set (legacy callActivity)', function() {

        beforeEach(inject(async function(selection, elementRegistry) {

          // given
          shape = elementRegistry.get('CallActivity_6');

          // when
          await act(() => {
            selection.select(shape);
          });

          return clickPropagateAllChildVariablesToggle(container);
        }));


        it('should execute', function() {

          // then
          const inputOutput = getIoMapping(shape);
          expect(inputOutput).not.to.exist;
        });


        it('should undo', inject(function(commandStack) {

          // when
          commandStack.undo();

          // then
          const outputParameters = getOutputParameters(shape);
          expect(outputParameters).to.exist;
          expect(outputParameters.length).to.equal(1);

          const inputOutput = getIoMapping(shape);
          expect(inputOutput).to.exist;
        }));


        it('should undo/redo', inject(function(commandStack) {

          // when
          commandStack.undo();
          commandStack.redo();

          // then
          const inputOutput = getIoMapping(shape);
          expect(inputOutput).not.to.exist;
        }));

      });

    });


  });


  describe('set propagateAllChildVariables to false', function() {


    describe('when adding output parameters', function() {

      let shape, calledElement;

      beforeEach(inject(async function(selection, elementRegistry) {

        // given
        shape = elementRegistry.get('CallActivity_7');
        calledElement = getCalledElement(shape);

        // assume
        const inputOutput = getIoMapping(shape);

        expect(inputOutput).not.to.exist;

        // when
        await act(() => {
          selection.select(shape);
        });

        return clickAddOutputParameterButton(container);
      }));


      it('should execute', function() {

        // then
        expect(calledElement.get('propagateAllChildVariables')).to.equal(false);
      });


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

});


// helper /////////

const getPropagateAllChildVariablesToggle = (container) => {
  return domQuery('input[name="propagateAllChildVariables"]', container);
};

const clickPropagateAllChildVariablesToggle = (container) => {
  const toggle = getPropagateAllChildVariablesToggle(container);

  return act(() => {
    triggerEvent(toggle, 'click');
  });
};

const getAddButton = (container) => {
  return domQuery('.bio-properties-panel-add-entry', container);
};

const getAddOutputParameterButton = (container) => {
  return getAddButton(getOutputParameterGroup(container));
};

const clickAddOutputParameterButton = (container) => {
  const addButton = getAddOutputParameterButton(container);

  return act(() => {
    triggerEvent(addButton, 'click');
  });
};

const getOutputParameterGroup = (container) => {
  return domQuery('[data-group-id="group-outputs"]', container);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
