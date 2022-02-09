import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';

import { has } from 'min-dash';


/**
 * Camunda BPMN specific user task generated forms behavior.
 *
 * 1. Removes camunda:FormField#values if camunda:FormField#type is changed to something other than enum.
 * 2. Updates camunda:FormData#businessKey if camunda:FormField#id is changed.
 * 3. Removes camunda:FormData#businessKey if camunda:FormField is removed.
 */
export default class UserTaskFormsBehavior extends CommandInterceptor {
  constructor(eventBus, modeling) {
    super(eventBus);

    /**
     * Remove camunda:FormField#values if camunda:FormField#type is changed to
     * something other than enum.
     */
    this.preExecute('element.updateModdleProperties', function(context) {
      const {
        moddleElement,
        properties
      } = context;

      if (!is(moddleElement, 'camunda:FormField')) {
        return;
      }

      if ('camunda:type' in properties && properties[ 'camunda:type' ] !== 'enum') {
        properties[ 'camunda:values' ] = undefined;
      }
    }, true);

    /**
     * Update camunda:FormData#businessKey if camunda:FormField#id is changed.
     */
    this.preExecute('element.updateModdleProperties', function(context) {
      const {
        element,
        moddleElement,
        properties
      } = context;

      if (!is(moddleElement, 'camunda:FormField') || !has(properties, 'camunda:id')) {
        return;
      }

      const formData = getFormData(element);

      if (isBusinessKey(moddleElement, formData)) {
        modeling.updateModdleProperties(element, formData, {
          'camunda:businessKey': properties[ 'camunda:id' ]
        });
      }
    }, true);

    /**
     * Remove camunda:FormData#businessKey if camunda:FormField is removed.
     */
    this.postExecute('element.updateModdleProperties', function(context) {
      const {
        element,
        moddleElement,
        properties
      } = context;

      if (!is(moddleElement, 'camunda:FormData') || !has(properties, 'fields')) {
        return;
      }

      const businessKey = moddleElement.get('camunda:businessKey');

      if (!businessKey) {
        return;
      }

      const fieldWithBusinessKey = moddleElement.get('fields').find(field => {
        return field.get('camunda:id') === businessKey;
      });

      if (!fieldWithBusinessKey) {
        modeling.updateModdleProperties(element, moddleElement, {
          'camunda:businessKey': undefined
        });
      }
    }, true);
  }
}


UserTaskFormsBehavior.$inject = [ 'eventBus', 'modeling' ];

// helpers //////////

function isBusinessKey(formField, formData) {
  return formField.get('camunda:id') === formData.get('camunda:businessKey');
}

function getFormData(element) {
  const businessObject = getBusinessObject(element),
        extensionElements = businessObject.get('extensionElements');

  if (!extensionElements) {
    return;
  }

  const values = extensionElements.get('values');

  return values.find((value) => {
    return is(value, 'camunda:FormData');
  });
}