/**
 * @typedef {{
 *   type: 'form',
 *   name: string,
 *   formId: string
 * }} Form
 */

/**
 * Create a new BPMN element for the given form resource.
 *
 * @param {Form} resource
 * @param {import('didi').Injector} injector
 *
 * @returns {import('bpmn-js/lib/model/Types').ModdleElement}
 */
export function createElement(resource, injector) {
  return createFormTask(resource, injector);
}

/**
 * Create a new BPMN User Task for the given form resource.
 *
 * @param {Form} resource
 * @param {import('didi').Injector} injector
 *
 * @returns {import('bpmn-js/lib/model/Types').ModdleElement}
 */
function createFormTask(resource, injector) {
  const bpmnFactory = injector.get('bpmnFactory');

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