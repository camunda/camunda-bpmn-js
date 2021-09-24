import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isEventSubProcess
} from 'bpmn-js/lib/util/DiUtil';

import {
  isZeebeServiceTask
} from '../../../helper/ZeebeServiceTaskHelper.js';

import eventDefinitionHelper from 'bpmn-js-properties-panel/lib/helper/EventDefinitionHelper';

import message from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/implementation/MessageEventDefinition';

import referenceExtensionElementProperty from './implementation/ElementReferenceExtensionElementProperty';


export default function(group, element, bpmnFactory, translate) {

  const messageEventDefinition = eventDefinitionHelper.getMessageEventDefinition(element),
        parent = element.parent;

  if (is(element, 'bpmn:ReceiveTask')) {
    message(group, element, bpmnFactory, getBusinessObject(element), translate);
    group.entries = group.entries.concat(referenceExtensionElementProperty(element, getBusinessObject(element), bpmnFactory, translate, {
      id: 'message-element-subscription',
      label: translate('Subscription Correlation Key'),
      referenceProperty: 'messageRef',
      modelProperty: 'correlationKey',
      extensionElement: 'zeebe:Subscription',
      shouldValidate: true
    }));
  } else if (messageEventDefinition && !isZeebeServiceTask(element)) {
    message(group, element, bpmnFactory, messageEventDefinition, translate);
    if (!is(element, 'bpmn:StartEvent') || isEventSubProcess(parent)) {

      group.entries = group.entries.concat(referenceExtensionElementProperty(element, messageEventDefinition, bpmnFactory, translate, {
        id: 'message-element-subscription',
        label: translate('Subscription Correlation Key'),
        referenceProperty: 'messageRef',
        modelProperty: 'correlationKey',
        extensionElement: 'zeebe:Subscription',
        shouldValidate: true
      }));
    }
  }

}
