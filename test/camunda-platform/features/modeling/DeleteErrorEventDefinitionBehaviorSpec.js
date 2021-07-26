import {
  bootstrapCamundaPlatformModeler,
  inject
} from 'test/TestHelper';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import propertiesPanelCommandHandler from 'bpmn-js-properties-panel/lib/cmd';

import diagramXML from './camunda-error-event-definition-diagram.bpmn';


describe('camunda-platform/features/modeling - DeleteErrorEventDefinitionBehavior', function() {

  const testModules = [
    camundaPlatformModelingModules,
    coreModule,
    modelingModule,
    propertiesPanelCommandHandler
  ];

  const moddleExtensions = {
    camunda: camundaModdleExtensions
  };

  beforeEach(bootstrapCamundaPlatformModeler(diagramXML, {
    modules: testModules,
    moddleExtensions
  }));

  describe('properties-panel.update-businessobject', function() {

    describe('camunda:type to non-external', function() {

      let shape, context, businessObject;

      beforeEach(inject(function(elementRegistry, commandStack) {

        // given
        shape = elementRegistry.get('ServiceTask_1');
        businessObject = getBusinessObject(shape);

        context = {
          element: shape,
          businessObject: businessObject,
          properties: {
            'camunda:type': 'foo'
          }
        };

        // assume
        expect(getErrorEventDefinitions(businessObject)).to.have.length(3);

        // when
        commandStack.execute('properties-panel.update-businessobject', context);
      }));


      it('should execute', inject(function() {

        // then
        expect(getErrorEventDefinitions(businessObject)).to.be.empty;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getErrorEventDefinitions(businessObject)).to.have.length(3);
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getErrorEventDefinitions(businessObject)).to.be.empty;
      }));

    });

  });


  describe('element.updateProperties', function() {

    describe('camunda:type to non-external', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        shape = elementRegistry.get('ServiceTask_1');
        businessObject = getBusinessObject(shape);

        // assume
        expect(getErrorEventDefinitions(businessObject)).to.have.length(3);

        // when
        modeling.updateProperties(shape, {
          'camunda:type': 'foo'
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(getErrorEventDefinitions(businessObject)).to.be.empty;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getErrorEventDefinitions(businessObject)).to.have.length(3);
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getErrorEventDefinitions(businessObject)).to.be.empty;
      }));

    });

  });

});


// helper ///////////

function getErrorEventDefinitions(businessObject) {
  return getExtensionElementsList(businessObject, 'camunda:ErrorEventDefinition');
}

function getExtensionElementsList(businessObject, type = undefined) {
  const elements = ((businessObject.get('extensionElements') &&
                  businessObject.get('extensionElements').get('values')) || []);

  return (elements.length && type) ?
    elements.filter((value) => is(value, type)) :
    elements;
}
