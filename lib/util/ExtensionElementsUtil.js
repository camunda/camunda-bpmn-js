import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { isArray } from 'min-dash';

/**
 * Get extension elements of business object. Optionally filter by type.
 *
 * @param  {djs.model.Base|ModdleElement} element
 * @param  {String} [type=undefined]
 * @returns {Array<ModdleElement>}
 */
export function getExtensionElementsList(element, type = undefined) {
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
 * Remove one or more extension elements. Remove bpmn:ExtensionElements afterwards if it's empty.
 *
 * @param {ModdleElement} element
 * @param {ModdleElement} businessObject
 * @param {ModdleElement|Array<ModdleElement>} extensionElementsToRemove
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
