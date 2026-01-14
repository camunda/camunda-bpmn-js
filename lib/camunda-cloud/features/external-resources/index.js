/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { Resources } from './Resources.js';
import { ResourceLoader } from './ResourceLoader.js';

import { ProcessHandlerModule } from './handlers/process/index.js';
import { DecisionHandlerModule } from './handlers/decision/index.js';
import { FormHandlerModule } from './handlers/form/index.js';
import { RPAHandlerModule } from './handlers/rpa/index.js';

import cmdModule from './cmd/index.js';

export const ResourcesModule = {
  __init__: [
    'resources.resourceLoader',
  ],
  'resources.resourceLoader': [ 'type', ResourceLoader ],
  'resources': [ 'type', Resources ],
};

export const DefaultHandlersModule = {
  __init__: [
    cmdModule
  ],
  __depends__: [
    DecisionHandlerModule,
    FormHandlerModule,
    ProcessHandlerModule,
    RPAHandlerModule
  ]
};
