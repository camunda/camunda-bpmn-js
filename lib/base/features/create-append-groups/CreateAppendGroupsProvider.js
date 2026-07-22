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

import { CREATE_OPTIONS_TREE } from './options';

import { groupMenuEntries } from './groupMenuEntries';

import { groupTemplates } from './groupTemplates';

// run after the menu providers so their (flat) entries exist to arrange,
// but before lower-priority providers (descriptions, resources)
const LOWER_PRIORITY = 900;

/**
 * Arranges the flat create/append entries into the grouping tree and collects
 * element templates into a Templates category.
 */
function GroupsProvider(popupMenu, translate, menuId, idPrefix) {
  this._translate = translate;
  this._idPrefix = idPrefix;

  popupMenu.registerProvider(menuId, LOWER_PRIORITY, this);
}

GroupsProvider.prototype.getPopupMenuEntries = function() {
  const translate = this._translate,
        idPrefix = this._idPrefix;

  return (entries) => {
    const grouped = groupMenuEntries(CREATE_OPTIONS_TREE, entries, { idPrefix, translate });

    return groupTemplates(grouped, { idPrefix, translate });
  };
};


export function CreateGroupsProvider(popupMenu, translate) {
  GroupsProvider.call(this, popupMenu, translate, 'bpmn-create', 'create');
}

inherits(CreateGroupsProvider, GroupsProvider);

CreateGroupsProvider.$inject = [ 'popupMenu', 'translate' ];


export function AppendGroupsProvider(popupMenu, translate) {
  GroupsProvider.call(this, popupMenu, translate, 'bpmn-append', 'append');
}

inherits(AppendGroupsProvider, GroupsProvider);

AppendGroupsProvider.$inject = [ 'popupMenu', 'translate' ];
