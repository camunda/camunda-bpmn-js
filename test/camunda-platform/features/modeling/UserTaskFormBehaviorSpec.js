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
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import propertiesPanelCommandHandler from 'bpmn-js-properties-panel/lib/cmd';

import diagramXML from './camunda-user-task-forms-diagram.bpmn';


describe('camunda-platform/features/modeling - UserTaskFormsBehavior', function() {

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

  function updateBusinessObject(element, properties) {
    getBpmnJS().invoke(function(commandStack) {
      commandStack.execute('properties-panel.update-businessobject', {
        element,
        businessObject: getBusinessObject(element),
        properties
      });
    });
  }

  [
    [ 'element.updateProperties', updateProperties ],
    [ 'element.updateModdleProperties', updateModdleProperties ],
    [ 'properties-panel.update-businessobject', updateBusinessObject ],
  ].forEach(([ command, fn ]) => {

    describe(command, function() {

      [
        [ 'start event', 'StartEvent' ],
        [ 'user task', 'UserTask' ]
      ].forEach(([ type, prefix ]) => {

        describe('setting camunda:formKey', function() {

          describe(type, function() {

            let businessObject;

            beforeEach(inject(function(elementRegistry) {

              // given
              const element = elementRegistry.get(`${ prefix }_FormRef`);

              businessObject = getBusinessObject(element);

              // when
              fn(element, { 'camunda:formKey': 'embedded:deployment:FORM_NAME.html' });

              // assume
              expect(businessObject.get('camunda:formKey')).to.equal('embedded:deployment:FORM_NAME.html');
            }));


            it('should execute', inject(function() {

              // then
              expect(businessObject.get('camunda:formRef')).to.not.exist;
              expect(businessObject.get('camunda:formRefBinding')).not.to.exist;
              expect(businessObject.get('camunda:formRefVersion')).not.to.exist;
            }));


            it('should undo', inject(function(commandStack) {

              // when
              commandStack.undo();

              // then
              expect(businessObject.get('camunda:formRef')).to.eql('invoice.form');
              expect(businessObject.get('camunda:formRefBinding')).to.eql('version');
              expect(businessObject.get('camunda:formRefVersion')).to.eql('1');
            }));


            it('should undo/redo', inject(function(commandStack) {

              // when
              commandStack.undo();
              commandStack.redo();

              // then
              expect(businessObject.get('camunda:formRef')).to.not.exist;
              expect(businessObject.get('camunda:formRefBinding')).not.to.exist;
              expect(businessObject.get('camunda:formRefVersion')).not.to.exist;
            }));

          });

        });


        describe('setting camunda:formRef', function() {

          describe(type, function() {

            let businessObject;

            beforeEach(inject(function(elementRegistry) {

              // given
              const element = elementRegistry.get(`${ prefix }_FormKey`);

              businessObject = getBusinessObject(element);

              // when
              fn(element, {
                'camunda:formRef': 'invoice.form',
                'camunda:formRefBinding': 'version',
                'camunda:formRefVersion': '1'
              });

              // assume
              expect(businessObject.get('camunda:formRef')).to.equal('invoice.form');
              expect(businessObject.get('camunda:formRefBinding')).to.equal('version');
              expect(businessObject.get('camunda:formRefVersion')).to.equal('1');
            }));


            it('should execute', inject(function() {

              // then
              expect(businessObject.get('camunda:formKey')).to.not.exist;
            }));


            it('should undo', inject(function(commandStack) {

              // when
              commandStack.undo();

              // then
              expect(businessObject.get('camunda:formKey')).to.eql('embedded:deployment:FORM_NAME.html');
            }));


            it('should undo/redo', inject(function(commandStack) {

              // when
              commandStack.undo();
              commandStack.redo();

              // then
              expect(businessObject.get('camunda:formKey')).to.not.exist;
            }));

          });

        });


        describe('setting camunda:formRefBinding', function() {

          describe(type, function() {

            it('should default to <latest>', inject(function(elementRegistry) {

              // when
              const element = elementRegistry.get(`${ prefix }_FormKey`);

              const businessObject = getBusinessObject(element);

              // when
              fn(element, { 'camunda:formRef': 'foo' });

              // then
              expect(businessObject.get('camunda:formRef')).to.equal('foo');
              expect(businessObject.get('camunda:formRefBinding')).to.equal('latest');
              expect(businessObject.get('camunda:formRefVersion')).not.to.exist;
            }));


            it('should delete camunda:formRefVersion', inject(function(elementRegistry) {

              // when
              const element = elementRegistry.get(`${ prefix }_FormRef`);

              const businessObject = getBusinessObject(element);

              // when
              fn(element, { 'camunda:formRefBinding': 'deployment' });

              // then
              expect(businessObject.get('camunda:formRef')).to.equal('invoice.form');
              expect(businessObject.get('camunda:formRefBinding')).to.equal('deployment');
              expect(businessObject.get('camunda:formRefVersion')).not.to.exist;
            }));


            it('should not delete camunda:formRefVersion', inject(function(elementRegistry) {

              // when
              const element = elementRegistry.get(`${ prefix }_FormRef`);

              const businessObject = getBusinessObject(element);

              // when
              fn(element, { 'camunda:formRefBinding': 'version' });

              // then
              expect(businessObject.get('camunda:formRef')).to.equal('invoice.form');
              expect(businessObject.get('camunda:formRefBinding')).to.equal('version');
              expect(businessObject.get('camunda:formRefVersion')).to.equal('1');
            }));

          });

        });


        describe('deleting camunda:formRef', function() {

          describe(type, function() {

            it('should delete camunda:formRefBinding and camunda:formRefVersion', inject(function(elementRegistry) {

              // when
              const element = elementRegistry.get(`${ prefix }_FormRef`);

              const businessObject = getBusinessObject(element);

              // when
              fn(element, { 'camunda:formRef': undefined });

              // then
              expect(businessObject.get('camunda:formRef')).not.to.exist;
              expect(businessObject.get('camunda:formRefBinding')).not.to.exist;
              expect(businessObject.get('camunda:formRefVersion')).not.to.exist;
            }));

          });

        });

      });

    });

  });

});
