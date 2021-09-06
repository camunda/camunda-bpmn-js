import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import { isUndefined } from 'min-dash';


/**
 * Camunda BPMN specific user task forms behavior ensuring that only one of the following options is configured:
 *
 * 1. embedded, external or Camunda forms using camunda:formKey
 * 2. Camunda forms using camunda:formRef
 */
export default class UserTaskFormsBehavior extends CommandInterceptor {
  constructor(eventBus) {
    super(eventBus);

    this.preExecute([
      'element.updateProperties',
      'element.updateModdleProperties',
      'properties-panel.update-businessobject'
    ], function(context) {
      const { properties } = context;

      if ('camunda:formKey' in properties) {
        Object.assign(properties, {
          'camunda:formRef': undefined,
          'camunda:formRefBinding': undefined,
          'camunda:formRefVersion': undefined
        });
      } else if ('camunda:formRef' in properties) {
        Object.assign(properties, {
          'camunda:formKey': undefined
        });

        if (isUndefined(properties[ 'camunda:formRef' ])) {
          Object.assign(properties, {
            'camunda:formRefBinding': undefined,
            'camunda:formRefVersion': undefined
          });
        }
      }

      if ('camunda:formRefBinding' in properties && properties[ 'camunda:formRefBinding' ] !== 'version') {
        Object.assign(properties, {
          'camunda:formRefVersion': undefined
        });
      }
    }, true);
  }
}


UserTaskFormsBehavior.$inject = [ 'eventBus' ];