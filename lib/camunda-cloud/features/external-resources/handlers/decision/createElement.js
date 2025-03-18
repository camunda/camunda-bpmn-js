/**
 * @typedef {{
 *   type: 'dmnDecision',
 *   name: string,
 *   decisionId: string
 * }} Decision
 */

/**
 * @param {Decision} resource
 * @param {import('bpmn-js/lib/features/modeling/BpmnFactory').default} bpmnFactory
 */
export function createElement(resource, bpmnFactory) {
  return createDecisionTask(resource, bpmnFactory);
}

function createDecisionTask(resource, bpmnFactory) {
  const calledElement = createCalledDecision(resource, bpmnFactory);
  const extensionElements = bpmnFactory.create('bpmn:ExtensionElements', {
    values: [
      calledElement
    ]
  });

  return bpmnFactory.create('bpmn:BusinessRuleTask', {
    name: resource.name,
    extensionElements
  });
}

function createCalledDecision(resource, bpmnFactory) {
  return bpmnFactory.create('zeebe:CalledDecision', {
    decisionId: resource.decisionId
  });
}
