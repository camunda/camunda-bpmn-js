import { has } from 'min-dash';

import { createElement } from '../../../helper/ElementHelper';

import { getCalledElement } from '../../../helper/CalledElementHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 5000;


/**
 * Zeebe BPMN specific behavior for creating call activities.
 */
export default class CreateZeebeCallActivityBehavior extends CommandInterceptor {
  constructor(bpmnFactory, eventBus, modeling) {
    super(eventBus);

    /**
     * Add zeebe:CalledElement extension element with zeebe:propagateAllChildVariables attribute = false
     * when creating bpmn:CallActivity.
     */
    this.postExecuted('shape.create', HIGH_PRIORITY, function(context) {
      const { shape } = context;

      if (!is(shape, 'bpmn:CallActivity')) {
        return;
      }

      const businessObject = getBusinessObject(shape);

      let calledElement = getCalledElement(businessObject);

      if (!calledElement) {
        calledElement = bpmnFactory.create('zeebe:CalledElement', {
          propagateAllChildVariables: false
        });

        let extensionElements = businessObject.get('extensionElements');

        if (!extensionElements) {
          extensionElements = createElement('bpmn:ExtensionElements', { values: [] }, businessObject, bpmnFactory);

          modeling.updateProperties(shape, { extensionElements });
        }

        modeling.updateModdleProperties(shape, extensionElements, {
          values: [
            ...(extensionElements.values || []),
            calledElement
          ]
        });
      } else if (!has(calledElement, 'propagateAllChildVariables')) {

        // set zeebe:propagateAllChildVariables to false if zeebe:CalledElement exists
        modeling.updateModdleProperties(shape, calledElement, {
          propagateAllChildVariables: false
        });
      }
    }, true);

  }
}

CreateZeebeCallActivityBehavior.$inject = [
  'bpmnFactory',
  'eventBus',
  'modeling'
];