/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH under
 * one or more contributor license agreements. See the NOTICE file distributed
 * with this work for additional information regarding copyright ownership.
 * Licensed under the Camunda License 1.0. You may not use this file
 * except in compliance with the Camunda License 1.0.
 */

import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';


/**
 * @typedef {{
 *   type: 'RPA',
 *   name: string,
 *   rpaResourceId: string
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

  const templates = elementTemplates.getLatest('camunda.connectors.rpa');

  if (!templates || templates.length === 0) {
    return null;
  }

  const RPATask = elementTemplates.createElement(templates[0]);

  const bo = getBusinessObject(RPATask);
  const extensionElements = bo.get('extensionElements');
  const linkedResources = extensionElements.get('values').find((el) => is(el, 'zeebe:LinkedResources'));

  const mainScript = linkedResources.values.find((el) => el.linkName === 'RPAScript');

  mainScript.set('resourceId', resource.rpaResourceId);

  bo.set('name', resource.name);

  return bo;
}
