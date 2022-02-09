import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  getExtensionElementsList,
  removeExtensionElements
} from '../../../../util/ExtensionElementsUtil';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific behavior ensuring camunda:ErrorEventDefinition extension elements are removed
 * if type of e.g. bpmn:ServiceTask is set to something other than external.
 */
export default class DeleteErrorEventDefinitionBehavior extends CommandInterceptor {
  constructor(commandStack, eventBus) {
    super(eventBus);

    this.postExecute([
      'element.updateProperties',
      'element.updateModdleProperties'
    ], HIGH_PRIORITY, function(context) {
      const {
        element,
        moddleElement,
        properties
      } = context;

      const businessObject = moddleElement || getBusinessObject(element);

      if (is(element, 'camunda:ExternalCapable')
        && is(businessObject, 'camunda:ExternalCapable')
        && properties[ 'camunda:type' ] !== 'external'
      ) {
        const errorEventDefinitions = getExtensionElementsList(businessObject, 'camunda:ErrorEventDefinition');

        if (errorEventDefinitions.length) {
          removeExtensionElements(element, businessObject, errorEventDefinitions, commandStack);
        }
      }
    }, true);

  }
}

DeleteErrorEventDefinitionBehavior.$inject = [
  'commandStack',
  'eventBus'
];