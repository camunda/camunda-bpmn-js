import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

const HIGH_PRIORITY = 5000;


/**
 * Zeebe BPMN specific behavior for creating boundary events.
 */
export default class CreateZeebeBoundaryEventBehavior extends CommandInterceptor {
  constructor(bpmnFactory, elementFactory, eventBus) {
    super(eventBus);

    /**
     * Replace intermediate catch event with boundary event when attaching it to a shape.
     */
    this.preExecute('shape.create', HIGH_PRIORITY, function(context) {
      const {
        shape,
        host
      } = context;

      const businessObject = getBusinessObject(shape);

      let attrs = {
        cancelActivity: true
      };

      let newBusinessObject,
          hostBusinessObject,
          boundaryEvent,
          eventDefinitions;

      if (!host || !is(shape, 'bpmn:IntermediateCatchEvent')) {
        return;
      }

      hostBusinessObject = getBusinessObject(host);

      attrs = {
        ...attrs,
        attachedToRef: hostBusinessObject
      };

      eventDefinitions = businessObject.eventDefinitions;

      newBusinessObject = bpmnFactory.create('bpmn:BoundaryEvent', attrs);

      boundaryEvent = {
        type: 'bpmn:BoundaryEvent',
        businessObject: newBusinessObject,
      };

      if (eventDefinitions && eventDefinitions[0]) {
        boundaryEvent = {
          ...boundaryEvent,
          eventDefinitionType: eventDefinitions[0].$type
        };
      }

      context.shape = elementFactory.createShape(boundaryEvent);

    }, true);

  }
}

CreateZeebeBoundaryEventBehavior.$inject = [
  'bpmnFactory',
  'elementFactory',
  'eventBus'
];