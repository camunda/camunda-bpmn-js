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
 * @typedef {import('diagram-js/lib/features/popup-menu/PopupMenuProvider').PopupMenuEntry} PopupMenuEntry
 */

/**
 * @typedef {object} ExternalResourceDescriptor
 * @property {string} type
 * @property {string} id
 */

/**
 * @typedef {PopupMenuEntry & {
 *   resource: ExternalResourceDescriptor
 * }} ExternalResourcePopupMenuEntry
 */

/**
 * Check whether a popup entry represents an external resource.
 *
 * @param {unknown} entry
 *
 * @returns {entry is ExternalResourcePopupMenuEntry}
 */
export function isExternalResourcePopupMenuEntry(entry) {
  return Boolean(
    entry
    && typeof entry === 'object'
    && 'resource' in entry
    && isExternalResourceDescriptor(entry.resource)
  );
}

/**
 * @param {unknown} resource
 *
 * @returns {resource is ExternalResourceDescriptor}
 */
function isExternalResourceDescriptor(resource) {
  return Boolean(
    resource
    && typeof resource === 'object'
    && 'type' in resource
    && typeof resource.type === 'string'
    && 'id' in resource
    && typeof resource.id === 'string'
  );
}
