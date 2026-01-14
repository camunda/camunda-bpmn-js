/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import iconRendererModule from '@bpmn-io/element-template-icon-renderer';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

export const commonModules = [
  iconRendererModule
];

/**
 * @type { {
 *   zeebe: any
 * } }
 */
export const commonModdleExtensions = {
  zeebe: zeebeModdle
};