/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { replaceElement } from './replaceElement.js';
import { searchTerms } from './searchTerms.js';
import { BaseReplaceMenuProvider } from '../util/BaseReplaceMenuProvider.js';

export class ReplaceMenuProvider extends BaseReplaceMenuProvider {
  static $inject = [
    'injector'
  ];

  constructor(injector) {
    super(injector, {
      resourceType: 'form',
      groupName: 'Forms',
      className: 'bpmn-icon-user-task',
      replaceElement,
      search: searchTerms
    });
  }
}
