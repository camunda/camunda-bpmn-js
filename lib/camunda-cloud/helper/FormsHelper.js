import {
  getExtensionElements
} from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  find
} from 'min-dash';

export function getUserTaskForm(element) {

  const rootElement = getRootElement(element);

  // (1) get form definition from user task
  const formDefinition = getFormDefinition(element);

  if (!formDefinition) {
    return;
  }

  const formKey = formDefinition.get('formKey');

  // (2) retrieve user task form via form key
  const userTaskForm = findUserTaskForm(formKey, rootElement);

  return userTaskForm;
}

export function getFormDefinition(element) {
  const businessObject = getBusinessObject(element);

  const formDefinitions = getExtensionElements(businessObject, 'zeebe:FormDefinition');

  return formDefinitions && formDefinitions.length && formDefinitions[0];
}

export function createFormKey(formId) {
  return 'camunda-forms:bpmn:' + formId;
}


// helpers /////////////////////

function findUserTaskForm(formKey, rootElement) {
  const forms = getExtensionElements(rootElement, 'zeebe:UserTaskForm');

  return find(forms, function(userTaskForm) {
    return createFormKey(userTaskForm.id) === formKey;
  });
}

function getRootElement(element) {
  var businessObject = getBusinessObject(element),
      parent = businessObject;

  while (parent.$parent && !is(parent, 'bpmn:Process')) {
    parent = parent.$parent;
  }

  return parent;
}