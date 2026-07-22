/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

const templatesCategoryId = idPrefix => `${idPrefix}-templates`;

/**
 * Merge external-resource entries into the create-append "Templates" drill-in
 * category, so the Camunda 8 create/append menu groups consistently.
 *
 * Nests into the existing Templates category when create-append contributed one;
 * otherwise creates a minimal Templates category so the entries never fall back
 * to the top level. The category id is a contract with
 * `bpmn-js-create-append-anything` and is guarded by the integration test.
 *
 * @param {Object} entries entries accumulated by earlier providers
 * @param {Object} resourceEntries external-resource entries to nest
 * @param {{ idPrefix: string, translate: Function }} options
 *
 * @return {Object} the merged entries
 */
export function mergeIntoTemplatesCategory(entries, resourceEntries, { idPrefix, translate }) {
  if (!Object.keys(resourceEntries).length) {
    return entries;
  }

  const id = templatesCategoryId(idPrefix);
  const category = entries[id];

  if (category) {
    return {
      ...entries,
      [id]: {
        ...category,
        entries: { ...category.entries, ...resourceEntries }
      }
    };
  }

  return {
    ...entries,
    [id]: {
      label: translate('Templates'),
      description: translate('Preconfigured elements'),
      entries: resourceEntries
    }
  };
}
