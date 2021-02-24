import {
  getExtensionElements
} from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper';

import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  nextId
} from 'bpmn-js-properties-panel/lib/Utils';

import {
  find
} from 'min-dash';

const USER_TASK_FORM_PREFIX = 'userTaskForm_';


export function getUserTaskForm(element, parent) {

  const rootElement = parent || getRootElement(element);

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

export function createFormDefinition(properties, extensionElements, bpmnFactory) {
  return elementHelper.createElement(
    'zeebe:FormDefinition',
    properties,
    extensionElements,
    bpmnFactory
  );
}

export function createUserTaskForm(properties, extensionElements, bpmnFactory) {
  return elementHelper.createElement(
    'zeebe:UserTaskForm',
    properties,
    extensionElements,
    bpmnFactory
  );
}

export function createFormId() {
  return nextId(USER_TASK_FORM_PREFIX);
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