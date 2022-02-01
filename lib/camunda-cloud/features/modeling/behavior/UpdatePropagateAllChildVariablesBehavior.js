import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

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

import {
  removeExtensionElements
} from '../../../../util/ExtensionElementsUtil';

const HIGH_PRIORITY = 5000;


/**
 * Zeebe BPMN behavior for updating bpmn:CallActivity elements
 * ensuring that only one of the following is true:
 *
 * (1) zeebe:propagateAllChildVariables of zeebe:CalledElement is set to true
 * (2) zeebe:IoMapping extension element has zeebe:Output elements
 */
export default class UpdatePropagateAllChildVariablesBehavior extends CommandInterceptor {
  constructor(commandStack, eventBus, modeling) {
    super(eventBus);

    /**
     * Remove zeebe:Output elements if zeebe:propagateAllChildVariables is set to true.
     * Remove zeebe:IoMapping extension element if empty.
     */
    this.postExecute('element.updateModdleProperties' , HIGH_PRIORITY, function(context) {
      const {
        element,
        moddleElement,
        properties = {}
      } = context;

      const propagateAllChildVariables = properties.propagateAllChildVariables || properties[ 'zeebe:propagateAllChildVariables' ];

      if (
        !is(element, 'bpmn:CallActivity')
        || !is(moddleElement, 'zeebe:CalledElement')
        || !propagateAllChildVariables
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
        removeExtensionElements(element, getBusinessObject(element), ioMapping, commandStack);
      }
    }, true);


    /**
     * Set zeebe:propagateAllChildVariables of zeebe:CalledElement to false if
     * zeebe:Output or zeebe:IoMapping with zeebe:Output is added.
     */
    this.preExecute('element.updateModdleProperties' , HIGH_PRIORITY, function(context) {
      const {
        element,
        moddleElement,
        properties
      } = context;

      if (
        !is(element, 'bpmn:CallActivity')
        || !isPropagateAllChildVariables(element)
      ) {
        return;
      }

      const businessObject = getBusinessObject(element),
            calledElement = getCalledElement(businessObject);

      // (1) zeebe:IoMapping extension element with zeebe:Output added
      if (
        is(moddleElement, 'bpmn:ExtensionElements')
        && properties.values
      ) {
        const ioMapping = properties.values.find((value) => is(value, 'zeebe:IoMapping'));

        if (
          ioMapping
          && ioMapping.get('outputParameters').length
          && !getIoMapping(element)
        ) {
          modeling.updateModdleProperties(element, calledElement, {
            'zeebe:propagateAllChildVariables': false
          });
        }
      }

      // (2) zeebe:Output added
      if (is(moddleElement, 'zeebe:IoMapping')) {
        const outputParameters = properties.outputParameters || properties[ 'zeebe:outputParameters' ];

        if (outputParameters && outputParameters.length) {
          modeling.updateModdleProperties(element, calledElement, {
            'zeebe:propagateAllChildVariables': false
          });
        }
      }

    }, true);

  }
}

UpdatePropagateAllChildVariablesBehavior.$inject = [
  'commandStack',
  'eventBus',
  'modeling'
];