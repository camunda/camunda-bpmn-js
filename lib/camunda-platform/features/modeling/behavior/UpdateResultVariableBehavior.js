import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { has } from 'min-dash';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific camunda:resultVariable behavior ensuring
 * camunda:mapDecisionResult is removed when camunda:resultVariable is removed.
 */
export default class UpdateResultVariableBehavior extends CommandInterceptor {
  constructor(eventBus) {
    super(eventBus);

    this.preExecute([
      'element.updateProperties',
      'element.updateModdleProperties'
    ], HIGH_PRIORITY, function(context) {
      const {
        element,
        moddleElement,
        properties
      } = context;

      const businessObject = moddleElement || getBusinessObject(element);

      if (
        is(element, 'camunda:DmnCapable')
        && is(businessObject, 'camunda:DmnCapable')
        && has(properties, 'camunda:resultVariable')
        && isEmpty(properties[ 'camunda:resultVariable' ])
      ) {
        properties[ 'camunda:mapDecisionResult' ] = undefined;
      }
    }, true);

  }
}

UpdateResultVariableBehavior.$inject = [
  'eventBus'
];

// helpers //////////

function isEmpty(value) {
  return value == undefined || value === '';
}