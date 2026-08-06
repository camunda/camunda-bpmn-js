/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import inherits from 'inherits-browser';

import { REUSABLE_ASSETS_TAB, orderReusableEntries } from './tabs';

// run after the groups provider (900) built the category tree and after the
// descriptions / external-resources providers (500) filled it, so the
// assembled Templates category is there to lift into the tab
const LOWER_PRIORITY = 400;

/**
 * Splits the create/append/replace menu across two tabs: the BPMN element
 * categories stay where they are (no tab → default tab), while element
 * templates and linked resources move into a Reusable Assets tab.
 */
function TabsProvider(popupMenu, menuId, idPrefix) {
  this._idPrefix = idPrefix;

  popupMenu.registerProvider(menuId, LOWER_PRIORITY, this);
}

TabsProvider.prototype.getPopupMenuEntries = function() {
  const idPrefix = this._idPrefix;

  return (entries) => toTabs(entries, idPrefix);
};

function toTabs(entries, idPrefix) {
  const templatesCategoryId = `${ idPrefix }-templates`,
        templatePrefix = `${ idPrefix }.template-`;

  const entriesWithTabs = {};

  let hasReusableAssets = false;

  for (const [ id, entry ] of Object.entries(entries)) {

    // create/append: unwrap the Templates drill-in category, lifting element
    // templates and linked resources flat into the tab
    if (id === templatesCategoryId && entry.entries) {
      for (const [ childId, childEntry ] of Object.entries(entry.entries)) {
        entriesWithTabs[childId] = assignToReusableAssetsTab(childId, childEntry, templatePrefix);
      }

      hasReusableAssets = true;

      continue;
    }

    // replace has no category tree; template and resource entries sit flat
    if (id.startsWith(templatePrefix) || id.startsWith('resources-')) {
      entriesWithTabs[id] = assignToReusableAssetsTab(id, entry, templatePrefix);

      hasReusableAssets = true;

      continue;
    }

    entriesWithTabs[id] = entry;
  }

  // no reusable assets in this menu — leave it single-tabbed
  if (!hasReusableAssets) {
    return entries;
  }

  return orderReusableEntries(entriesWithTabs);
}

/**
 * Assign an entry to the Reusable Assets tab, making its template id
 * searchable — colleagues share assets by id.
 */
function assignToReusableAssetsTab(id, entry, templatePrefix) {
  const templateId = id.startsWith(templatePrefix)
    ? id.slice(templatePrefix.length)
    : null;

  return {
    ...entry,
    tab: REUSABLE_ASSETS_TAB,
    search: templateId ? [ ...asArray(entry.search), templateId ] : entry.search
  };
}

function asArray(value) {
  if (!value) {
    return [];
  }

  return Array.isArray(value) ? value : [ value ];
}


export function CreateTabsProvider(popupMenu) {
  TabsProvider.call(this, popupMenu, 'bpmn-create', 'create');
}

inherits(CreateTabsProvider, TabsProvider);

CreateTabsProvider.$inject = [ 'popupMenu' ];


export function AppendTabsProvider(popupMenu) {
  TabsProvider.call(this, popupMenu, 'bpmn-append', 'append');
}

inherits(AppendTabsProvider, TabsProvider);

AppendTabsProvider.$inject = [ 'popupMenu' ];


export function ReplaceTabsProvider(popupMenu) {
  TabsProvider.call(this, popupMenu, 'bpmn-replace', 'replace');
}

inherits(ReplaceTabsProvider, TabsProvider);

ReplaceTabsProvider.$inject = [ 'popupMenu' ];
