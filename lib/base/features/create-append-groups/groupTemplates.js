/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

const TEMPLATES_ICON =
  '<svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
  '<rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1"/>' +
  '<rect x="9" y="2.5" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1"/>' +
  '<rect x="2.5" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1"/>' +
  '<rect x="9" y="9" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1"/>' +
  '</svg>';

/**
 * Collect the flat element-template entries into a single drill-in "Templates"
 * category. External resources are later merged into the same category.
 *
 * bpmn-js-create-append-anything emits template entries flat (`<idPrefix>.template-<id>`);
 * grouping them under a category is a Camunda presentation choice.
 *
 * @param {Object} entries
 * @param {{ idPrefix: string, translate: Function }} config
 *
 * @return {Object} entries with templates nested under the Templates category
 */
export function groupTemplates(entries, { idPrefix, translate }) {
  const prefix = `${idPrefix}.template-`;

  const templateEntries = {};
  const rest = {};

  Object.keys(entries).forEach(id => {
    if (id.startsWith(prefix)) {
      templateEntries[id] = entries[id];
    } else {
      rest[id] = entries[id];
    }
  });

  if (!Object.keys(templateEntries).length) {
    return entries;
  }

  return {
    ...rest,
    [`${idPrefix}-templates`]: {
      label: translate('Templates'),
      imageHtml: TEMPLATES_ICON,
      description: translate('Preconfigured elements'),
      entries: templateEntries
    }
  };
}
