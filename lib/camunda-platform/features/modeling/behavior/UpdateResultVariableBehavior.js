import { is } from 'bpmn-js/lib/util/ModelUtil';

import { has } from 'min-dash';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific camunda:resultVariable behavior.
 */
export default class UpdateResultVariableBehavior extends CommandInterceptor {
  constructor(eventBus) {
    super(eventBus);

    /**
     * Remove camunda:mapDecisionResult on camunda:resultVariable removed.
     */
    this.preExecute([
      'element.updateProperties',
      'properties-panel.update-businessobject'
    ], HIGH_PRIORITY, function(context) {
      const {
        element,
        properties
      } = context;

      if (
        is(element, 'camunda:DmnCapable')
        && has(properties, 'camunda:resultVariable')
        && isEmpty(properties[ 'camunda:resultVariable' ])
      ) {
        properties[ 'camunda:mapDecisionResult' ] = null;
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

