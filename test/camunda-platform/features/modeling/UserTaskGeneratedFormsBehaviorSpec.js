import {
  bootstrapCamundaPlatformModeler,
  inject
} from 'test/TestHelper';

import {
  getBpmnJS
} from 'bpmn-js/test/helper';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import propertiesPanelCommandHandler from 'bpmn-js-properties-panel/lib/cmd';

import diagramXML from './camunda-user-task-generated-forms-diagram.bpmn';


describe('camunda-platform/features/modeling - UserTaskGeneratedFormsBehavior', function() {

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

  function updateModdleProperties(element, moddleElement, properties) {
    getBpmnJS().invoke(function(modeling) {
      modeling.updateModdleProperties(element, moddleElement, properties);
    });
  }

  function updateBusinessObject(element, businessObject, properties) {
    getBpmnJS().invoke(function(commandStack) {
      commandStack.execute('properties-panel.update-businessobject', {
        element,
        businessObject,
        properties
      });
    });
  }

  [
    [ 'element.updateModdleProperties', updateModdleProperties ],
    [ 'properties-panel.update-businessobject', updateBusinessObject ]
  ].forEach(([ command, fn ]) => {

    describe(command, function() {

      [
        [ 'start event', 'StartEvent' ],
        [ 'user task', 'UserTask' ]
      ].forEach(([ type, prefix ]) => {

        describe('setting camunda:FormField#type to boolean', function() {

          describe(type, function() {

            it('should delete camunda:FormField#values', inject(function(elementRegistry) {

              // when
              const element = elementRegistry.get(`${ prefix }_1`);

              const businessObject = getFormField(element);

              // when
              fn(element, businessObject, { 'camunda:type': 'boolean' });

              // then
              expect(businessObject.get('camunda:values')).to.be.empty;
            }));


            it('should not delete camunda:FormField#values', inject(function(elementRegistry) {

              // when
              const element = elementRegistry.get(`${ prefix }_1`);

              const businessObject = getFormField(element);

              // when
              fn(element, businessObject, { 'camunda:type': 'enum' });

              // then
              expect(businessObject.get('camunda:values')).not.to.be.empty;
            }));

          });

        });

      });

    });

  });

});

// helpers //////////

function getFormField(element, index = 0) {
  const businessObject = getBusinessObject(element);

  const extensionElements = businessObject.get('extensionElements'),
        values = extensionElements.get('values');

  const formData = values.find((value) => {
    return is(value, 'camunda:FormData');
  });

  return formData.get('camunda:fields')[ index ];
}
