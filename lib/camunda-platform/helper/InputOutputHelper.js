import { is } from 'bpmn-js/lib/util/ModelUtil';


export function getInputOutput(businessObject) {
  const extensionElements = businessObject.get('extensionElements');

  if (!extensionElements) {
    return;
  }

  return extensionElements.get('values').find((value) => {
    return is(value, 'camunda:InputOutput');
  });
}

export function getInputParameters(inputOutput) {
  return inputOutput.get('inputParameters');
}

export function getOutputParameters(inputOutput) {
  return inputOutput.get('outputParameters');
}

export function isInputOutputEmpty(inputOutput) {
  const inputParameters = getInputParameters(inputOutput);
  const outputParameters = getOutputParameters(inputOutput);

  return !inputParameters.length && !outputParameters.length;
}