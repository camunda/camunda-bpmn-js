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
 * @typedef { { id: string, label: string, title?: string } } PopupMenuTab
 */

/**
 * Default tab for entries without a `tab` property.
 *
 * @type {PopupMenuTab}
 */
export const BPMN_TAB = {
  id: 'bpmn',
  label: 'BPMN'
};

/**
 * The tab holding everything reusable: element templates (connectors, catalog
 * assets, local templates) and linked resources (forms, called processes,
 * decisions, RPA).
 *
 * @type {PopupMenuTab}
 */
export const REUSABLE_ASSETS_TAB = {
  id: 'reusable-assets',
  label: 'Reusable assets',
  title: 'Building blocks you can reuse: element templates and connectors, '
    + 'CoE-approved catalog assets, and resources shared in your project '
    + '(forms, called processes, decisions).'
};

const DEFAULT_GROUP_ID = 'templates';

const CONNECTORS_GROUP_ID = 'connectors';

const REUSABLE_GROUPS = [
  'linked-resources', // forms, called processes, decisions, RPA
  'named-category', // any named template category, e.g. a CoE catalog
  'generic-templates', // the default Templates group and anything ungrouped
  'connectors' // the long connectors list, kept last
];

/**
 * Whether an entry has been assigned to the Reusable Assets tab.
 *
 * @param {Object} entry
 *
 * @return {boolean}
 */
export function isReusableAsset(entry) {
  return Boolean(entry.tab && entry.tab.id === REUSABLE_ASSETS_TAB.id);
}

/**
 * Order the Reusable Assets tab's groups per REUSABLE_GROUPS, so a curated
 * catalog is not buried under the connectors. First-seen order is preserved
 * within each group; `groupEntries` then renders the headers in this order.
 *
 * Entries outside the tab keep their position ahead of it.
 *
 * @param {Object} entries
 *
 * @return {Object}
 */
export function orderReusableEntries(entries) {
  const rest = {};
  const reusable = [];

  for (const [ id, entry ] of Object.entries(entries)) {
    if (isReusableAsset(entry)) {
      reusable.push([ id, entry ]);
    } else {
      rest[id] = entry;
    }
  }

  if (!reusable.length) {
    return entries;
  }

  const ordered = {};

  for (const group of REUSABLE_GROUPS) {
    for (const [ id, entry ] of reusable) {
      if (groupOf(id, entry) === group) {
        ordered[id] = entry;
      }
    }
  }

  return { ...rest, ...ordered };
}

/**
 * Classify a reusable entry into one of the `REUSABLE_GROUPS`.
 *
 * @param {string} id
 * @param {Object} entry
 *
 * @return {'linked-resources'|'connectors'|'generic-templates'|'named-category'}
 */
function groupOf(id, entry) {
  if (id.startsWith('resources-')) {
    return 'linked-resources';
  }

  const groupId = entry.group && (entry.group.id || entry.group);

  if (groupId === CONNECTORS_GROUP_ID) {
    return 'connectors';
  }

  if (!groupId || groupId === DEFAULT_GROUP_ID) {
    return 'generic-templates';
  }

  return 'named-category';
}
