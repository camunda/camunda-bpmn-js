/**
 * @typedef {{
 *   type: 'bpmnProcess',
 *   name: string,
 *   processId: string
 * }} CallActivity
 */

/**
 *
 * @param {CallActivity} resource
 * @param {import('bpmn-js/lib/features/modeling/BpmnFactory').default} bpmnFactory
 */
export function createElement(resource, bpmnFactory) {
  return createCallActivity(resource, bpmnFactory);
}

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
