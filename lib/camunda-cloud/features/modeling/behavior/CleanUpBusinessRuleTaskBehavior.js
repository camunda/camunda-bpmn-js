import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Zeebe BPMN behavior for ensuring that a BusinessRuleTask:
 * 1) Either has a taskDefinition ExtensionElement OR
 * 2) Or has a calledDecision ExtensionElement
 * 2.1) If it has a calledDecision ExtensionElement, it shall not have taskHeaders
 */
export default class CleanUpBusinessRuleTaskBehavior extends CommandInterceptor {
  constructor(eventBus, modeling) {
    super(eventBus);

    /**
     * Remove zeebe:calledDecision when zeebe:taskDefinition is added
     */
    this.postExecute([
      'properties-panel.update-businessobject-list',
      'element.updateModdleProperties'
    ] , HIGH_PRIORITY, function(context) {
      const {
        element,
        currentObject,
        objectsToAdd,
        moddleElement,
        properties
      } = context;

      // (1) map properties from both commands
      const extensionElement = currentObject || moddleElement,
            newValues = objectsToAdd || (properties && properties.values);

      // (2) check conditions and potentially update
      if (
        is(element, 'bpmn:BusinessRuleTask')
        && extensionElement
        && is(extensionElement, 'bpmn:ExtensionElements')
        && extensionElement.get('values').some((ele) => is(ele, 'zeebe:CalledDecision'))
        && newValues
        && newValues.some((ele) => is(ele, 'zeebe:TaskDefinition'))
      ) {
        removeCalledDecision(element, extensionElement, modeling);
      }
    }, true);

    /**
     * Remove zeebe:taskDefinition and zeebe:taskHeaders when zeebe:calledDecision
     */
    this.postExecute([
      'properties-panel.update-businessobject-list',
      'element.updateModdleProperties'
    ] , HIGH_PRIORITY, function(context) {
      const {
        element,
        currentObject,
        objectsToAdd,
        moddleElement,
        properties
      } = context;

      // (1) map properties from both commands
      const extensionElement = currentObject || moddleElement,
            newValues = objectsToAdd || (properties && properties.values);

      // (2) check conditions and potentially update
      if (
        is(element, 'bpmn:BusinessRuleTask')
        && extensionElement
        && is(extensionElement, 'bpmn:ExtensionElements')
        && extensionElement.get('values').some(
          (ele) => is(ele, 'zeebe:TaskDefinition') || is(ele, 'zeebe:TaskHeaders'))
        && newValues
        && newValues.some((ele) => is(ele, 'zeebe:CalledDecision'))
      ) {
        removeTaskDefintionAndHeaders(element, extensionElement, modeling);
      }
    }, true);

  }
}

CleanUpBusinessRuleTaskBehavior.$inject = [
  'eventBus',
  'modeling'
];


// helper ////////////////////

function removeFromExtensionElements(element, extensionElements, modeling, filterFun) {
  const values = extensionElements.get('values').filter(filterFun);

  modeling.updateModdleProperties(element, extensionElements, {
    values
  });
}

function removeCalledDecision(element, extensionElements, modeling) {
  removeFromExtensionElements(element, extensionElements, modeling,
    (ele) => !is(ele, 'zeebe:CalledDecision'));
}

function removeTaskDefintionAndHeaders(element, extensionElements, modeling) {
  removeFromExtensionElements(element, extensionElements, modeling,
    (ele) => !is(ele, 'zeebe:TaskDefinition') && !is(ele, 'zeebe:TaskHeaders'));
}
