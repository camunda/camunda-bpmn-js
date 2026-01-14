/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isArray
} from 'min-dash';

/**
 * @typedef {import('didi').Injector} Injector
 * @typedef {import('bpmn-js/lib/model/Types').ModdleElement} ModdleElement
 * @typedef {import('diagram-js/lib/features/popup-menu/PopupMenuProvider').PopupMenuEntries} PopupMenuEntries
 */

/**
 * @typedef {object} Config
 * @property {string} resourceType
 * @property {string} className
 * @property {string} groupName
 * @property {(element: ModdleElement, resource: ModdleElement, injector: Injector) => ModdleElement} replaceElement
 * @property {string} [search]
 */

export class BaseReplaceMenuProvider {

  /**
   * @param {import('didi').Injector} injector
   * @param {Config} config
   */
  constructor(injector, config) {

    this._injector = injector;
    this._popupMenu = injector.get('popupMenu');
    this._rules = injector.get('rules');
    this._translate = injector.get('translate');
    this._resources = injector.get('resources');

    this._popupMenu.registerProvider('bpmn-replace', this);

    this._config = config;
  }


  /**
   * @param {PopupMenuTarget} element
   *
   * @return {PopupMenuEntries}
   */
  getPopupMenuEntries(element) {
    const rules = this._rules;

    if (isArray(element) || !rules.allowed('shape.replace', { element })) {
      return {};
    }

    if (!is(element, 'bpmn:Activity')) {
      return {};
    }

    const {
      resourceType,
      groupName,
      replaceElement,
      ...additionalConfig
    } = this._config;

    const resources = this._resources.filter(r => r.type === resourceType);
    const entries = {};

    resources.forEach((resource, index) => {
      const replace = () => replaceElement(element, resource, this._injector);
      entries[`resources-replace-${resourceType}-${index}`] = {
        label: resource.name,
        action: replace,
        group: {
          id: groupName.toLowerCase(),
          name: this._translate(groupName)
        },
        ...additionalConfig
      };
    });

    return entries;
  }
}
