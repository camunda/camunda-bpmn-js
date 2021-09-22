import {
  bootstrapCamundaCloudModeler,
  inject
} from 'test/TestHelper';

import contextPadModule from 'bpmn-js/lib/features/context-pad';
import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';
import paletteModule from 'bpmn-js/lib/features/palette';

import zeebeModelingModule from 'lib/camunda-cloud/features/modeling';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import processDiagramXML from './process-empty.bpmn';


describe('camunda-cloud/features/modeling - CreateBoundaryEventsBehavior', function() {

  const testModules = [
    contextPadModule,
    coreModule,
    modelingModule,
    paletteModule,
    zeebeModelingModule
  ];

  beforeEach(bootstrapCamundaCloudModeler(processDiagramXML, { modules: testModules }));


  it('should execute on attach', inject(function(bpmnFactory, canvas, elementFactory, modeling) {

    // given
    const messageEventDefinition = bpmnFactory.create('bpmn:MessageEventDefinition');

    const messageIntermediateCatchEvent = bpmnFactory.create('bpmn:IntermediateCatchEvent', {
      eventDefinitions: [ messageEventDefinition ]
    });

    const intermediateEvent = elementFactory.create('shape', {
      id: messageIntermediateCatchEvent.get('id'),
      businessObject: messageIntermediateCatchEvent
    });

    const rootElement = canvas.getRootElement(),
          task = elementFactory.createShape({ type: 'bpmn:Task' });

    modeling.createShape(task, { x: 100, y: 100 }, rootElement);

    // when
    const newEvent = modeling.createShape(intermediateEvent, { x: 100, y: 100 }, task, { attach: true });

    // then
    expect(newEvent).to.exist;
    expect(is(newEvent, 'bpmn:BoundaryEvent')).to.be.true;

    const businessObject = getBusinessObject(newEvent);

    expect(businessObject.get('attachedToRef')).to.equal(getBusinessObject(task));
    expect(businessObject.get('eventDefinitions')[ 0 ]).to.exist;
  }));


  it('should execute on attach (without event definition)', inject(function(bpmnFactory, canvas, elementFactory, modeling) {

    // given
    const messageIntermediateCatchEvent = bpmnFactory.create('bpmn:IntermediateCatchEvent');

    const intermediateEvent = elementFactory.create('shape', {
      id: messageIntermediateCatchEvent.get('id'),
      businessObject: messageIntermediateCatchEvent
    });

    const rootElement = canvas.getRootElement(),
          task = elementFactory.createShape({ type: 'bpmn:Task' });

    modeling.createShape(task, { x: 100, y: 100 }, rootElement);

    // when
    const newEvent = modeling.createShape(intermediateEvent, { x: 100, y: 100 }, task, { attach: true });

    // then
    expect(newEvent).to.exist;
    expect(is(newEvent, 'bpmn:BoundaryEvent')).to.be.true;

    const businessObject = getBusinessObject(newEvent);

    expect(businessObject.get('attachedToRef')).to.equal(getBusinessObject(task));
    expect(businessObject.get('eventDefinitions')).to.be.empty;
  }));


  it('should NOT execute on drop', inject(function(canvas, elementFactory, modeling) {

    // given
    const rootElement = canvas.getRootElement(),
          subProcess = elementFactory.createShape({ type: 'bpmn:SubProcess', isExpanded: true }),
          intermediateEvent = elementFactory.createShape({ type: 'bpmn:IntermediateCatchEvent' });

    modeling.createShape(subProcess, { x: 300, y: 200 }, rootElement);

    // when
    const newEvent = modeling.createShape(intermediateEvent, { x: 300, y: 200 }, subProcess);

    // then
    expect(newEvent).to.exist;
    expect(is(newEvent, 'bpmn:IntermediateCatchEvent')).to.be.true;
  }));

});