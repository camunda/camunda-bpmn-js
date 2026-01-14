/**
 * @typedef {{
 *   type: 'dmnDecision',
 *   name: string,
 *   decisionId: string
 * }} Decision
 */

/**
 * Create a new BPMN element for the given decision resource.
 *
 * @param {Decision} resource
 * @param {import('didi').Injector} injector
 *
 * @returns {import('bpmn-js/lib/model/Types').ModdleElement}
 */
export function createElement(resource, injector) {
  return createDecisionTask(resource, injector);
}

/**
 * Create a new BPMN Business Rule Task for the given decision resource.
 *
 * @param {Decision} resource
 * @param {import('didi').Injector} injector
 *
 * @returns {import('bpmn-js/lib/model/Types').ModdleElement}
 */
function createDecisionTask(resource, injector) {
  const bpmnFactory = injector.get('bpmnFactory');

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
