/**
 * @typedef {{
 *   type: 'bpmnProcess',
 *   name: string,
 *   processId: string
 * }} CallActivity
 */

/**
 * Create a new BPMN element for the given process resource.
 *
 * @param {CallActivity} resource
 * @param {import('bpmn-js/lib/features/modeling/BpmnFactory').default} bpmnFactory
 *
 * @returns {import('bpmn-js/lib/model/Types').ModdleElement}
 */
export function createElement(resource, bpmnFactory) {
  return createCallActivity(resource, bpmnFactory);
}

/**
 * Create a new BPMN Call Activity for the given process resource.
 *
 * @param {CallActivity} resource
 * @param {import('bpmn-js/lib/features/modeling/BpmnFactory').default} bpmnFactory
 *
 * @returns {import('bpmn-js/lib/model/Types').ModdleElement}
 */
function createCallActivity(resource, bpmnFactory) {
  const calledElement = createCalledElement(resource, bpmnFactory);
  const extensionElements = bpmnFactory.create('bpmn:ExtensionElements', {
    values: [
      calledElement
    ]
  });

  return bpmnFactory.create('bpmn:CallActivity', {
    name: resource.name,
    extensionElements
  });
}

function createCalledElement(resource, bpmnFactory) {
  return bpmnFactory.create('zeebe:CalledElement', {
    processId: resource.processId
  });
}
