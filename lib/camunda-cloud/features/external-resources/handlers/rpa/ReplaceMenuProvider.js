/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH under
 * one or more contributor license agreements. See the NOTICE file distributed
 * with this work for additional information regarding copyright ownership.
 * Licensed under the Camunda License 1.0. You may not use this file
 * except in compliance with the Camunda License 1.0.
 */

import { BaseReplaceMenuProvider } from '../util/BaseReplaceMenuProvider.js';
import { RPA_ICON, RPA_TEMPLATE_ID } from './constants.js';
import { replaceElement } from './replaceElement.js';
import { searchTerms } from './searchTerms.js';

export class ReplaceMenuProvider extends BaseReplaceMenuProvider {
  static $inject = [ 'injector' ];

  constructor(injector) {
    super(injector, {
      resourceType: 'rpa',
      groupName: 'RPA Scripts',
      className: 'bpmn-icon-rpa-script',
      replaceElement: (element, resource, injector) => replaceElement(element, resource, injector),
      search: searchTerms,
      imageUrl: RPA_ICON
    });

    this._elementTemplates = injector.get('elementTemplates');
  }

  getPopupMenuEntries(element) {
    const templates = this._elementTemplates.getLatest(RPA_TEMPLATE_ID);

    if (!templates || templates.length === 0) {
      return {};
    }

    return super.getPopupMenuEntries(element);
  }
}
