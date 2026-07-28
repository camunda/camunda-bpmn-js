/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import * as ReplaceOptions from 'bpmn-js/lib/features/replace/ReplaceOptions';
import { isDifferentType } from 'bpmn-js/lib/features/popup-menu/util/TypeUtil';

import { ELEMENT_DESCRIPTIONS } from './descriptions';

import { mapPopupEntries } from '../../../util/PopupMenuEntriesUtil';

// run after the menu providers so their entries exist to annotate
const LOWER_PRIORITY = 500;

// popup-menu entry ids embed the element id behind a menu prefix; create and
// append additionally reuse `replace-with-` for some actions, so two can stack
const MENU_PREFIXES = [ 'create-', 'append-', 'replace-with-' ];

// actions whose remaining name still isn't the element id
const ACTION_TO_ELEMENT = {
  'subprocess': 'expanded-subprocess',
  'ad-hoc-subprocess': 'expanded-ad-hoc-subprocess',
  'none-start': 'none-start-event',
  'none-end': 'none-end-event',
  'none-intermediate-throw': 'none-intermediate-throwing'
};

function toElementId(entryId) {
  let id = entryId;

  MENU_PREFIXES.forEach(prefix => {
    if (id.startsWith(prefix)) {
      id = id.slice(prefix.length);
    }
  });

  return ACTION_TO_ELEMENT[id] || id;
}

// The "remove template" entry uses a single fixed id (no element type in it), so
// unlike the other entries its description can't be derived from the id. It reverts
// the element to its plain type, so we describe it as that type.
const REMOVE_TEMPLATE_ENTRY = 'replace-remove-element-template';

// Resolve the plain type's description id from the element's matching replace
// option, keeping it in sync with the regular `replace-with-*` entries.
function toElementIdFromType(element) {
  const differentType = isDifferentType(element);

  for (const options of Object.values(ReplaceOptions)) {
    if (!Array.isArray(options)) {
      continue;
    }

    const sameType = options.find(option => option.target && !differentType(option));

    if (sameType) {
      return toElementId(sameType.actionName);
    }
  }

  return null;
}

/**
 * Adds plain-language descriptions to the create, append and replace menus.
 *
 * bpmn-js ships the menus without element descriptions; this Camunda provider
 * injects them so the wording can be Camunda-specific and can be dropped by
 * simply not loading this module.
 */
export default function DescriptionProvider(popupMenu, translate) {
  this._translate = translate;

  popupMenu.registerProvider('bpmn-create', LOWER_PRIORITY, this);
  popupMenu.registerProvider('bpmn-append', LOWER_PRIORITY, this);
  popupMenu.registerProvider('bpmn-replace', LOWER_PRIORITY, this);
}

DescriptionProvider.$inject = [ 'popupMenu', 'translate' ];

DescriptionProvider.prototype.getPopupMenuEntries = function(element) {
  const translate = this._translate;

  return (entries) => mapPopupEntries(entries, (entry, id) => {
    const elementId = id === REMOVE_TEMPLATE_ENTRY ? toElementIdFromType(element) : toElementId(id);

    const description = ELEMENT_DESCRIPTIONS[elementId];

    return description ? { ...entry, description: translate(description) } : entry;
  });
};
