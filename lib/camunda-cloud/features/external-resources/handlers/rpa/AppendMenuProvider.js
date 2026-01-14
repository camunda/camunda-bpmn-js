/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { BaseAppendMenuProvider } from '../util/BaseAppendMenuProvider.js';
import { RPA_ICON, RPA_TEMPLATE_ID } from './constants.js';
import { createElement } from './createElement.js';
import { searchTerms } from './searchTerms.js';

export class AppendMenuProvider extends BaseAppendMenuProvider {
  static $inject = [ 'injector' ];

  constructor(injector) {
    super(injector, {
      resourceType: 'rpa',
      groupName: 'RPA Scripts',
      className: 'bpmn-icon-rpa-script',
      createElement,
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
