/**
 * @typedef {{
 *   type: 'form',
 *   name: string,
 *   formId: string
 * }} Form
 */

/**
 * @param {Form} resource
 */
export function createElement(resource, bpmnFactory) {
  return createFormTask(resource, bpmnFactory);
}

function createFormTask(resource, bpmnFactory) {
  const formDefinition = createFormDefinition(resource, bpmnFactory);
  const extensionElements = bpmnFactory.create('bpmn:ExtensionElements', {
    values: [
      createZeebeUserTask(bpmnFactory),
      formDefinition
    ]
  });

  return bpmnFactory.create('bpmn:UserTask', {
    name: resource.name,
    extensionElements
  });
}

function createFormDefinition(resource, bpmnFactory) {
  return bpmnFactory.create('zeebe:FormDefinition', {
    formId: resource.formId
  });
}

function createZeebeUserTask(bpmnFactory) {
  return bpmnFactory.create('zeebe:UserTask');
}