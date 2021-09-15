import inherits from 'inherits';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

/**
 * Camunda BPMN specific `camunda:inputOutput` behavior.
 */
export default function UpdateInputOutputBehavior(eventBus, modeling) {

  CommandInterceptor.call(this, eventBus);

  this.postExecute([
    'element.updateProperties',
    'element.updateModdleProperties',
    'properties-panel.update-businessobject-list'
  ], function(context) {
    const {
      element
    } = context;

    const businessObject = getBusinessObject(element);
    const inputOutput = getInputOutput(businessObject);
    const extensionElements = businessObject.get('extensionElements');

    // remove camunda:inputOutput if there are no input/output parameters anymore
    if (inputOutput && isEmpty(inputOutput)) {
      const filtered = extensionElements.values.filter(function(element) {
        return element !== inputOutput;
      });

      modeling.updateModdleProperties(element, extensionElements, {
        values: filtered
      });
    }
  }, true);
}


UpdateInputOutputBehavior.$inject = [
  'eventBus',
  'modeling'
];

inherits(UpdateInputOutputBehavior, CommandInterceptor);


// helper //////////////////

function getInputParameters(inputOutput) {
  return inputOutput.get('inputParameters');
}

function getOutputParameters(inputOutput) {
  return inputOutput.get('outputParameters');
}

function getInputOutput(businessObject) {
  return (getExtensionElementsList(businessObject, 'camunda:InputOutput') || [])[0];
}

function getExtensionElementsList(businessObject, type = undefined) {
  const elements = ((businessObject.get('extensionElements') &&
                  businessObject.get('extensionElements').get('values')) || []);

  return (elements.length && type) ?
    elements.filter((value) => is(value, type)) :
    elements;
}

function isEmpty(inputOutput) {
  const inputParameters = getInputParameters(inputOutput);
  const outputParameters = getOutputParameters(inputOutput);

  return inputParameters.length === 0 && outputParameters.length === 0;
}