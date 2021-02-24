import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';

import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';

import {
  createFormDefinition,
  createFormId,
  createFormKey,
  createUserTaskForm,
  getFormDefinition,
  getUserTaskForm
} from '../../../../helper/FormsHelper';


export default function(element, bpmnFactory, translate) {
  let entries = [];

  function cleanupUserTaskForm(element) {

    const businessObject = getBusinessObject(element),
          rootElement = getRootElement(element),
          extensionElements = businessObject.get('extensionElements'),
          rootExtensionElements = rootElement.get('extensionElements');

    let commands = [];

    // (1) remove form definition
    const formDefinition = getFormDefinition(element);

    if (!formDefinition) {
      return commands;
    }

    commands.push(cmdHelper.removeElementsFromList(
      element,
      extensionElements,
      'values',
      'extensionElements',
      [ formDefinition ]
    ));

    // (2) remove referenced user task form
    const userTaskForm = getUserTaskForm(element);

    if (!userTaskForm) {
      return commands;
    }

    commands.push(cmdHelper.removeElementsFromList(
      element,
      rootExtensionElements,
      'values',
      'extensionElements',
      [ userTaskForm ]
    ));

    return commands;
  }

  entries.push(entryFactory.textField(translate, {
    id: 'form-json',
    label: translate('Form JSON Configuration'),
    modelProperty: 'formJSON',
    get: function(element) {
      const userTaskForm = getUserTaskForm(element);

      return {
        formJSON: userTaskForm ? userTaskForm.get('body') : ''
      };
    },
    set: function(element, values) {

      const businessObject = getBusinessObject(element),
            rootElement = getRootElement(element),
            body = values.formJSON;

      let commands = [],
          userTaskForm,
          formId;

      // (0) cleanup user task form + form definition on empty body
      if (!body || body === '') {
        return cleanupUserTaskForm(element);
      }

      // (1) ensure extension elements
      let extensionElements = businessObject.get('extensionElements');

      if (!extensionElements) {
        extensionElements = elementHelper.createElement(
          'bpmn:ExtensionElements',
          { values: [] },
          businessObject,
          bpmnFactory
        );

        commands.push(
          cmdHelper.updateBusinessObject(element, businessObject, {
            extensionElements: extensionElements,
          })
        );
      }

      // (2) ensure root element extension elements
      let rootExtensionElements = rootElement.get('extensionElements');

      if (!rootExtensionElements) {
        rootExtensionElements = elementHelper.createElement(
          'bpmn:ExtensionElements',
          { values: [] },
          rootElement,
          bpmnFactory
        );

        commands.push(
          cmdHelper.updateBusinessObject(element, rootElement, {
            extensionElements: rootExtensionElements,
          })
        );
      }

      // (3) ensure form definition
      let formDefinition = getFormDefinition(element);

      if (!formDefinition) {
        formId = createFormId();

        formDefinition = createFormDefinition(
          {
            formKey: createFormKey(formId)
          },
          extensionElements,
          bpmnFactory
        );

        commands.push(cmdHelper.addAndRemoveElementsFromList(
          element,
          extensionElements,
          'values',
          'extensionElements',
          [ formDefinition ],
          []
        ));
      }

      formId = resolveFormId(formDefinition.get('formKey'));

      // (4) ensure user task form
      userTaskForm = getUserTaskForm(element);

      if (!userTaskForm) {
        userTaskForm = createUserTaskForm(
          {
            id: formId,
            body: body
          },
          rootExtensionElements,
          bpmnFactory
        );

        commands.push(cmdHelper.addAndRemoveElementsFromList(
          element,
          rootExtensionElements,
          'values',
          'extensionElements',
          [ userTaskForm ],
          []
        ));
      }

      // (5) update user task form
      commands.push(cmdHelper.updateBusinessObject(element, userTaskForm, {
        body: values.formJSON
      }));

      return commands;

    }
  }));

  return entries;
}


// helpers //////////////////////

function getRootElement(element) {
  var businessObject = getBusinessObject(element),
      parent = businessObject;

  while (parent.$parent && !is(parent, 'bpmn:Process')) {
    parent = parent.$parent;
  }

  return parent;
}

function resolveFormId(formKey) {
  return formKey.split(':')[2];
}