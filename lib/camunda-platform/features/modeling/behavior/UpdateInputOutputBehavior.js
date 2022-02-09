import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { isInputOutputEmpty } from '../../../helper/InputOutputHelper';

import {
  removeExtensionElements
} from '../../../../util/ExtensionElementsUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const LOW_PRIORITY = 250;


/**
 * Camunda BPMN specific behavior ensuring empty camunda:InputOutput is removed.
 */
export default class UpdateInputOutputBehavior extends CommandInterceptor {
  constructor(commandStack, eventBus) {
    super(eventBus);

    this.postExecuted('element.updateModdleProperties', LOW_PRIORITY, function(context) {
      const {
        element,
        moddleElement
      } = context;

      if (!is(moddleElement, 'camunda:InputOutput')) {
        return;
      }

      if (isInputOutputEmpty(moddleElement)) {
        removeExtensionElements(element, getBusinessObject(element), moddleElement, commandStack);
      }
    }, true);
  }
}

UpdateInputOutputBehavior.$inject = [
  'commandStack',
  'eventBus'
];