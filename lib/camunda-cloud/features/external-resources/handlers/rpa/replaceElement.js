/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
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
 * @param {import('diagram-js/lib/model').Element} element
 * @param {RPA} resource
 * @param {import('didi').Injector} injector
 */
export function replaceElement(element, resource, injector) {
  const modeling = injector.get('modeling'),
        commandStack = injector.get('commandStack');

  commandStack.execute('external-resources.composed-command', {
    command: replace
  });

  function replace() {
    const elementTemplates = injector.get('elementTemplates');

    const templates = elementTemplates.getLatest(RPA_TEMPLATE_ID);

    const RPATask = elementTemplates.applyTemplate(element, templates[0]);

    modeling.updateProperties(RPATask, {
      name: resource.name
    });

    const bo = getBusinessObject(RPATask);

    const extensionElements = bo.get('extensionElements');
    const linkedResources = extensionElements.get('values').find((el) => is(el, 'zeebe:LinkedResources'));

    const mainScript = linkedResources.values.find((el) => el.linkName === RPA_MAIN_SCRIPT_LINK_NAME);

    modeling.updateModdleProperties(RPATask, mainScript, {
      resourceId: resource.scriptId
    });

    return RPATask;
  }
}
