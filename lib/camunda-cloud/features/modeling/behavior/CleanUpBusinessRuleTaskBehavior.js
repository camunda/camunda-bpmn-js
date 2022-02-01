import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { without } from 'min-dash';

import { getExtensionElementsList } from '../../../../util/ExtensionElementsUtil';

const HIGH_PRIORITY = 5000;


/**
 * Zeebe BPMN behavior ensuring that bpmn:BusinessRuleTask only has one of the following:
 *
 * (1) zeebe:CalledDecision
 * (2) zeebe:TaskDefinition and zeebe:TaskHeaders
 */
export default class CleanUpBusinessRuleTaskBehavior extends CommandInterceptor {
  constructor(commandStack, eventBus) {
    super(eventBus);

    /**
     * Remove zeebe:CalledDecision if zeebe:TaskDefinition is about to be added.
     */
    this.preExecute('element.updateModdleProperties' , HIGH_PRIORITY, function(context) {
      const {
        element,
        moddleElement,
        properties
      } = context;

      if (
        !is(element, 'bpmn:BusinessRuleTask')
        || !is(moddleElement, 'bpmn:ExtensionElements')
        || !properties.values
      ) {
        return;
      }

      const calledDecision = getCalledDecision(element),
            taskDefinition = getTaskDefinition(element);

      if (
        calledDecision
        && !taskDefinition
        && properties.values.find(value => is(value, 'zeebe:CalledDecision'))
        && properties.values.find(value => is(value, 'zeebe:TaskDefinition'))
      ) {
        properties.values = without(properties.values, calledDecision);
      }
    }, true);

    /**
     * Remove zeebe:TaskDefinition and zeebe:TaskHeaders if zeebe:CalledDecision is about to be added.
     */
    this.preExecute('element.updateModdleProperties', HIGH_PRIORITY, function(context) {
      const {
        element,
        moddleElement,
        properties
      } = context;

      if (
        !is(element, 'bpmn:BusinessRuleTask')
        || !is(moddleElement, 'bpmn:ExtensionElements')
        || !properties.values
      ) {
        return;
      }

      const calledDecision = getCalledDecision(element),
            taskDefinition = getTaskDefinition(element),
            taskHeaders = getTaskHeaders(element);

      if (
        !calledDecision
        && (taskDefinition || taskHeaders)
        && properties.values.find(value => is(value, 'zeebe:CalledDecision'))
        && properties.values.find(value => is(value, 'zeebe:TaskDefinition') || is(value, 'zeebe:TaskHeaders'))
      ) {
        properties.values = without(properties.values, (value) => value === taskDefinition || value === taskHeaders);
      }
    }, true);

  }
}

CleanUpBusinessRuleTaskBehavior.$inject = [
  'commandStack',
  'eventBus'
];


// helpers //////////

function getCalledDecision(element) {
  const businessObject = getBusinessObject(element);

  return getExtensionElementsList(businessObject, 'zeebe:CalledDecision')[ 0 ];
}

function getTaskDefinition(element) {
  const businessObject = getBusinessObject(element);

  return getExtensionElementsList(businessObject, 'zeebe:TaskDefinition')[ 0 ];
}

function getTaskHeaders(element) {
  const businessObject = getBusinessObject(element);

  return getExtensionElementsList(businessObject, 'zeebe:TaskHeaders')[ 0 ];
}