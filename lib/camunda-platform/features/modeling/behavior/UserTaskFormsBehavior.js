import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import {
  has,
  isUndefined
} from 'min-dash';


/**
 * Camunda BPMN specific user task forms behavior.
 */
export default class UserTaskFormsBehavior extends CommandInterceptor {
  constructor(eventBus) {
    super(eventBus);

    /**
     * Ensure that only one of the following options is configured:
     *
     * 1. embedded, external or Camunda forms using camunda:formKey
     * 2. Camunda forms using camunda:formRef
     */
    this.preExecute([
      'element.updateProperties',
      'element.updateModdleProperties'
    ], function(context) {
      const {
        element,
        moddleElement,
        properties
      } = context;

      const businessObject = moddleElement || getBusinessObject(element);

      if (has(properties, 'camunda:formKey')) {
        Object.assign(properties, {
          'camunda:formRef': undefined,
          'camunda:formRefBinding': undefined,
          'camunda:formRefVersion': undefined
        });
      } else if (has(properties, 'camunda:formRef')) {
        Object.assign(properties, {
          'camunda:formKey': undefined
        });

        if (isUndefined(properties[ 'camunda:formRef' ])) {
          Object.assign(properties, {
            'camunda:formRefBinding': undefined,
            'camunda:formRefVersion': undefined
          });
        }

        if (!has(properties, 'camunda:formRefBinding') && isUndefined(businessObject.get('camunda:formRefBinding'))) {
          Object.assign(properties, {
            'camunda:formRefBinding': 'latest'
          });
        }
      }

      if (has(properties, 'camunda:formRefBinding') && properties[ 'camunda:formRefBinding' ] !== 'version') {
        Object.assign(properties, {
          'camunda:formRefVersion': undefined
        });
      }
    }, true);

  }
}

UserTaskFormsBehavior.$inject = [ 'eventBus' ];