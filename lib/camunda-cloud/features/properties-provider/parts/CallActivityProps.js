import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';

import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';

import { isIdValid } from 'bpmn-js-properties-panel/lib/Utils';

import { getCalledElement } from '../../../helper/CalledElementHelper';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

export default function(group, element, bpmnFactory, translate) {

  if (!is(element, 'bpmn:CallActivity')) {
    return;
  }

  function getProperty(element, propertyName) {
    const businessObject = getBusinessObject(element),
          calledElement = getCalledElement(businessObject);

    return calledElement ? calledElement.get(propertyName) : '';
  }

  function setProperties(element, values) {

    const businessObject = getBusinessObject(element),
          commands = [];

    // ensure extensionElements
    let extensionElements = businessObject.get('extensionElements');
    if (!extensionElements) {
      extensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, businessObject, bpmnFactory);
      commands.push(cmdHelper.updateBusinessObject(element, businessObject, { extensionElements: extensionElements }));
    }

    // ensure zeebe:calledElement
    let calledElement = getCalledElement(businessObject);
    if (!calledElement) {
      calledElement = elementHelper.createElement('zeebe:CalledElement', { }, extensionElements, bpmnFactory);
      commands.push(cmdHelper.addAndRemoveElementsFromList(
        element,
        extensionElements,
        'values',
        'extensionElements',
        [ calledElement ],
        []
      ));
    }

    // update properties
    commands.push(cmdHelper.updateBusinessObject(element, calledElement, values));
    return commands;
  }

  // properties /////////////////////////////////////////////////////////////////

  group.entries.push(entryFactory.validationAwareTextField(translate, {
    id: 'process-id',
    label: translate('Process Id'),
    modelProperty: 'processId',

    getProperty: function(element) {
      return getProperty(element, 'processId');
    },

    setProperty: function(element, values) {
      return setProperties(element, {
        processId: values.processId || undefined
      });
    },
    validate: function(element, values) {
      var idValue = values.processId;
      var bo = getBusinessObject(element);

      // pass on expression statements
      if (/^=/.test(idValue || '')) {
        return {};
      }

      var idError = isIdValid(bo, idValue, translate);

      return idError ? { processId: idError } : {};
    }
  }));
}
