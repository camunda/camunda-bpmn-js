import { is } from 'bpmn-js/lib/util/ModelUtil';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { isUndefined } from 'min-dash';

import { removeExtensionElements } from '../../../../util/ExtensionElementsUtil';

const HIGH_PRIORITY = 5000;


/**
 * Zeebe BPMN behavior removing zeebe:AssignmentDefinition elements without
 * zeebe:assignee and zeebe:candidateGroups.
 */
export default class CleanUpBusinessRuleTaskBehavior extends CommandInterceptor {
  constructor(commandStack, eventBus) {
    super(eventBus);

    this.postExecuted('element.updateModdleProperties' , HIGH_PRIORITY, function(context) {
      const {
        element,
        moddleElement
      } = context;

      if (!is(moddleElement, 'zeebe:AssignmentDefinition')) {
        return;
      }

      const assignmentDefinition = moddleElement;

      if (
        is(element, 'bpmn:UserTask')
          && isUndefined(assignmentDefinition.get('zeebe:assignee'))
          && isUndefined(assignmentDefinition.get('zeebe:candidateGroups'))
      ) {
        const businessObject = getBusinessObject(element);

        removeExtensionElements(element, businessObject, assignmentDefinition, commandStack);
      }
    }, true);

  }
}

CleanUpBusinessRuleTaskBehavior.$inject = [
  'commandStack',
  'eventBus'
];