import inherits from 'inherits';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific `camunda:errorEventDefinition` behavior.
 *
 * When `camunda:type` is set to something different than `external`
 * on an element, then `camunda:errorEventDefinition` extension elements
 * shall be removed.
 */
export default function DeleteErrorEventDefinitionBehavior(eventBus) {

  CommandInterceptor.call(this, eventBus);

  this.executed([ 'properties-panel.update-businessobject', 'element.updateProperties' ],
    HIGH_PRIORITY, function(context) {
      const {
        element,
        oldProperties,
        properties
      } = context;

      const businessObject = getBusinessObject(element),
            extensionElements = businessObject.extensionElements;

      // (1) Check whether behavior is suitable
      if (
        is(element, 'camunda:ExternalCapable') &&
        extensionElements &&
        externalTypeChanged(oldProperties, properties)
      ) {

        // (2) Delete camunda:ErrorEventDefinition elements and save them for revert
        context.deletedErrorEventDefinitions = extensionElements.values;

        extensionElements.values = extensionElements.values.filter(
          element => !is(element, 'camunda:ErrorEventDefinition')
        );
      }

    }, true);

  this.reverted([ 'properties-panel.update-businessobject', 'element.updateProperties' ],
    HIGH_PRIORITY, function({ context }) {
      const {
        element,
        deletedErrorEventDefinitions: oldExtensionElements
      } = context;

      const businessObject = getBusinessObject(element);

      // Only intercept the revert, if the behavior became active
      if (oldExtensionElements) {
        const extensionElements = businessObject.extensionElements;

        extensionElements.values = oldExtensionElements;
      }
    });
}


DeleteErrorEventDefinitionBehavior.$inject = [
  'eventBus'
];

inherits(DeleteErrorEventDefinitionBehavior, CommandInterceptor);


// helper //////////////////

function externalTypeChanged(oldProperties, updatesProperties) {
  const {
    'camunda:type': oldType
  } = oldProperties;

  const {
    'camunda:type': newType
  } = updatesProperties;

  return oldType === 'external' && newType !== 'external';
}