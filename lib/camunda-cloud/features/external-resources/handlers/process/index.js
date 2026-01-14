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

export const ProcessHandlerModule = {
  __init__: [
    'resources.processHandler.create',
    'resources.processHandler.append',
    'resources.processHandler.replace'
  ],
  'resources.processHandler.create': [ 'type', CreateMenuProvider ],
  'resources.processHandler.append': [ 'type', AppendMenuProvider ],
  'resources.processHandler.replace': [ 'type', ReplaceMenuProvider ]
};
