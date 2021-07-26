import {
  bootstrapCamundaPlatformModeler,
  inject
} from 'test/TestHelper';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import propertiesPanelCommandHandler from 'bpmn-js-properties-panel/lib/cmd';

import diagramXML from './camunda-result-variable-diagram.bpmn';


describe('camunda-platform/features/modeling - UpdateResultVariableBehavior', function() {

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

    describe('resultVariable to empty', function() {

      let shape, context, businessObject;

      beforeEach(inject(function(elementRegistry, commandStack) {

        // given
        shape = elementRegistry.get('BusinessRuleTask_1');
        businessObject = getBusinessObject(shape);

        context = {
          element: shape,
          businessObject: businessObject,
          properties: {
            'camunda:resultVariable': ''
          }
        };

        // assume
        expect(businessObject.get('camunda:mapDecisionResult')).to.eql('collectEntries');

        // when
        commandStack.execute('properties-panel.update-businessobject', context);
      }));


      it('should execute', inject(function() {

        // then
        expect(businessObject.get('camunda:mapDecisionResult')).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(businessObject.get('camunda:mapDecisionResult')).to.eql('collectEntries');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(businessObject.get('camunda:mapDecisionResult')).to.not.exist;
      }));

    });

  });


  describe('element.updateProperties', function() {

    describe('resultVariable to empty', function() {

      let shape, businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        shape = elementRegistry.get('BusinessRuleTask_1');
        businessObject = getBusinessObject(shape);

        // assume
        expect(businessObject.get('camunda:mapDecisionResult')).to.eql('collectEntries');

        // when
        modeling.updateProperties(shape, {
          'camunda:resultVariable': ''
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(businessObject.get('camunda:mapDecisionResult')).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(businessObject.get('camunda:mapDecisionResult')).to.eql('collectEntries');
      }));


      it('should undo/redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(businessObject.get('camunda:mapDecisionResult')).to.not.exist;
      }));

    });

  });

});
