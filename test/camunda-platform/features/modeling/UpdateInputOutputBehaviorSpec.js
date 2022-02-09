import {
  bootstrapCamundaPlatformModeler,
  inject
} from 'test/TestHelper';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import { getInputOutput } from '../../../../lib/camunda-platform/helper/InputOutputHelper';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import diagramXML from './camunda-input-output-diagram.bpmn';


describe('camunda-platform/features/modeling - UpdateInputOutputBehavior', function() {

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


  describe('remove camunda:InputOuput when removing camunda:InputParameter', function() {

    let businessObject;

    beforeEach(inject(function(elementRegistry, modeling) {

      // given
      const shape = elementRegistry.get('ServiceTask_1');

      businessObject = getBusinessObject(shape);

      const inputOutput = getInputOutput(businessObject);

      // when
      modeling.updateModdleProperties(shape, inputOutput, {
        inputParameters: []
      });
    }));


    it('should execute', inject(function() {

      // then
      expect(getInputOutput(businessObject)).not.to.exist;
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      expect(getInputOutput(businessObject)).to.exist;
    }));


    it('should redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      expect(getInputOutput(businessObject)).not.to.exist;
    }));

  });


  describe('remove camunda:InputOuput when removing camunda:InputParameter', function() {

    let businessObject;

    beforeEach(inject(function(elementRegistry, modeling) {

      // given
      const shape = elementRegistry.get('ServiceTask_2');

      businessObject = getBusinessObject(shape);

      const inputOutput = getInputOutput(businessObject);

      // when
      modeling.updateModdleProperties(shape, inputOutput, {
        outputParameters: []
      });
    }));


    it('should execute', inject(function() {

      // then
      expect(getInputOutput(businessObject)).not.to.exist;
    }));


    it('should undo', inject(function(commandStack) {

      // when
      commandStack.undo();

      // then
      expect(getInputOutput(businessObject)).to.exist;
    }));


    it('should redo', inject(function(commandStack) {

      // when
      commandStack.undo();
      commandStack.redo();

      // then
      expect(getInputOutput(businessObject)).not.to.exist;
    }));

  });


  it('should not remove camunda:InputOuput when remaining camunda:InputParameter',
    inject(function(elementRegistry, modeling) {

      // given
      const shape = elementRegistry.get('ServiceTask_3');

      const businessObject = getBusinessObject(shape);

      const inputOutput = getInputOutput(businessObject);

      // when
      modeling.updateModdleProperties(shape, inputOutput, {
        outputParameters: []
      });

      // then
      expect(getInputOutput(businessObject)).to.exist;
    })
  );


  it('should not remove camunda:InputOuput when remaining camunda:OutputParameter',
    inject(function(elementRegistry, modeling) {

      // given
      const shape = elementRegistry.get('ServiceTask_3');

      const businessObject = getBusinessObject(shape);

      const inputOutput = getInputOutput(businessObject);

      // when
      modeling.updateModdleProperties(shape, inputOutput, {
        inputParameters: []
      });

      // then
      expect(getInputOutput(businessObject)).to.exist;
    })
  );

});