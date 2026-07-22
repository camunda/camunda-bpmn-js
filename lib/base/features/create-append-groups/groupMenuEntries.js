/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { GROUP_DESCRIPTIONS } from './options';


/**
 * Group flat create/append entries into the given category tree.
 *
 * Leaves reuse the existing entries by id (preserving their actions); empty
 * categories are dropped. Entries the static tree does not cover (e.g. the Templates
 * group) stay not touched at the top level.
 *
 * @param {Array<Object>} items category tree
 * @param {Object} entries flat entries keyed by id
 * @param {{ idPrefix: string, translate: Function }} config
 *
 * @return {Object} grouped entries
 */
export function groupMenuEntries(items, entries, config) {
  const rest = { ...entries };

  const grouped = buildGroups(items, rest, config);

  return { ...grouped, ...rest };
}

function buildGroups(items, rest, config) {
  const { idPrefix, translate } = config;

  const result = {};

  items.forEach(item => {
    if (item.items) {
      const childEntries = buildGroups(item.items, rest, config);

      if (Object.keys(childEntries).length) {
        const description = GROUP_DESCRIPTIONS[item.id];

        result[`${idPrefix}-${item.id}`] = {
          label: translate(item.name),
          className: item.className,
          ...(description && { description: translate(description) }),
          entries: childEntries
        };
      }
    } else {
      const id = `${idPrefix}-${item.actionName}`;

      if (rest[id]) {

        // the drill-in category replaces the flat `group` marker create-append
        const entry = { ...rest[id] };

        delete entry.group;

        result[id] = entry;

        delete rest[id];
      }
    }
  });

  return result;
}
