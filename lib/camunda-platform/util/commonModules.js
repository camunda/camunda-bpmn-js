/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';

export const commonModules = [];

/**
 * @type { {
 *   camunda: any
 * } }
 */
export const commonModdleExtensions = {
  camunda: camundaModdle
};