/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH under
 * one or more contributor license agreements. See the NOTICE file distributed
 * with this work for additional information regarding copyright ownership.
 * Licensed under the Camunda License 1.0. You may not use this file
 * except in compliance with the Camunda License 1.0.
 */

import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import { RPA_MAIN_SCRIPT_LINK_NAME, RPA_TEMPLATE_ID } from './constants';

/**
 * @typedef {{
 *   type: 'RPA',
 *   name: string,
 *   scriptId: string
 * }} RPA
 */

/**
 * @param {RPA} resource
 */
export function createElement(resource, injector) {
  return createRPATask(resource, injector);
}

function createRPATask(resource, injector) {
  const elementTemplates = injector.get('elementTemplates');

  const templates = elementTemplates.getLatest(RPA_TEMPLATE_ID);

  const RPATask = elementTemplates.createElement(templates[0]);

  const bo = getBusinessObject(RPATask);
  const extensionElements = bo.get('extensionElements');
  const linkedResources = extensionElements.get('values').find((el) => is(el, 'zeebe:LinkedResources'));

  const mainScript = linkedResources.values.find((el) => el.linkName === RPA_MAIN_SCRIPT_LINK_NAME);

  mainScript.set('resourceId', resource.scriptId);

  bo.set('name', resource.name);

  return bo;
}
