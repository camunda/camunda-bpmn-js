import {
  bootstrapCamundaCloudModeler,
  inject
} from 'test/TestHelper';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import diagramXML from './process-user-tasks.bpmn';


describe('camunda-cloud/features/modeling - CleanUpAssignmentDefinitionBehavior', function() {

  beforeEach(bootstrapCamundaCloudModeler(diagramXML));


  describe('triggered via propertiesPanel', function() {

    describe('removing zeebe:AssignmentDefinition when assignee is set to undefined', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry) {

        // given
        element = elementRegistry.get('UserTask_3');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        commandStack.execute('properties-panel.update-businessobject', {
          element: element,
          businessObject: assignmentDefinition,
          properties: { assignee: undefined }
        });
      }));


      it('should execute', inject(function() {

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).to.exist;
        expect(assignmentDefintion.assignee).to.equal('myAssignee');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));

    });


    describe('removing zeebe:AssignmentDefinition when candidateGroups is set to undefined', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry) {

        // given
        element = elementRegistry.get('UserTask_4');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        commandStack.execute('properties-panel.update-businessobject', {
          element: element,
          businessObject: assignmentDefinition,
          properties: { candidateGroups: undefined }
        });
      }));


      it('should execute', inject(function() {

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).to.exist;
        expect(assignmentDefintion.candidateGroups).to.equal('myCandidateGroups');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));

    });


    describe('NOT removing zeebe:AssignmentDefinition', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry) {

        // given
        element = elementRegistry.get('UserTask_5');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        commandStack.execute('properties-panel.update-businessobject', {
          element: element,
          businessObject: assignmentDefinition,
          properties: { candidateGroups: undefined }
        });
      }));


      it('should NOT execute when other property is set', inject(function() {

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).to.exist;
      }));

    });


    describe('removing empty extensionElements when assignmentDefintion was removed', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry) {

        // given
        element = elementRegistry.get('UserTask_6');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        commandStack.execute('properties-panel.update-businessobject', {
          element: element,
          businessObject: assignmentDefinition,
          properties: { assignee: undefined }
        });
      }));


      it('should execute', inject(function() {

        // then
        const extensionElements = getBusinessObject(element).extensionElements;

        expect(extensionElements).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        const extensionElements = getBusinessObject(element).extensionElements;

        expect(extensionElements).to.exist;
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        const extensionElements = getBusinessObject(element).extensionElements;

        expect(extensionElements).to.not.exist;
      }));

    });


    describe('NOT removing empty extensionElements when assignmentDefintion was removed', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry) {

        // given
        element = elementRegistry.get('UserTask_3');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        commandStack.execute('properties-panel.update-businessobject', {
          element: element,
          businessObject: assignmentDefinition,
          properties: { assignee: undefined }
        });
      }));


      it('should NOT execute', inject(function() {

        // then
        const extensionElements = getBusinessObject(element).extensionElements;

        expect(extensionElements).to.exist;
      }));

    });

  });


  describe('triggered via modelingAPI', function() {

    describe('removing zeebe:AssignmentDefinition when assignee is set to undefined', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry, modeling) {

        // given
        element = elementRegistry.get('UserTask_3');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        modeling.updateModdleProperties(element, assignmentDefinition, {
          assignee: undefined
        });
      }));


      it('should execute', inject(function() {

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).to.exist;
        expect(assignmentDefintion.assignee).to.equal('myAssignee');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));

    });


    describe('removing zeebe:AssignmentDefinition when candidateGroups is set to undefined', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry, modeling) {

        // given
        element = elementRegistry.get('UserTask_4');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        modeling.updateModdleProperties(element, assignmentDefinition, {
          candidateGroups: undefined
        });
      }));


      it('should execute', inject(function() {

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).to.exist;
        expect(assignmentDefintion.candidateGroups).to.equal('myCandidateGroups');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));

    });


    describe('removing zeebe:AssignmentDefinition when candidateGroups and assignee is set to undefined', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry, modeling) {

        // given
        element = elementRegistry.get('UserTask_5');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        modeling.updateModdleProperties(element, assignmentDefinition, {
          candidateGroups: undefined,
          assignee: undefined
        });
      }));


      it('should execute', inject(function() {

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).to.exist;
        expect(assignmentDefintion.assignee).to.equal('a');
        expect(assignmentDefintion.candidateGroups).to.equal('b');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).not.to.exist;
      }));

    });


    describe('NOT removing zeebe:AssignmentDefinition', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry, modeling) {

        // given
        element = elementRegistry.get('UserTask_5');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        modeling.updateModdleProperties(element, assignmentDefinition, {
          candidateGroups: undefined
        });
      }));


      it('should NOT execute when other property is set', inject(function() {

        // then
        const assignmentDefintion = getAssignmentDefinition(element);

        expect(assignmentDefintion).to.exist;
      }));

    });


    describe('removing empty extensionElements when assignmentDefintion was removed', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry, modeling) {

        // given
        element = elementRegistry.get('UserTask_6');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        modeling.updateModdleProperties(element, assignmentDefinition, {
          assignee: undefined
        });
      }));


      it('should execute', inject(function() {

        // then
        const extensionElements = getBusinessObject(element).extensionElements;

        expect(extensionElements).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        const extensionElements = getBusinessObject(element).extensionElements;

        expect(extensionElements).to.exist;
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        const extensionElements = getBusinessObject(element).extensionElements;

        expect(extensionElements).to.not.exist;
      }));

    });


    describe('NOT removing empty extensionElements when assignmentDefintion was removed', function() {

      let element;

      beforeEach(inject(function(commandStack, elementRegistry, modeling) {

        // given
        element = elementRegistry.get('UserTask_3');

        const assignmentDefinition = getAssignmentDefinition(element);

        // when
        modeling.updateModdleProperties(element, assignmentDefinition, {
          assignee: undefined
        });
      }));


      it('should NOT execute', inject(function() {

        // then
        const extensionElements = getBusinessObject(element).extensionElements;

        expect(extensionElements).to.exist;
      }));

    });

  });

});

// helper ///////////////////////

function getExtensionElementsList(businessObject, type = undefined) {
  const elements = ((businessObject.get('extensionElements') &&
                  businessObject.get('extensionElements').get('values')) || []);

  return (elements.length && type) ?
    elements.filter((value) => is(value, type)) :
    elements;
}

function getAssignmentDefinition(element) {
  const businessObject = getBusinessObject(element);

  return getExtensionElementsList(businessObject, 'zeebe:AssignmentDefinition')[0];
}
