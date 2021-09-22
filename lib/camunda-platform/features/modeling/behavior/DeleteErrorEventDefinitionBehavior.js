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
export default function DeleteErrorEventDefinitionBehavior(eventBus, modeling) {

  CommandInterceptor.call(this, eventBus);

  this.postExecute([ 'properties-panel.update-businessobject', 'element.updateProperties' ],
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

        // (2) delete camunda:ErrorEventDefinition elements
        const values = extensionElements.get('values').filter((element) => {
          return !is(element, 'camunda:ErrorEventDefinition');
        });

        modeling.updateModdleProperties(element, extensionElements, { values });
      }

    }, true);

}


DeleteErrorEventDefinitionBehavior.$inject = [
  'eventBus',
  'modeling'
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