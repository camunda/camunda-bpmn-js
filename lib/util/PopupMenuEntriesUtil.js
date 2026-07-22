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
 * Map every entry of a (possibly nested, drill-in) popup menu, preserving the
 * tree structure.
 *
 * @param {Object} entries popup menu entries keyed by id
 * @param {(entry: Object, id: string) => Object} fn
 *
 * @return {Object} a new entries object
 */
export function mapPopupEntries(entries, fn) {
  return Object.entries(entries).reduce((result, [ id, entry ]) => {
    let mapped = fn(entry, id);

    if (mapped.entries) {
      mapped = { ...mapped, entries: mapPopupEntries(mapped.entries, fn) };
    }

    result[id] = mapped;

    return result;
  }, {});
}

/**
 * Find a popup menu entry by id at any depth of a (possibly nested) menu.
 *
 * @param {Object} entries popup menu entries keyed by id
 * @param {string} id
 *
 * @return {Object|null} the entry, or null if not found
 */
export function findPopupEntry(entries, id) {
  for (const key of Object.keys(entries)) {
    const entry = entries[key];

    if (key === id) {
      return entry;
    }

    const found = entry && entry.entries && findPopupEntry(entry.entries, id);

    if (found) {
      return found;
    }
  }

  return null;
}
