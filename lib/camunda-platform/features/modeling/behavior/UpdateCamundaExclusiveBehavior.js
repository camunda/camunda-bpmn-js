import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific behavior ensuring camunda:exclusive is set to true if
 * camunda:asyncBefore or camunda:asyncAfter is set to false.
 */
export default class UpdateCamundaExclusiveBehavior extends CommandInterceptor {
  constructor(eventBus) {
    super(eventBus);

    this.preExecute([
      'element.updateProperties',
      'element.updateModdleProperties',
    ], HIGH_PRIORITY, function(context) {
      const {
        element,
        moddleElement,
        properties = {}
      } = context;

      const businessObject = moddleElement || getBusinessObject(element);

      const asyncAfter = properties[ 'camunda:asyncAfter' ],
            asyncBefore = properties[ 'camunda:asyncBefore' ];

      if (!is(element, 'camunda:AsyncCapable')
        || !is(businessObject, 'camunda:AsyncCapable')
        || (asyncAfter !== false && asyncBefore !== false)
        || isExclusive(businessObject)
        || (isAsyncAfter(businessObject) && asyncAfter !== false)
        || (isAsyncBefore(businessObject) && asyncBefore !== false)
        || (asyncAfter === true || asyncBefore === true)
      ) {
        return;
      }

      properties[ 'camunda:exclusive' ] = true;
    }, true);

  }
}

UpdateCamundaExclusiveBehavior.$inject = [
  'eventBus'
];


// helpers //////////

function isAsyncBefore(businessObject) {
  return !!(businessObject.get('camunda:asyncBefore') || businessObject.get('camunda:async'));
}

function isAsyncAfter(businessObject) {
  return !!businessObject.get('camunda:asyncAfter');
}

function isExclusive(businessObject) {
  return !!businessObject.get('camunda:exclusive');
}
