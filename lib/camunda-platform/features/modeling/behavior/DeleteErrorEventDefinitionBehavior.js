import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Camunda BPMN specific camunda:ErrorEventDefinition behavior.
 */
export default class DeleteErrorEventDefinitionBehavior extends CommandInterceptor {
  constructor(eventBus, modeling) {
    super(eventBus);

    /**
     * Remove camunda:ErrorEventDefinitions on camunda:type set to external.
     */
    this.postExecute([
      'element.updateProperties',
      'properties-panel.update-businessobject'
    ], HIGH_PRIORITY, function(context) {
      const {
        element,
        oldProperties,
        properties
      } = context;

      const businessObject = getBusinessObject(element),
            extensionElements = businessObject.get('extensionElements');

      if (is(element, 'camunda:ExternalCapable')
        && extensionElements
        && externalTypeChanged(oldProperties, properties)) {

        const values = extensionElements.get('values').filter((element) => {
          return !is(element, 'camunda:ErrorEventDefinition');
        });

        modeling.updateModdleProperties(element, extensionElements, { values });
      }
    }, true);

  }
}

DeleteErrorEventDefinitionBehavior.$inject = [
  'eventBus',
  'modeling'
];


// helpers //////////

function externalTypeChanged(oldProperties, updatesProperties) {
  const {
    'camunda:type': oldType
  } = oldProperties;

  const {
    'camunda:type': newType
  } = updatesProperties;

  return oldType === 'external' && newType !== 'external';
}