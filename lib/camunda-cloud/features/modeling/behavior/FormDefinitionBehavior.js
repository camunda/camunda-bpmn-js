
import inherits from 'inherits';

import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  remove as collectionRemove,
  add as collectionAdd
} from 'diagram-js/lib/util/Collections';

import {
  createFormDefinition,
  createFormId,
  createFormKey,
  createUserTaskForm,
  getFormDefinition,
  getUserTaskForm
} from '../../../helper/FormsHelper';


/**
 * Zeebe specific form definition behavior.
 */
export default function FormDefinitionBehavior(
    eventBus, bpmnFactory) {

  CommandInterceptor.call(this, eventBus);

  /**
   * ensures a zeebe:userTaskForm is cleaned up when user task got removed
   */
  this.executed('shape.delete', function(context) {
    const {
      shape,
      oldParent
    } = context;

    const rootElement = getRootElement(oldParent);

    const userTaskForm = getUserTaskForm(shape, rootElement);

    const rootExtensionElements = rootElement.get('extensionElements');

    if (!is(shape, 'bpmn:UserTask') || !userTaskForm) {
      return;
    }

    collectionRemove(rootExtensionElements.get('values'), userTaskForm);

    context.removedUserTaskForm = userTaskForm;
  }, true);

  this.revert('shape.delete', function(context) {
    const {
      removedUserTaskForm,
      oldParent
    } = context;

    const rootElement = getRootElement(oldParent);

    const rootExtensionElements = rootElement.get('extensionElements');

    if (!removedUserTaskForm) {
      return;
    }

    collectionAdd(rootExtensionElements.get('values'), removedUserTaskForm);
  }, true);


  /**
   * create fresh new copied form definition + user task form
   */
  this.executed('shape.create', function(context) {
    const {
      shape,
    } = context;

    const oldFormDefinition = getFormDefinition(shape);

    if (!is(shape, 'bpmn:UserTask') || !oldFormDefinition) {
      return;
    }

    const oldUserTaskForm = getUserTaskForm(shape);

    const rootElement = getRootElement(shape);

    const businessObject = getBusinessObject(shape);

    const extensionElements = businessObject.get('extensionElements');

    let rootExtensionElements = rootElement.get('extensionElements');

    // (1) ensure extension elements in root
    if (!rootExtensionElements) {

      rootExtensionElements = elementHelper.createElement(
        'bpmn:ExtensionElements',
        { values: [] },
        rootElement,
        bpmnFactory
      );

      rootElement.set('extensionElements', rootExtensionElements);
    }

    // (2) remove existing form definition
    context.oldFormDefinition = oldFormDefinition;

    collectionRemove(extensionElements.get('values'), oldFormDefinition);

    const formId = createFormId();

    // (3) create new form definition
    const formDefinition = createFormDefinition(
      {
        formKey: createFormKey(formId)
      },
      extensionElements,
      bpmnFactory
    );

    collectionAdd(extensionElements.get('values'), formDefinition);

    // (4) create new user task form
    const userTaskForm = createUserTaskForm(
      {
        id: formId,
        body: oldUserTaskForm ? oldUserTaskForm.get('body') : ''
      },
      rootExtensionElements,
      bpmnFactory
    );

    collectionAdd(rootExtensionElements.get('values'), userTaskForm);
  }, true);

  this.revert('shape.create', function(context) {
    const {
      shape,
      oldFormDefinition
    } = context;

    const businessObject = getBusinessObject(shape);

    const extensionElements = businessObject.get('extensionElements');

    const formDefinition = getFormDefinition(shape);

    const userTaskForm = getUserTaskForm(shape);

    const rootElement = getRootElement(shape);

    const rootExtensionElements = rootElement.get('extensionElements');

    if (!is(shape, 'bpmn:UserTask') || !userTaskForm) {
      return;
    }

    // we need to cover the old form definition to make <redo> possible
    collectionRemove(extensionElements.get('values'), formDefinition);
    collectionAdd(extensionElements.get('values'), oldFormDefinition);

    collectionRemove(rootExtensionElements.get('values'), userTaskForm);
  }, true);

}

FormDefinitionBehavior.$inject = [
  'eventBus',
  'bpmnFactory'
];

inherits(FormDefinitionBehavior, CommandInterceptor);


// helpers //////////////

function getRootElement(element) {
  var businessObject = getBusinessObject(element),
      parent = businessObject;

  while (parent.$parent && !is(parent, 'bpmn:Process')) {
    parent = parent.$parent;
  }

  return parent;
}