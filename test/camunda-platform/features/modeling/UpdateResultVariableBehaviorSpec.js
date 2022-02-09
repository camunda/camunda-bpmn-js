import {
  bootstrapCamundaPlatformModeler,
  getBpmnJS,
  inject
} from 'test/TestHelper';

import {
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';

import { BpmnPropertiesPanelModule } from 'bpmn-js-properties-panel';


import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import diagramXML from './camunda-result-variable-diagram.bpmn';


describe('camunda-platform/features/modeling - UpdateResultVariableBehavior', function() {

  const testModules = [
    camundaPlatformModelingModules,
    coreModule,
    modelingModule,
    BpmnPropertiesPanelModule
  ];

  const moddleExtensions = {
    camunda: camundaModdleExtensions
  };

  beforeEach(bootstrapCamundaPlatformModeler(diagramXML, {
    modules: testModules,
    moddleExtensions
  }));


  function updateProperties(element, properties) {
    getBpmnJS().invoke(function(modeling) {
      modeling.updateProperties(element, properties);
    });
  }

  function updateModdleProperties(element, properties) {
    getBpmnJS().invoke(function(modeling) {
      modeling.updateModdleProperties(element, getBusinessObject(element), properties);
    });
  }

  [
    [ 'element.updateProperties', updateProperties ],
    [ 'element.updateModdleProperties', updateModdleProperties ],
  ].forEach(([ command, fn ]) => {

    describe(command, function() {

      [
        [ 'empty string', '' ],
        [ 'undefined', undefined ]
      ].forEach(([ name, value ]) => {

        describe(`setting camunda:resultVariable to ${ name }`, function() {

          let element,
              businessObject;

          beforeEach(inject(function(elementRegistry) {

            // given
            element = elementRegistry.get('BusinessRuleTask_1');

            businessObject = getBusinessObject(element);

            // assume
            expect(businessObject.get('camunda:mapDecisionResult')).to.equal('collectEntries');

            // when
            fn(element, {
              'camunda:resultVariable': value
            });
          }));


          it('should execute', function() {

            // then
            // camunda:mapDecisionResult default value is resultList
            expect(businessObject.get('camunda:mapDecisionResult')).to.equal('resultList');
          });


          it('should undo', inject(function(commandStack) {

            // when
            commandStack.undo();

            // then
            expect(businessObject.get('camunda:mapDecisionResult')).to.equal('collectEntries');
          }));


          it('should undo/redo', inject(function(commandStack) {

            // when
            commandStack.undo();
            commandStack.redo();

            // then
            // camunda:mapDecisionResult default value is resultList
            expect(businessObject.get('camunda:mapDecisionResult')).to.equal('resultList');
          }));

        });

      });

    });

  });

});
