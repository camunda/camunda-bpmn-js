import inherits from 'inherits';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  find
} from 'min-dash';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 15000;


/**
 * Camunda BPMN specific `camunda:FailedJobRetryTimeCycle` behavior.
 *
 * When `camunda:asyncAfter` or `camunda:asyncBefore` are set to false
 * on an element, then `camunda:FailedJobRetryTimeCycle` shall be removed. This ensures
 * that the BPMN diagram XML reflects the behavior of Camunda Platform engine.
 */
export default function DeleteRetryTimeCycleBehavior(eventBus) {

  CommandInterceptor.call(this, eventBus);

  this.executed([ 'properties-panel.update-businessobject', 'element.updateProperties' ],
    HIGH_PRIORITY, function(context) {
      const {
        element,
        properties
      } = context;

      const businessObject = getBusinessObject(element),
            extensionElements = businessObject.extensionElements;

      // (1.1) Execute if...
      if (is(element, 'camunda:AsyncCapable') && // ...asyncCapable
        properties && // ...properties updated
        (properties['camunda:asyncBefore'] === false || // ...update async (1)
          properties['camunda:asyncAfter'] === false) && // ...update async (2)
        (extensionElements && extensionElements.values.length) && // ...we have extensionElements
        (extensionElements.values.find(ele => is(ele, 'camunda:FailedJobRetryTimeCycle'))) && // ...we have retryTimeCycle
        !getTimerEventDefinition(element) // ...we don't have a TimerEventDefinition
      ) {

        // (1.2) ... but don't execute if one async is still true
        if (isAsyncBefore(businessObject) || isAsyncAfter(businessObject)) {
          return;
        }

        // (2) Delete the camunda:FailedJobRetryTimeCycle and save them for revert
        context.deleteRetryCycleOldExtElements = extensionElements.values;

        extensionElements.values = extensionElements.values.filter(
          ele => !is(ele, 'camunda:FailedJobRetryTimeCycle'));
      }

    }, true);

  this.reverted([ 'properties-panel.update-businessobject', 'element.updateProperties' ],
    HIGH_PRIORITY, function({ context }) {
      const {
        element,
        deleteRetryCycleOldExtElements: oldExtensionElements
      } = context;

      const businessObject = getBusinessObject(element);

      // Only intercept the revert, if the behavior became active
      if (oldExtensionElements) {
        const extensionElements = businessObject.extensionElements;

        extensionElements.values = oldExtensionElements;
      }
    });
}


DeleteRetryTimeCycleBehavior.$inject = [
  'eventBus'
];

inherits(DeleteRetryTimeCycleBehavior, CommandInterceptor);


// helper //////////////////

/**
 * Returns true if the attribute 'camunda:asyncBefore' is set
 * to true.
 *
 * @param  {ModdleElement} bo
 *
 * @return {boolean} a boolean value
 */
function isAsyncBefore(bo) {
  return !!(bo.get('camunda:asyncBefore') || bo.get('camunda:async'));
}

/**
 * Returns true if the attribute 'camunda:asyncAfter' is set
 * to true.
 *
 * @param  {ModdleElement} bo
 *
 * @return {boolean} a boolean value
 */
function isAsyncAfter(bo) {
  return !!bo.get('camunda:asyncAfter');
}

function getTimerEventDefinition(element) {
  return getEventDefinition(element, 'bpmn:TimerEventDefinition');
}

function getEventDefinition(element, eventType) {
  const businessObject = getBusinessObject(element);

  const eventDefinitions = businessObject.get('eventDefinitions') || [];

  return find(eventDefinitions, function(definition) {
    return is(definition, eventType);
  });
}
