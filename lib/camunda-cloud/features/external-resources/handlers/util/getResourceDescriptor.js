/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

const RESOURCE_ID_PROPERTIES = {
  bpmnProcess: 'processId',
  dmnDecision: 'decisionId',
  form: 'formId',
  rpa: 'scriptId'
};

/**
 * @typedef {import('../../ExternalResourcePopupMenuEntry.js').ExternalResourceDescriptor} ExternalResourceDescriptor
 */

/**
 * Return the stable descriptor for an external resource.
 *
 * Built-in resource types use their existing type-specific identifier. Custom
 * resource types may expose an `id` property to use the same descriptor.
 *
 * @param {any} resource
 *
 * @returns {ExternalResourceDescriptor|null}
 */
export function getResourceDescriptor(resource) {
  if (!resource || typeof resource.type !== 'string') {
    return null;
  }

  const idProperty = Object.prototype.hasOwnProperty.call(RESOURCE_ID_PROPERTIES, resource.type)
    ? RESOURCE_ID_PROPERTIES[resource.type]
    : null;
  const id = idProperty ? resource[idProperty] : resource.id;

  if (typeof id !== 'string') {
    return null;
  }

  return {
    type: resource.type,
    id
  };
}
