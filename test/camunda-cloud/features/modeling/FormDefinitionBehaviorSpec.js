import {
  bootstrapCamundaCloudModeler,
  inject
} from 'test/TestHelper';

import {
  find
} from 'min-dash';

import {
  getExtensionElements
} from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper';

import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import modelingModule from 'bpmn-js/lib/features/modeling';
import coreModule from 'bpmn-js/lib/core';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';

import zeebeModelingModule from 'lib/camunda-cloud/features/modeling';

import {
  getFormDefinition,
  getUserTaskForm
} from 'lib/camunda-cloud/helper/FormsHelper';

import diagramXML from './process-user-tasks.bpmn';


describe('camunda-cloud/features/modeling - form definition behavior', function() {

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

        expect(userTaskFormExists('userTaskForm_1', userTaskForms)).to.be.false;
      }));


      it('should undo', inject(function(canvas, elementRegistry, modeling, commandStack) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        // when
        modeling.removeElements([ element ]);

        commandStack.undo();

        // then
        const userTaskForms = getUserTaskForms(rootElement);

        expect(userTaskFormExists('userTaskForm_1', userTaskForms)).to.be.true;
      }));


      it('should redo', inject(function(canvas, elementRegistry, modeling, commandStack) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        // when
        modeling.removeElements([ element ]);

        commandStack.undo();
        commandStack.redo();

        // then
        const userTaskForms = getUserTaskForms(rootElement);

        expect(userTaskFormExists('userTaskForm_1', userTaskForms)).to.be.false;
      }));

    });


    describe('on replace user task', function() {

      it('should execute', inject(function(canvas, elementRegistry, bpmnReplace) {

        // given
        const rootElement = canvas.getRootElement();

        const element = elementRegistry.get('UserTask_1');

        // when
        bpmnReplace.replaceElement(element, {
          type: 'bpmn:ServiceTask'
        });

        // then
        const userTaskForms = getUserTaskForms(rootElement);

        expect(userTaskFormExists('userTaskForm_1', userTaskForms)).to.be.false;
      }));


      it('should undo', inject(function(canvas, elementRegistry, bpmnReplace, commandStack) {

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

        expect(userTaskFormExists('userTaskForm_1', userTaskForms)).to.be.true;
      }));


      it('should redo', inject(function(canvas, elementRegistry, bpmnReplace, commandStack) {

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

        expect(userTaskFormExists('userTaskForm_1', userTaskForms)).to.be.false;
      }));

    });

  });


  describe('create new user task form', function() {

    describe('on copy user task', function() {

      it('should execute', inject(function(canvas, elementRegistry, copyPaste) {

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
        expect(formDefinition).to.not.eql(oldFormDefinition);

        expect(userTaskForm).to.not.eql(oldUserTaskForm);
      }));


      it('should undo', inject(function(canvas, elementRegistry, copyPaste, commandStack) {

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


      it('should redo', inject(function(canvas, elementRegistry, copyPaste, commandStack) {

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
  return !!find(userTaskForms, function(form) {
    return form.get('id') === id;
  });
}
