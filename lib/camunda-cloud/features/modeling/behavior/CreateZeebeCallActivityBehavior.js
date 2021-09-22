import inherits from 'inherits';

import {
  has
} from 'min-dash';

import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';

import {
  getCalledElement
} from '../../../helper/CalledElementHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

const HIGH_PRIORITY = 15000;

/**
 * BPMN specific create zeebe call activity behavior
 */
export default function CreateZeebeCallActivityBehavior(bpmnFactory, eventBus, modeling) {

  CommandInterceptor.call(this, eventBus);

  /**
   * add a zeebe:calledElement extensionElement with
   * propagateAllChildVariables attribute = false when creating
   * a bpmn:callActivity
   */
  this.postExecuted('shape.create', HIGH_PRIORITY, function(context) {
    const {
      shape
    } = context;

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
        extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, businessObject, bpmnFactory);

        modeling.updateProperties(shape, { extensionElements });
      }

      modeling.updateModdleProperties(shape, extensionElements, {
        values: [
          ...(extensionElements.values || []),
          calledElement
        ]
      });
    } else if (!has(calledElement, 'propagateAllChildVariables')) {

      // handle existing bpmn:CallActivity
      modeling.updateModdleProperties(shape, calledElement, {
        propagateAllChildVariables: false
      });
    }
  }, true);

}


CreateZeebeCallActivityBehavior.$inject = [
  'bpmnFactory',
  'eventBus',
  'modeling'
];

inherits(CreateZeebeCallActivityBehavior, CommandInterceptor);
