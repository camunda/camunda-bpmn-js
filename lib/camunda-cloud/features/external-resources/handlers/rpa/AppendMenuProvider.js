/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH under
 * one or more contributor license agreements. See the NOTICE file distributed
 * with this work for additional information regarding copyright ownership.
 * Licensed under the Camunda License 1.0. You may not use this file
 * except in compliance with the Camunda License 1.0.
 */

import { BaseAppendMenuProvider } from '../util/BaseAppendMenuProvider.js';
import { createElement } from './createElement.js';
import { dataUrl } from './rpaIcon.js';
import { searchTerms } from './searchTerms.js';

export class AppendMenuProvider extends BaseAppendMenuProvider {
  static $inject = [ 'injector' ];

  constructor(injector) {
    super(injector, {
      resourceType: 'rpa',
      groupName: 'RPA Scripts',
      className: 'bpmn-icon-rpa-script',
      createElement: (resource) => createElement(resource, injector),
      search: searchTerms,
      imageUrl: dataUrl
    });
  }
}
