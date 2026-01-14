/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

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
 * @param {import('didi').Injector} injector
 *
 * @returns {import('bpmn-js/lib/model/Types').ModdleElement}
 */
export function createElement(resource, injector) {
  return createCallActivity(resource, injector);
}

/**
 * Create a new BPMN Call Activity for the given process resource.
 *
 * @param {CallActivity} resource
 * @param {import('didi').Injector} injector
 *
 * @returns {import('bpmn-js/lib/model/Types').ModdleElement}
 */
function createCallActivity(resource, injector) {
  const bpmnFactory = injector.get('bpmnFactory');

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

/**
 * Create a zeebe:CalledElement for the given process resource.
 *
 * @param {CallActivity} resource
 * @param {import('bpmn-js/lib/features/modeling/BpmnFactory').default} bpmnFactory
 *
 * @returns {import('bpmn-js/lib/model/Types').ModdleElement}
 */
function createCalledElement(resource, bpmnFactory) {
  return bpmnFactory.create('zeebe:CalledElement', {
    processId: resource.processId
  });
}
