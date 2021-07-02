import { getExtensionElements } from './ExtensionElementsHelper';

import { createElement } from './ElementHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { nextId } from './Utils';

import { find } from 'min-dash';

const USER_TASK_FORM_PREFIX = 'UserTaskForm_';


export function createFormDefinition(properties, extensionElements, bpmnFactory) {
  return createElement(
    'zeebe:FormDefinition',
    properties,
    extensionElements,
    bpmnFactory
  );
}

export function createFormId() {
  return nextId(USER_TASK_FORM_PREFIX);
}

export function createFormKey(formId) {
  return `camunda-forms:bpmn:${ formId }`;
}

export function createUserTaskForm(properties, extensionElements, bpmnFactory) {
  return createElement(
    'zeebe:UserTaskForm',
    properties,
    extensionElements,
    bpmnFactory
  );
}

function findUserTaskForm(formKey, rootElement) {
  const userTaskForms = getExtensionElements(rootElement, 'zeebe:UserTaskForm');

  return find(userTaskForms, function(userTaskForm) {
    const id = userTaskForm.get('zeebe:id');

    return createFormKey(id) === formKey;
  });
}

export function getFormDefinition(element) {
  const businessObject = getBusinessObject(element);

  const formDefinitions = getExtensionElements(businessObject, 'zeebe:FormDefinition');

  return formDefinitions[ 0 ];
}

function getRootElement(element) {
  var businessObject = getBusinessObject(element),
      parent = businessObject;

  while (parent.$parent && !is(parent, 'bpmn:Process')) {
    parent = parent.$parent;
  }

  return parent;
}

export function getUserTaskForm(element, parent) {
  const rootElement = parent || getRootElement(element);

  const formDefinition = getFormDefinition(element);

  if (!formDefinition) {
    return;
  }

  const formKey = formDefinition.get('zeebe:formKey');

  return findUserTaskForm(formKey, rootElement);
}