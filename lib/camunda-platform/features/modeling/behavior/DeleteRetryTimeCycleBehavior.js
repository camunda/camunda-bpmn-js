import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific camunda:FailedJobRetryTimeCycle behavior.
 */
export default class DeleteRetryTimeCycleBehavior extends CommandInterceptor {
  constructor(eventBus, modeling) {
    super(eventBus);

    /**
     * Remove camunda:FailedJobRetryTimeCycle if camunda:asyncAfter or camunda:asyncBefore is set to false.
     */
    this.postExecute([
      'element.updateProperties',
      'properties-panel.update-businessobject'
    ], HIGH_PRIORITY, function(context) {
      const {
        element,
        properties
      } = context;

      const businessObject = getBusinessObject(element),
            extensionElements = businessObject.extensionElements;

      if (
        !is(element, 'camunda:AsyncCapable')
        || (properties[ 'camunda:asyncBefore' ] !== false && properties[ 'camunda:asyncAfter' ] !== false)
        || !extensionElements
        || !extensionElements.get('values').length
        || !extensionElements.get('values').find((value) => is(value, 'camunda:FailedJobRetryTimeCycle'))
        || getTimerEventDefinition(element)
        || isAsyncBefore(businessObject)
        || isAsyncAfter(businessObject)
      ) {
        return;
      }

      const values = extensionElements.get('values').filter((element) => {
        return !is(element, 'camunda:FailedJobRetryTimeCycle');
      });

      modeling.updateModdleProperties(element, extensionElements, { values });
    }, true);

  }
}

DeleteRetryTimeCycleBehavior.$inject = [
  'eventBus',
  'modeling'
];


// helpers //////////

function isAsyncBefore(businessObject) {
  return !!(businessObject.get('camunda:asyncBefore') || businessObject.get('camunda:async'));
}

function isAsyncAfter(businessObject) {
  return !!businessObject.get('camunda:asyncAfter');
}

function getTimerEventDefinition(element) {
  return getEventDefinition(element, 'bpmn:TimerEventDefinition');
}

function getEventDefinition(element, type) {
  const businessObject = getBusinessObject(element);

  const eventDefinitions = businessObject.get('eventDefinitions') || [];

  return eventDefinitions.find((eventDefinition) => {
    return is(eventDefinition, type);
  });
}
