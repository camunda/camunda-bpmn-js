import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';

import { createElement } from './ElementHelper';

import { isZeebeServiceTask } from './ZeebeServiceTaskHelper';


/**
 * Get zeebe:IoMapping from an element.
 *
 * @param {djs.model.Base|ModdleElement} element
 *
 * @return {ModdleElement}
 */
export function getIoMapping(element) {
  const businessObject = getBusinessObject(element);

  const extensionElements = businessObject.get('extensionElements');

  if (!extensionElements) {
    return;
  }

  return extensionElements.get('values').find((value) => {
    return is(value, 'zeebe:IoMapping');
  });
}

/**
 * Get zeebe:InputParameters from an element.
 *
 * @param  {djs.model.Base|ModdleElement} element
 *
 * @return {Array<ModdleElement>}
 */
export function getInputParameters(element) {
  const ioMapping = getIoMapping(element);

  if (ioMapping) {
    return ioMapping.get('zeebe:inputParameters');
  }

  return [];
}

/**
 * Get zeebe:OutputParameters from an element.
 *
 * @param  {djs.model.Base|ModdleElement} element
 *
 * @return {Array<ModdleElement>}
 */
export function getOutputParameters(element) {
  const ioMapping = getIoMapping(element);

  if (ioMapping) {
    return ioMapping.get('zeebe:outputParameters');
  }

  return [];
}

/**
 * Get zeebe:Input at index.
 *
 * @param {djs.model.Base|ModdleElement} element
 * @param {number} index
 *
 * @return {ModdleElement}
 */
export function getInputParameter(element, index) {
  return getInputParameters(element)[ index ];
}

/**
 * Get zeebe:Output at index.
 *
 * @param {djs.model.Base|ModdleElement} element
 * @param {number} index
 *
 * @return {ModdleElement}
 */
export function getOutputParameter(element, index) {
  return getOutputParameters(element)[ index ];
}

/**
 * Check whether element supports zeebe:Input or zeebe:Output.
 *
 * @param {djs.model.Base|ModdleElement} element
 *
 * @return {boolean}
 */
export function isInputOutputSupported(element) {
  return areInputParametersSupported(element) || areOutputParametersSupported(element);
}

/**
 * Check whether element supports zeebe:Input.
 *
 * @param {djs.model.Base|ModdleElement} element
 *
 * @return {boolean}
 */
export function areInputParametersSupported(element) {
  return isAny(element, [
    'bpmn:CallActivity',
    'bpmn:SubProcess',
    'bpmn:UserTask'
  ]) || isZeebeServiceTask(element);
}

/**
 * Check whether element supports zeebe:Output.
 *
 * @param {djs.model.Base|ModdleElement} element
 *
 * @return {boolean}
 */
export function areOutputParametersSupported(element) {
  return isAny(element, [
    'bpmn:CallActivity',
    'bpmn:Event',
    'bpmn:ReceiveTask',
    'bpmn:SubProcess',
    'bpmn:UserTask',
    'zeebe:ZeebeServiceTask'
  ]);
}

export function createIoMapping(parent, bpmnFactory, properties) {
  return createElement('zeebe:IoMapping', properties, parent, bpmnFactory);
}
