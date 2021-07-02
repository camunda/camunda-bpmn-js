import {
  bootstrapCamundaCloudModeler,
  inject
} from 'test/TestHelper';

import { getExtensionElements } from 'lib/camunda-cloud/helper/ExtensionElementsHelper';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';

import zeebeModelingModule from 'lib/camunda-cloud/features/modeling';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';

import {
  getFormDefinition,
  getUserTaskForm
} from 'lib/camunda-cloud/helper/FormsHelper';

import diagramXML from './process-user-tasks.bpmn';


describe('camunda-cloud/features/modeling - FormDefinitionBehavior', function() {

  const moddleExtensions = {
    zeebe: zeebeModdleExtensions
  };

  const testModules = [
    coreModule,
    modelingModule,
    zeebeModelingModule
  ];

  beforeEach(bootstrapCamundaCloudModeler(diagramXML, {
    modules: testModules,
    moddleExtensions
  }));


  describe('cleanup user task forms', function() {

    describe('on remove user task', function() {

      it('should execute', inject(function(canvas, elementRegistry, modeling) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        // when
        modeling.removeElements([ element ]);

        // then
        const userTaskForms = getUserTaskForms(rootElement);

        expect(userTaskFormExists('UserTaskForm_1', userTaskForms)).to.be.false;
      }));


      it('should undo', inject(function(canvas, commandStack, elementRegistry, modeling) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        // when
        modeling.removeElements([ element ]);

        commandStack.undo();

        // then
        const userTaskForms = getUserTaskForms(rootElement);

        expect(userTaskFormExists('UserTaskForm_1', userTaskForms)).to.be.true;
      }));


      it('should redo', inject(function(canvas, commandStack, elementRegistry, modeling) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        // when
        modeling.removeElements([ element ]);

        commandStack.undo();
        commandStack.redo();

        // then
        const userTaskForms = getUserTaskForms(rootElement);

        expect(userTaskFormExists('UserTaskForm_1', userTaskForms)).to.be.false;
      }));

    });


    describe('on replace user task', function() {

      it('should execute', inject(function(bpmnReplace, canvas, elementRegistry) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        // when
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:ServiceTask'
        });

        // then
        const userTaskForms = getUserTaskForms(rootElement);

        expect(userTaskFormExists('UserTaskForm_1', userTaskForms)).to.be.false;
      }));


      it('should undo', inject(function(bpmnReplace, canvas, commandStack, elementRegistry) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        // when
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:ServiceTask'
        });

        commandStack.undo();

        // then
        const userTaskForms = getUserTaskForms(rootElement);

        expect(userTaskFormExists('UserTaskForm_1', userTaskForms)).to.be.true;
      }));


      it('should redo', inject(function(bpmnReplace, canvas, commandStack, elementRegistry) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        // when
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:ServiceTask'
        });

        commandStack.undo();
        commandStack.redo();

        // then
        const userTaskForms = getUserTaskForms(rootElement);

        expect(userTaskFormExists('UserTaskForm_1', userTaskForms)).to.be.false;
      }));

    });

  });


  describe('create new user task form', function() {

    describe('on copy user task', function() {

      it('should execute', inject(function(canvas, copyPaste, elementRegistry) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        const oldUserTaskForm = getUserTaskForm(element);

        const oldFormDefinition = getFormDefinition(element);

        // when
        copyPaste.copy([ element ]);

        const newElements = copyPaste.paste({
          element: rootElement,
          point: {
            x: 1000,
            y: 1000
          }
        });

        const newElement = newElements[0];

        const formDefinition = getFormDefinition(newElement);

        const userTaskForm = getUserTaskForm(newElement);

        // then
        expect(formDefinition).not.to.eql(oldFormDefinition);

        expect(userTaskForm).not.to.eql(oldUserTaskForm);
      }));


      it('should undo', inject(function(canvas, commandStack, copyPaste, elementRegistry) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        copyPaste.copy([ element ]);

        copyPaste.paste({
          element: rootElement,
          point: {
            x: 1000,
            y: 1000
          }
        });

        // when
        commandStack.undo();

        const userTaskForms = getUserTaskForms(rootElement);

        // then
        expect(userTaskForms).to.have.length(2);
      }));


      it('should redo', inject(function(canvas, commandStack, copyPaste, elementRegistry) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        copyPaste.copy([ element ]);

        copyPaste.paste({
          element: rootElement,
          point: {
            x: 1000,
            y: 1000
          }
        });

        // when
        commandStack.undo();
        commandStack.redo();

        const userTaskForms = getUserTaskForms(rootElement);

        // then
        expect(userTaskForms).to.have.length(3);
      }));

    });

  });

});


// helpers ///////////////////

function getUserTaskForms(rootElement) {
  const businessObject = getBusinessObject(rootElement);

  return getExtensionElements(businessObject, 'zeebe:UserTaskForm');
}

function userTaskFormExists(id, userTaskForms) {
  return !!userTaskForms.find((userTaskForm) => {
    return userTaskForm.get('zeebe:id') === id;
  });
}
