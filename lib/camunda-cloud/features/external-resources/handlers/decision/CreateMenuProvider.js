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
import { BaseCreateMenuProvider } from '../util/BaseCreateMenuProvider.js';

export class CreateMenuProvider extends BaseCreateMenuProvider {
  static $inject = [
    'injector'
  ];

  constructor(injector) {
    super(injector, {
      resourceType: 'dmnDecision',
      groupName: 'Decisions',
      className: 'bpmn-icon-business-rule-task',
      createElement,
      search: searchTerms
    });
  }
}
