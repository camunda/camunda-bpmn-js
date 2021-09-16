import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';


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

    this.preExecute([
      'element.updateModdleProperties',
      'properties-panel.update-businessobject'
    ], function(context) {
      let {
        businessObject,
        moddleElement,
        properties
      } = context;

      businessObject = businessObject || moddleElement;

      if (!is(businessObject, 'camunda:FormField')) {
        return;
      }

      if ('camunda:type' in properties && properties[ 'camunda:type' ] !== 'enum') {
        properties[ 'camunda:values' ] = undefined;
      }
    }, true);

    this.preExecute([
      'element.updateModdleProperties',
      'properties-panel.update-businessobject'
    ], function(context) {
      let {
        businessObject,
        element,
        moddleElement,
        properties
      } = context;

      businessObject = businessObject || moddleElement;

      if (!is(businessObject, 'camunda:FormField')) {
        return;
      }

      const formData = getFormData(element);

      if ('camunda:id' in properties && isBusinessKey(businessObject, formData)) {
        modeling.updateModdleProperties(element, formData, {
          'camunda:businessKey': properties[ 'camunda:id' ]
        });
      }
    }, true);

    this.postExecute('properties-panel.update-businessobject-list', function(context) {
      const {
        currentObject: businessObject,
        element,
        propertyName,
        objectsToRemove = []
      } = context;

      if (!is(businessObject, 'camunda:FormData')
        || propertyName !== 'fields'
        || !objectsToRemove.length) {
        return;
      }

      const businessKey = businessObject.get('camunda:businessKey');

      if (!businessKey) {
        return;
      }

      objectsToRemove.forEach((object) => {
        if (is(object, 'camunda:FormField') && object.get('camunda:id') === businessKey) {
          modeling.updateModdleProperties(element, businessObject, {
            'camunda:businessKey': undefined
          });
        }
      });
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