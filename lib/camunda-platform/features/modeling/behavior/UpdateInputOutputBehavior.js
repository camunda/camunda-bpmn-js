import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import {
  getInputOutput,
  isInputOutputEmpty
} from 'lib/camunda-platform/helper/InputOutputHelper';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

/**
 * Camunda BPMN specific camunda:InputOutput behavior.
 */
export default class UpdateInputOutputBehavior extends CommandInterceptor {
  constructor(eventBus, modeling) {
    super(eventBus);

    /**
     * Remove empty camunda:InputOutput on update.
     */
    this.postExecute([
      'element.updateProperties',
      'element.updateModdleProperties',
      'properties-panel.update-businessobject-list'
    ], function(context) {
      const {
        element,
        oldProperties,
        propertyName
      } = context;

      const businessObject = getBusinessObject(element),
            inputOutput = getInputOutput(businessObject),
            extensionElements = businessObject.get('extensionElements');

      // do not remove newly added camunda:InputOutput
      if (!oldProperties && propertyName === 'values') {
        return;
      }

      if (inputOutput && isInputOutputEmpty(inputOutput)) {
        const values = extensionElements.get('values').filter(function(element) {
          return element !== inputOutput;
        });

        modeling.updateModdleProperties(element, extensionElements, { values });
      }
    }, true);
  }
}

UpdateInputOutputBehavior.$inject = [
  'eventBus',
  'modeling'
];