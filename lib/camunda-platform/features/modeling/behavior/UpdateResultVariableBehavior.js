import inherits from 'inherits';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  has
} from 'min-dash';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific `camunda:resultVariable` behavior.
 *
 * When `camunda:resultVariable` is removed from a service task like element
 * `camunda:mapDecisionResult` for the element will be cleaned up.
 */
export default function UpdateResultVariableBehavior(eventBus) {

  CommandInterceptor.call(this, eventBus);

  this.preExecute([ 'properties-panel.update-businessobject', 'element.updateProperties' ],
    HIGH_PRIORITY, function(context) {
      const {
        element,
        properties
      } = context;

      if (
        is(element, 'camunda:DmnCapable') &&
        has(properties, 'camunda:resultVariable') &&
        isEmpty(properties['camunda:resultVariable'])
      ) {
        properties['camunda:mapDecisionResult'] = null;
      }
    }, true);
}


UpdateResultVariableBehavior.$inject = [
  'eventBus'
];

inherits(UpdateResultVariableBehavior, CommandInterceptor);


// helper //////////////////

function isEmpty(value) {
  return value == undefined || value === '';
}

