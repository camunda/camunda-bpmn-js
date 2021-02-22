import {
  bootstrapCamundaCloudModeler,
  inject
} from '../../TestHelper';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import {
  areInputParametersSupported,
  areOutputParametersSupported
} from '../../../lib/camunda-cloud/helper/InputOutputHelper';

import diagramXML from '../../fixtures/simple.bpmn';

describe('camunda-cloud/helper - input output helper', function() {

  const testModules = [
    coreModule,
    modelingModule
  ];

  beforeEach(bootstrapCamundaCloudModeler(diagramXML, {
    modules: testModules,
  }));

  let createElement;

  beforeEach(inject(function(elementFactory) {
    createElement = (type, options) => {
      const element = elementFactory.createShape({
        type,
        ...options
      });

      return element;
    };
  }));


  describe('#areInputParametersSupported', function() {

    it('should support ServiceTask', function() {

      // given
      const serviceTask = createElement('bpmn:ServiceTask');

      // when
      const supported = areInputParametersSupported(serviceTask);

      // then
      expect(supported).to.be.true;
    });


    it('should support SubProcess', function() {

      // given
      const subProcess = createElement('bpmn:SubProcess');

      // when
      const supported = areInputParametersSupported(subProcess);

      // then
      expect(supported).to.be.true;
    });


    it('should support CallActivity', function() {

      // given
      const callActivity = createElement('bpmn:CallActivity');

      // when
      const supported = areInputParametersSupported(callActivity);

      // then
      expect(supported).to.be.true;
    });


    it('should support UserTask', function() {

      // given
      const userTask = createElement('bpmn:UserTask');

      // when
      const supported = areInputParametersSupported(userTask);

      // then
      expect(supported).to.be.true;
    });


    it('should NOT support ReceiveTask', function() {

      // given
      const receiveTask = createElement('bpmn:ReceiveTask');

      // when
      const supported = areInputParametersSupported(receiveTask);

      // then
      expect(supported).to.be.false;
    });

  });


  describe('#areOutputParametersSupported', function() {

    it('should support ServiceTask', function() {

      // given
      const serviceTask = createElement('bpmn:ServiceTask');

      // when
      const supported = areOutputParametersSupported(serviceTask);

      // then
      expect(supported).to.be.true;
    });


    it('should support SubProcess', function() {

      // given
      const subProcess = createElement('bpmn:SubProcess');

      // when
      const supported = areOutputParametersSupported(subProcess);

      // then
      expect(supported).to.be.true;
    });


    it('should support CallActivity', function() {

      // given
      const callActivity = createElement('bpmn:CallActivity');

      // when
      const supported = areOutputParametersSupported(callActivity);

      // then
      expect(supported).to.be.true;
    });


    it('should support ReceiveTask', function() {

      // given
      const receiveTask = createElement('bpmn:ReceiveTask');

      // when
      const supported = areOutputParametersSupported(receiveTask);

      // then
      expect(supported).to.be.true;
    });


    it('should support MessageEvent', function() {

      // given
      const messageEvent = createElement('bpmn:IntermediateCatchEvent', {
        eventDefinitionType: 'bpmn:MessageEventDefinition'
      });

      // when
      const supported = areOutputParametersSupported(messageEvent);

      // then
      expect(!!supported).to.be.true;
    });


    it('should support StartEvent', function() {

      // given
      const startEvent = createElement('bpmn:StartEvent');

      // when
      const supported = areOutputParametersSupported(startEvent);

      // then
      expect(!!supported).to.be.true;
    });


    it('should support EndEvent', function() {

      // given
      const endEvent = createElement('bpmn:EndEvent');

      // when
      const supported = areOutputParametersSupported(endEvent);

      // then
      expect(!!supported).to.be.true;
    });


    it('should support IntermediateThrowEvent', function() {

      // given
      const intThrowEvent = createElement('bpmn:IntermediateThrowEvent');

      // when
      const supported = areOutputParametersSupported(intThrowEvent);

      // then
      expect(!!supported).to.be.true;
    });


    it('should support IntermediateCatchEvent', function() {

      // given
      const intCatchEvent = createElement('bpmn:IntermediateCatchEvent');

      // when
      const supported = areOutputParametersSupported(intCatchEvent);

      // then
      expect(!!supported).to.be.true;
    });


    it('should support BoundaryEvent', function() {

      // given
      const boundaryEvent = createElement('bpmn:BoundaryEvent');

      // when
      const supported = areOutputParametersSupported(boundaryEvent);

      // then
      expect(!!supported).to.be.true;
    });


    it('should support UserTask', function() {

      // given
      const userTask = createElement('bpmn:UserTask');

      // when
      const supported = areOutputParametersSupported(userTask);

      // then
      expect(supported).to.be.true;
    });

  });

});