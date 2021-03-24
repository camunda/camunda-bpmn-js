import {
  has
} from 'min-dash';

import {
  getOutputParameters
} from './InputOutputHelper';

import {
  getExtensionElements
} from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper';

import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

/**
  * Determine default value for propagateAllChildVariables attribute
  * @param {Object} element representing a bpmn:CallActivity
  *
  * @returns {boolean}
  */
function determinePropAllChildVariablesDefault(element) {
  const outputParameters = getOutputParameters(element);

  if (outputParameters) {
    return (outputParameters.length > 0) ? false : true;
  }
}

/**
  * Get the 'zeebe:CalledElement' extension element for a given business Object
  * @param {Object} bo businessObject
  *
  * @returns {Object} the calledElement Moddle Object or undefined if zeebe:CalledElement does not exist
  */
export function getCalledElement(element) {
  const calledElements = getCalledElements(element);
  return calledElements[0];
}

export function getCalledElements(element) {
  const bo = getBusinessObject(element);
  const extElements = getExtensionElements(bo, 'zeebe:CalledElement');
  return extElements;
}

/**
  * Check whether the propagateAllChildVariables attribute is set on an element.
  * Note that a default logic will be determine if it is not explicitly set.
  * @param {Object} element
  *
  * @returns {boolean}
  */
export function isPropagateAllChildVariables(element) {
  if (!is(element, 'bpmn:CallActivity')) {
    return undefined;
  }

  const bo = getBusinessObject(element),
        calledElement = getCalledElement(bo);

  return calledElement && has(calledElement, 'propagateAllChildVariables') ?
    calledElement.get('propagateAllChildVariables') :
    determinePropAllChildVariablesDefault(element);
}
