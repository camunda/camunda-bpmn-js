import {
  bootstrapCamundaCloudModeler,
  getBpmnJS,
  inject
} from 'test/TestHelper';

import {
  getOutputParameters,
  getIoMapping
} from 'lib/camunda-cloud/helper/InputOutputHelper';

import {
  getCalledElement
} from 'lib/camunda-cloud/helper/CalledElementHelper';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import diagramXML from './process-call-activities.bpmn';


describe('camunda-cloud/features/modeling - UpdatePropagateAllChildVariablesBehavior', function() {

  beforeEach(bootstrapCamundaCloudModeler(diagramXML));


  [
    'propagateAllChildVariables',
    'zeebe:propagateAllChildVariables'
  ].forEach((key) => {

    describe(`removing zeebe:Output elements when zeebe:propagateAllChildVariables is set to true (${ key })`, function() {

      let element;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        element = elementRegistry.get('CallActivity_3');

        // when
        modeling.updateModdleProperties(element, getCalledElement(element), { [ key ]: true });
      }));


      it('should execute', inject(function() {

        // then
        const outputParameters = getOutputParameters(element);

        expect(outputParameters).to.exist;
        expect(outputParameters).to.be.empty;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        const outputParameters = getOutputParameters(element);

        expect(outputParameters).to.exist;
        expect(outputParameters).to.have.length(1);
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        const outputParameters = getOutputParameters(element);

        expect(outputParameters).to.exist;
        expect(outputParameters).to.be.empty;
      }));

    });


    describe(`removing zeebe:IoMapping when zeebe:propagateAllChildVariables is set to true (${ key })`, function() {

      let element;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        element = elementRegistry.get('CallActivity_5');

        // when
        modeling.updateModdleProperties(element, getCalledElement(element), { [ key ]: true });
      }));


      it('should execute', inject(function() {

        // then
        const ioMapping = getIoMapping(element);

        expect(ioMapping).not.to.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        const ioMapping = getIoMapping(element);

        expect(ioMapping).to.exist;

        const outputParameters = getOutputParameters(element);

        expect(outputParameters).to.exist;
        expect(outputParameters).to.have.length(1);
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        const ioMapping = getIoMapping(element);

        expect(ioMapping).not.to.exist;
      }));

    });

  });


  function addIoMapping(element) {
    getBpmnJS().invoke(function(bpmnFactory, modeling) {
      const businessObject = getBusinessObject(element);

      const extensionElements = businessObject.get('extensionElements');

      const ioMapping = bpmnFactory.create('zeebe:IoMapping');

      const output = bpmnFactory.create('zeebe:Output');

      output.$parent = ioMapping;

      ioMapping.set('zeebe:outputParameters', [ output ]);

      modeling.updateModdleProperties(element, extensionElements, {
        values: [ ...extensionElements.get('values'), ioMapping ]
      });
    });
  }

  function addOutput(element) {
    getBpmnJS().invoke(function(bpmnFactory, modeling) {
      const businessObject = getBusinessObject(element);

      const extensionElements = businessObject.get('extensionElements');

      const ioMapping = bpmnFactory.create('zeebe:IoMapping');

      modeling.updateModdleProperties(element, extensionElements, {
        values: [ ...extensionElements.get('values'), ioMapping ]
      });

      const output = bpmnFactory.create('zeebe:Output');

      output.$parent = ioMapping;

      modeling.updateModdleProperties(element, ioMapping, {
        'zeebe:outputParameters': [ ...ioMapping.get('zeebe:outputParameters'), ioMapping ]
      });
    });
  }


  [
    [ 'adding zeebe:IoMapping extension element with zeebe:Output', addIoMapping ],
    [ 'adding zeebe:Output', addOutput ]
  ].forEach(([ type, fn ]) => {

    describe(`setting zeebe:propagateAllChildVariables to false when ${ type }`, function() {

      let element,
          calledElement;

      beforeEach(inject(function(elementRegistry) {

        // given
        element = elementRegistry.get('CallActivity_7');

        calledElement = getCalledElement(element);

        // when
        fn(element);
      }));


      it('should execute', inject(function() {

        // then
        expect(calledElement.get('propagateAllChildVariables')).to.be.false;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // assume
        expect(calledElement.get('propagateAllChildVariables')).to.true;
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(calledElement.get('propagateAllChildVariables')).to.be.false;
      }));

    });

  });

});
