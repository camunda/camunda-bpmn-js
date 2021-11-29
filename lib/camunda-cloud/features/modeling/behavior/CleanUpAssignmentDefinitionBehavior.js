import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Zeebe BPMN behavior for ensuring that there are not empty (ie. without properties)
 * zeebe:assignmentDefinitions after modeling operations. Will also remove related
 * extensionElements, if they remain empty afterwards (could be a seperate
 * behavior in the future, if needed)
 */
export default class CleanUpBusinessRuleTaskBehavior extends CommandInterceptor {
  constructor(eventBus, modeling) {
    super(eventBus);

    /**
     * Remove zeebe:assignmentDefinition when it has no defined properties left after the operation
     */
    this.postExecuted([
      'properties-panel.update-businessobject',
      'element.updateModdleProperties'
    ] , HIGH_PRIORITY, function(context) {
      const {
        element,
        businessObject,
        moddleElement
      } = context;

      // (1) harmonize property names from commands
      const assignmentDefintion = businessObject || moddleElement;

      if (
        is(element, 'bpmn:UserTask')
        && assignmentDefintion
        && is(assignmentDefintion, 'zeebe:AssignmentDefinition')
        && assignmentDefintion.assignee === undefined
        && assignmentDefintion.candidateGroups === undefined
      ) {
        const extensionElements = getBusinessObject(element).extensionElements;

        // (2) remove zeebe:assignmentDefintion
        removeFromExtensionElements(element, extensionElements, modeling,
          (ele) => !is(ele, 'zeebe:AssignmentDefinition'));

        // (3) if extensionElements are empty afterwards, remove them as well
        if (extensionElements.values.length === 0) {
          modeling.updateModdleProperties(element, getBusinessObject(element),
            { extensionElements: undefined });
        }
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
