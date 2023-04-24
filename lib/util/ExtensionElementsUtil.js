import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { isArray } from 'min-dash';

/**
 * @typedef {import('diagram-js/lib/command/CommandStack').default} CommandStack
 *
 * @typedef {import('bpmn-js/lib/model/Types').Element} Element
 * @typedef {import('bpmn-js/lib/model/Types').ModdleElement} ModdleElement
 */

/**
 * Get extension elements of element. Optionally filter by type.
 *
 * @param  {Element|ModdleElement} element
 * @param  {string} [type]
 *
 * @return {ModdleElement[]}
 */
export function getExtensionElementsList(element, type) {
  const businessObject = getBusinessObject(element),
        extensionElements = businessObject.get('extensionElements');

  if (!extensionElements) {
    return [];
  }

  const values = extensionElements.get('values');

  if (!values || !values.length) {
    return [];
  }

  if (type) {
    return values.filter(value => is(value, type));
  }

  return values;
}

/**
 * Remove one or more extension elements. Remove bpmn:ExtensionElements
 * afterwards if it's empty.
 *
 * @param {Element} element
 * @param {ModdleElement} businessObject
 * @param {ModdleElement|ModdleElement[]} extensionElementsToRemove
 * @param {CommandStack} commandStack
 */
export function removeExtensionElements(element, businessObject, extensionElementsToRemove, commandStack) {
  if (!isArray(extensionElementsToRemove)) {
    extensionElementsToRemove = [ extensionElementsToRemove ];
  }

  const extensionElements = businessObject.get('extensionElements'),
        values = extensionElements.get('values').filter(value => !extensionElementsToRemove.includes(value));

  commandStack.execute('element.updateModdleProperties', {
    element,
    moddleElement: extensionElements,
    properties: {
      values
    }
  });
}
