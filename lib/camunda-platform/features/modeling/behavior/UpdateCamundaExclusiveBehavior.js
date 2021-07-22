import inherits from 'inherits';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 15000;


/**
 * Camunda BPMN specific `camunda:exclusive` behavior.
 *
 * When `camunda:asyncAfter` or `camunda:asyncBefore` are set to false
 * on an element, then `camunda:exclusive` shall be set to true. This ensures
 * that the BPMN diagram XML reflects the behavior of Camunda Platform engine.
 */
export default function UpdateCamundaExclusiveBehavior(eventBus) {

  CommandInterceptor.call(this, eventBus);

  this.preExecute([ 'properties-panel.update-businessobject', 'element.updateProperties' ],
    HIGH_PRIORITY, function(context) {
      const {
        element,
        properties
      } = context;

      const businessObject = getBusinessObject(element);

      // (1.1) Execute if...
      if (is(element, 'camunda:AsyncCapable') && // ...asyncCapable
          properties && // ...properties updated
          (properties['camunda:asyncBefore'] === false || // ...update async before or (1)
            properties['camunda:asyncAfter'] === false) && // ...update async after (2)
          !isExclusive(businessObject) // ...is currently not exclusive
      ) {

        // (1.2) ...but don't execute if...
        if ((isAsyncAfter(businessObject) && properties['camunda:asyncAfter'] !== false) || // ...asyncAfter will stay
            (isAsyncBefore(businessObject) && properties['camunda:asyncBefore'] !== false) || // ...asyncBefore will stay
            (properties['camunda:asyncBefore'] || properties['camunda:asyncAfter']) // one is set to true
        ) {
          return;
        }

        // (2) Update the context
        properties['camunda:exclusive'] = true;
      }
    }, true);
}


UpdateCamundaExclusiveBehavior.$inject = [
  'eventBus'
];

inherits(UpdateCamundaExclusiveBehavior, CommandInterceptor);


// helper //////////////////

/**
 * Returns true if the attribute 'camunda:asyncBefore' is set
 * to true.
 *
 * @param  {ModdleElement} bo
 *
 * @return {boolean} a boolean value
 */
function isAsyncBefore(bo) {
  return !!(bo.get('camunda:asyncBefore') || bo.get('camunda:async'));
}

/**
 * Returns true if the attribute 'camunda:asyncAfter' is set
 * to true.
 *
 * @param  {ModdleElement} bo
 *
 * @return {boolean} a boolean value
 */
function isAsyncAfter(bo) {
  return !!bo.get('camunda:asyncAfter');
}

/**
* Returns true if the attribute 'camunda:exclusive' is set
* to true.
*
* @param  {ModdleElement} bo
*
* @return {boolean} a boolean value
*/
function isExclusive(bo) {
  return !!bo.get('camunda:exclusive');
}
