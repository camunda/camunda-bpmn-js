/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH under
 * one or more contributor license agreements. See the NOTICE file distributed
 * with this work for additional information regarding copyright ownership.
 * Licensed under the Camunda License 1.0. You may not use this file
 * except in compliance with the Camunda License 1.0.
 */

import { BaseCreateMenuProvider } from '../util/BaseCreateMenuProvider.js';
import { RPA_ICON, RPA_TEMPLATE_ID } from './constants.js';
import { createElement } from './createElement.js';
import { searchTerms } from './searchTerms.js';

export class CreateMenuProvider extends BaseCreateMenuProvider {
  static $inject = [ 'injector' ];

  constructor(injector) {
    super(injector, {
      resourceType: 'rpa',
      groupName: 'RPA Scripts',
      className: 'bpmn-icon-rpa-script',
      createElement: (resource) => createElement(resource, injector),
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
