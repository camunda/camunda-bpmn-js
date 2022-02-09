import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import {
  getExtensionElementsList,
  removeExtensionElements
} from '../../../../util/ExtensionElementsUtil';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific behavior ensuring camunda:FailedJobRetryTimeCycle is
 * removed when both camunda:asyncAfter and camunda:asyncBefore set to false.
 * Doesn't apply if element has bpmn:TimerEventDefinition.
 */
export default class DeleteRetryTimeCycleBehavior extends CommandInterceptor {
  constructor(commandStack, eventBus) {
    super(eventBus);

    this.postExecute([
      'element.updateProperties',
      'element.updateModdleProperties'
    ], HIGH_PRIORITY, function(context) {
      const {
        element,
        moddleElement,
        properties = {}
      } = context;

      const asyncAfter = properties[ 'camunda:asyncAfter' ],
            asyncBefore = properties[ 'camunda:asyncBefore' ];

      const businessObject = moddleElement || getBusinessObject(element);

      const failedJobRetryTimeCycle = getFailedJobRetryTimeCycle(element);

      if (
        !is(element, 'camunda:AsyncCapable')
        || !is(businessObject, 'camunda:AsyncCapable')
        || (asyncAfter !== false && asyncBefore !== false)
        || !failedJobRetryTimeCycle
        || getTimerEventDefinition(element)
        || isAsyncBefore(businessObject)
        || isAsyncAfter(businessObject)
      ) {
        return;
      }

      removeExtensionElements(element, businessObject, failedJobRetryTimeCycle, commandStack);
    }, true);

  }
}

DeleteRetryTimeCycleBehavior.$inject = [
  'commandStack',
  'eventBus'
];


// helpers //////////

function isAsyncBefore(businessObject) {
  return !!(businessObject.get('camunda:asyncBefore') || businessObject.get('camunda:async'));
}

function isAsyncAfter(businessObject) {
  return !!businessObject.get('camunda:asyncAfter');
}

function getFailedJobRetryTimeCycle(element) {
  return getExtensionElementsList(element, 'camunda:FailedJobRetryTimeCycle')[ 0 ];
}

function getTimerEventDefinition(element) {
  return getEventDefinition(element, 'bpmn:TimerEventDefinition');
}

function getEventDefinition(element, type) {
  const businessObject = getBusinessObject(element);

  const eventDefinitions = businessObject.get('eventDefinitions');

  if (!eventDefinitions || !eventDefinitions.length) {
    return;
  }

  return eventDefinitions.find((eventDefinition) => {
    return is(eventDefinition, type);
  });
}
