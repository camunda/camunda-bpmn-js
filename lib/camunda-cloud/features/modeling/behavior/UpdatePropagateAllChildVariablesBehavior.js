import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  getCalledElement,
  isPropagateAllChildVariables
} from '../../../helper/CalledElementHelper';

import {
  getInputParameters,
  getOutputParameters,
  getIoMapping
} from '../../../helper/InputOutputHelper';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Zeebe BPMN behavior for updating zeebe:propagateAllChildVariables.
 */
export default class UpdatePropagateAllChildVariablesBehavior extends CommandInterceptor {
  constructor(eventBus, modeling) {
    super(eventBus);

    /**
     * Remove zeebe:OutputParameters when zeebe:propagateAllChildVariables is set to true.
     */
    this.postExecute('properties-panel.update-businessobject' , HIGH_PRIORITY, function(context) {
      const {
        element,
        properties
      } = context;

      if (
        !is(element, 'bpmn:CallActivity')
        || !properties
        || !!properties.propagateAllChildVariables === false
      ) {
        return;
      }

      const inputParameters = getInputParameters(element),
            outputParameters = getOutputParameters(element);

      if (!outputParameters || !outputParameters.length) {
        return;
      }

      const ioMapping = getIoMapping(element);

      modeling.updateModdleProperties(element, ioMapping, {
        'zeebe:outputParameters': []
      });

      if (!inputParameters || !inputParameters.length) {
        const businessObject = getBusinessObject(element),
              extensionElements = businessObject.get('extensionElements');

        const values = extensionElements.get('values').filter((element) => {
          return !is(element, 'zeebe:IoMapping');
        });

        modeling.updateModdleProperties(element, extensionElements, {
          values
        });
      }
    }, true);


    /**
     * Set zeebe:propagateAllChildVariables to false on zeebe:Output added.
     */
    this.postExecute('properties-panel.update-businessobject-list' , HIGH_PRIORITY, function(context) {
      const {
        currentObject,
        element,
        objectsToAdd,
        propertyName
      } = context;

      if (!is(element, 'bpmn:CallActivity')
        || !is(currentObject, 'zeebe:IoMapping')
        || (propertyName !== 'outputParameters' && propertyName !== 'zeebe:outputParameters')
        || !objectsToAdd
        || !objectsToAdd.length
        || !objectsToAdd.find((object) => is(object, 'zeebe:Output'))
        || !isPropagateAllChildVariables(element)) {
        return;
      }

      const businessObject = getBusinessObject(element),
            calledElement = getCalledElement(businessObject);

      modeling.updateModdleProperties(element, calledElement, {
        'zeebe:propagateAllChildVariables': false
      });
    }, true);

  }
}

UpdatePropagateAllChildVariablesBehavior.$inject = [
  'eventBus',
  'modeling'
];