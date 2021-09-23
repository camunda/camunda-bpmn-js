import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import inherits from 'inherits';

import { is } from 'bpmn-js/lib/util/ModelUtil';

import {
  getCalledElement,
  isPropagateAllChildVariables
} from '../../../helper/CalledElementHelper';

import {
  getInputParameters,
  getOutputParameters,
  getInputOutput
} from '../../../helper/InputOutputHelper';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 15000;


/**
 * UpdatePropagateAllChildVariablesBehavior reacts to either (1) toggling on propagateAllChildVariables
 * when there are outputParameters present or (2) to adding outputParameters when
 * propagateAllChildVariables is set to true.
 * It will ensure that the propagateAllChildVariables attribute on calledElement
 * extensionElements for callActivities is always consistent with outputParameter mappings
 */
export default function UpdatePropagateAllChildVariablesBehavior(eventBus, modeling) {

  CommandInterceptor.call(this, eventBus);

  // Behavior when toggling propagateAllChildVariables /////////////////////////
  /**
   * remove outputParameters from zeebe:IoMapping when setting propgateAlLChildVariables
   * to true in the proeprties panel
   */
  this.postExecute('properties-panel.update-businessobject' , HIGH_PRIORITY, function(context) {
    const {
      element,
      properties
    } = context;

    // (1) Don't execute this behavior if we are not in a call activity or not
    // have properties to update or not update the propagateAllChildVariables
    // to false
    if (!is(element, 'bpmn:CallActivity') ||
        !properties ||
        !!properties.propagateAllChildVariables === false) {
      return;
    }

    // (2) Check whether we have outputParameters
    const outputParameters = getOutputParameters(element),
          inputParameters = getInputParameters(element);

    if (!outputParameters ||
      outputParameters.length === 0) {
      return;
    }

    // (3) remove old outputParameters
    const inputOutput = getInputOutput(element);

    modeling.updateModdleProperties(element, inputOutput, {
      'zeebe:outputParameters': []
    });

    // (4) if we also have no inputParameters, remove IOMapping
    if (!inputParameters || inputParameters.length === 0) {
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


  // Behavior when adding outputParameters ////////////////////////////////////
  /**
   * un-toggle propgateAlLChildVariables when adding output parameters
   */
  this.postExecute('properties-panel.update-businessobject-list' , HIGH_PRIORITY, function(context) {
    const {
      element,
      objectsToAdd
    } = context;


    // (1) Exit if we are not in a CallActivity, not adding an OutputParameter or not
    // having set propagateAllChildVariables to false
    if (!is(element, 'bpmn:CallActivity') ||
     !objectsToAdd ||
     objectsToAdd.length === 0 ||
     objectsToAdd.filter(obj => is(obj, 'zeebe:Output')).length === 0 ||
    isPropagateAllChildVariables(element) === false) {
      return;
    }

    // (2) Store the old propAllChildVariables value and update it then
    const businessObject = getBusinessObject(element),
          calledElement = getCalledElement(businessObject);

    modeling.updateModdleProperties(element, calledElement, {
      'zeebe:propagateAllChildVariables': false
    });
  }, true);

}


UpdatePropagateAllChildVariablesBehavior.$inject = [
  'eventBus',
  'modeling'
];


inherits(UpdatePropagateAllChildVariablesBehavior, CommandInterceptor);
