/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { createElement } from './createElement.js';
import { searchTerms } from './searchTerms.js';
import { BaseAppendMenuProvider } from '../util/BaseAppendMenuProvider.js';

export class AppendMenuProvider extends BaseAppendMenuProvider {
  static $inject = [
    'injector'
  ];

  constructor(injector) {
    super(injector, {
      resourceType: 'form',
      groupName: 'Forms',
      className: 'bpmn-icon-user-task',
      createElement,
      search: searchTerms
    });
  }
}
