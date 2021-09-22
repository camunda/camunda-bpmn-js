import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific camunda:exclusive behavior.
 */
export default class UpdateCamundaExclusiveBehavior extends CommandInterceptor {
  constructor(eventBus) {
    super(eventBus);

    /**
     * Set camunda:exclusive to true on camunda:asyncBefore or camunda:asyncAfter set to false.
     */
    this.preExecute([
      'element.updateProperties',
      'properties-panel.update-businessobject'
    ], HIGH_PRIORITY, function(context) {
      const {
        element,
        properties
      } = context;

      const businessObject = getBusinessObject(element);

      if (!is(element, 'camunda:AsyncCapable')
        || (properties[ 'camunda:asyncBefore' ] !== false && properties[ 'camunda:asyncAfter' ] !== false)
        || isExclusive(businessObject)
        || (isAsyncAfter(businessObject) && properties[ 'camunda:asyncAfter' ] !== false)
        || (isAsyncBefore(businessObject) && properties[ 'camunda:asyncBefore' ] !== false)
        || (properties[ 'camunda:asyncBefore' ] === true || properties[ 'camunda:asyncAfter' ] === true)
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
