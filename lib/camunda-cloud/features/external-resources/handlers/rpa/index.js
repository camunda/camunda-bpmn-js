/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH under
 * one or more contributor license agreements. See the NOTICE file distributed
 * with this work for additional information regarding copyright ownership.
 * Licensed under the Camunda License 1.0. You may not use this file
 * except in compliance with the Camunda License 1.0.
 */

import { CreateMenuProvider } from './CreateMenuProvider';
import { AppendMenuProvider } from './AppendMenuProvider';
import { ReplaceMenuProvider } from './ReplaceMenuProvider';

export const RPAHandlerModule = {
  __init__: [ 'resources.RPAHandler.create', 'resources.RPAHandler.append', 'resources.RPAHandler.replace' ],
  'resources.RPAHandler.create': [ 'type', CreateMenuProvider ],
  'resources.RPAHandler.append': [ 'type', AppendMenuProvider ],
  'resources.RPAHandler.replace': [ 'type', ReplaceMenuProvider ]
};
