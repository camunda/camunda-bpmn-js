import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { is } from 'bpmn-js/lib/util/ModelUtil';


/**
 * Camunda BPMN specific user task generated forms behavior removing camunda:FormField#values if camunda:FormField#type
 * is changed to something other than enum.
 */
export default class UserTaskFormsBehavior extends CommandInterceptor {
  constructor(eventBus) {
    super(eventBus);

    this.preExecute([
      'element.updateModdleProperties',
      'properties-panel.update-businessobject'
    ], function(context) {
      let {
        businessObject,
        moddleElement,
        properties
      } = context;

      businessObject = businessObject || moddleElement;

      if (is(businessObject, 'camunda:FormField')
        && 'camunda:type' in properties
        && properties[ 'camunda:type' ] !== 'enum') {
        properties[ 'camunda:values' ] = undefined;
      }
    }, true);
  }
}


UserTaskFormsBehavior.$inject = [ 'eventBus' ];