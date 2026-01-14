/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { CreateMenuProvider } from './CreateMenuProvider';
import { AppendMenuProvider } from './AppendMenuProvider';
import { ReplaceMenuProvider } from './ReplaceMenuProvider';

export const DecisionHandlerModule = {
  __init__: [
    'resources.decisionHandler.create',
    'resources.decisionHandler.append',
    'resources.decisionHandler.replace'
  ],
  'resources.decisionHandler.create': [ 'type', CreateMenuProvider ],
  'resources.decisionHandler.append': [ 'type', AppendMenuProvider ],
  'resources.decisionHandler.replace': [ 'type', ReplaceMenuProvider ]
};
