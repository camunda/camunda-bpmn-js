
import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';

import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  createFormDefinition,
  createFormId,
  createFormKey,
  createUserTaskForm,
  getFormDefinition,
  getUserTaskForm
} from '../../../helper/FormsHelper';


/**
 * Zeebe BPMN specific form definition behavior.
 */
export default class FormDefinitionBehavior extends CommandInterceptor {
  constructor(bpmnFactory, eventBus, modeling) {
    super(eventBus);

    /**
     * Remove zeebe:UserTaskForm on user task removed.
     */
    this.postExecute('shape.delete', function(context) {
      const {
        oldParent,
        shape
      } = context;

      const rootElement = getRootElement(oldParent);

      const userTaskForm = getUserTaskForm(shape, rootElement);

      if (!is(shape, 'bpmn:UserTask') || !userTaskForm) {
        return;
      }

      const rootExtensionElements = rootElement.get('extensionElements');

      const values = rootExtensionElements.get('values').filter((element) => {
        return element !== userTaskForm;
      });

      modeling.updateModdleProperties(shape, rootExtensionElements, { values });
    }, true);


    /**
     * Create new zeebe:FormDefinition and zeebe:UserTaskForm on user task created.
     */
    this.postExecute('shape.create', function(context) {
      const { shape } = context;

      const oldFormDefinition = getFormDefinition(shape);

      if (!is(shape, 'bpmn:UserTask') || !oldFormDefinition) {
        return;
      }

      const oldUserTaskForm = getUserTaskForm(shape);

      const rootElement = getRootElement(shape);

      const businessObject = getBusinessObject(shape);

      const extensionElements = businessObject.get('extensionElements');

      let rootExtensionElements = rootElement.get('extensionElements');

      // (1) ensure extension elements exists
      if (!rootExtensionElements) {
        rootExtensionElements = elementHelper.createElement('bpmn:ExtensionElements', { values: [] }, rootElement, bpmnFactory);

        modeling.updateModdleProperties(shape, rootElement, { extensionElements: rootExtensionElements });
      }

      // (2) remove existing form definition
      let values = extensionElements.get('values').filter((element) => {
        return element !== oldFormDefinition;
      });

      // (3) create new form definition
      const formId = createFormId();

      const newFormDefinition = createFormDefinition({ formKey: createFormKey(formId) }, extensionElements, bpmnFactory);

      values = [
        ...values,
        newFormDefinition
      ];

      modeling.updateModdleProperties(shape, extensionElements, {
        values
      });

      // (4) create new user task form
      const userTaskForm = createUserTaskForm({
        id: formId,
        body: oldUserTaskForm ? oldUserTaskForm.get('body') : ''
      }, rootExtensionElements, bpmnFactory);

      modeling.updateModdleProperties(shape, rootExtensionElements, {
        values: [
          ...(rootExtensionElements.get('values') || []),
          userTaskForm
        ]
      });
    }, true);

  }
}

FormDefinitionBehavior.$inject = [
  'bpmnFactory',
  'eventBus',
  'modeling'
];


// helpers //////////////

function getRootElement(element) {
  var businessObject = getBusinessObject(element),
      parent = businessObject;

  while (parent.$parent && !is(parent, 'bpmn:Process')) {
    parent = parent.$parent;
  }

  return parent;
}