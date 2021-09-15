import {
  bootstrapCamundaPlatformModeler,
  inject
} from 'test/TestHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import propertiesPanelCommandHandler from 'bpmn-js-properties-panel/lib/cmd';

import diagramXML from './camunda-input-output-diagram.bpmn';


describe('camunda-platform/features/modeling - UpdateInputOutputBehavior', function() {

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

  describe('element.updateProperties', function() {

    it('should NOT execute if there are still parameters',
      inject(function(elementRegistry, modeling) {

        // given
        const shape = elementRegistry.get('ServiceTask_3');
        const businessObject = getBusinessObject(shape);
        const extensionElements = businessObject.get('extensionElements');

        const inputOutput = getInputOutput(businessObject);

        // assume
        expect(inputOutput).to.exist;

        inputOutput.set('inputParameters', []);
        extensionElements.set('values', [ inputOutput ]);

        // when
        modeling.updateProperties(shape, {
          extensionElements
        });

        // then
        expect(getInputOutput(businessObject)).to.exist;
      })
    );


    it('should keep other extension elements',
      inject(function(elementRegistry, modeling) {

        // given
        const shape = elementRegistry.get('ServiceTask_4');
        const businessObject = getBusinessObject(shape);
        const extensionElements = businessObject.get('extensionElements');

        const inputOutput = getInputOutput(businessObject);
        const properties = getProperties(businessObject);

        // assume
        expect(getExtensionElementsList(businessObject)).to.have.length(2);

        inputOutput.set('inputParameters', []);
        extensionElements.set('values', [ inputOutput, properties ]);

        // when
        modeling.updateProperties(shape, {
          extensionElements
        });

        // then
        expect(getExtensionElementsList(businessObject)).to.have.length(1);
      })
    );


    describe('delete last input parameter', function() {

      let businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        const shape = elementRegistry.get('ServiceTask_1');
        businessObject = getBusinessObject(shape);
        const extensionElements = businessObject.get('extensionElements');

        const inputOutput = getInputOutput(businessObject);

        // assume
        expect(inputOutput).to.exist;

        inputOutput.set('inputParameters', []);
        extensionElements.set('values', [ inputOutput ]);

        // when
        modeling.updateProperties(shape, {
          extensionElements
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getInputOutput(businessObject)).to.exist;
      }));


      it('should redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));

    });


    describe('delete last output parameter', function() {

      let businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        const shape = elementRegistry.get('ServiceTask_2');
        businessObject = getBusinessObject(shape);
        const extensionElements = businessObject.get('extensionElements');

        const inputOutput = getInputOutput(businessObject);

        // assume
        expect(inputOutput).to.exist;

        inputOutput.set('outputParameters', []);
        extensionElements.set('values', [ inputOutput ]);

        // when
        modeling.updateProperties(shape, {
          extensionElements
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getInputOutput(businessObject)).to.exist;
      }));


      it('should redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));

    });

  });


  describe('element.updateModdleProperties', function() {

    it('should NOT execute if there are still parameters',
      inject(function(elementRegistry, modeling) {

        // given
        const shape = elementRegistry.get('ServiceTask_3');
        const businessObject = getBusinessObject(shape);

        const inputOutput = getInputOutput(businessObject);

        // assume
        expect(inputOutput).to.exist;

        // when
        modeling.updateModdleProperties(shape, inputOutput, {
          inputParameters: []
        });

        // then
        expect(getInputOutput(businessObject)).to.exist;
      })
    );


    it('should keep other extension elements',
      inject(function(elementRegistry, modeling) {

        // given
        const shape = elementRegistry.get('ServiceTask_4');
        const businessObject = getBusinessObject(shape);

        const inputOutput = getInputOutput(businessObject);

        // assume
        expect(getExtensionElementsList(businessObject)).to.have.length(2);

        // when
        modeling.updateModdleProperties(shape, inputOutput, {
          inputParameters: []
        });

        // then
        expect(getExtensionElementsList(businessObject)).to.have.length(1);
      })
    );


    describe('delete last input parameter', function() {

      let businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        const shape = elementRegistry.get('ServiceTask_1');
        businessObject = getBusinessObject(shape);

        const inputOutput = getInputOutput(businessObject);

        // assume
        expect(inputOutput).to.exist;

        // when
        modeling.updateModdleProperties(shape, inputOutput, {
          inputParameters: []
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getInputOutput(businessObject)).to.exist;
      }));


      it('should redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));

    });


    describe('delete last output parameter', function() {

      let businessObject;

      beforeEach(inject(function(elementRegistry, modeling) {

        // given
        const shape = elementRegistry.get('ServiceTask_2');
        businessObject = getBusinessObject(shape);

        const inputOutput = getInputOutput(businessObject);

        // assume
        expect(inputOutput).to.exist;

        // when
        modeling.updateModdleProperties(shape, inputOutput, {
          outputParameters: []
        });
      }));


      it('should execute', inject(function() {

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getInputOutput(businessObject)).to.exist;
      }));


      it('should redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));

    });

  });



  describe('properties-panel.update-businessobject-list', function() {

    it('should NOT execute if there are still parameters',
      inject(function(elementRegistry, commandStack) {

        // given
        const shape = elementRegistry.get('ServiceTask_3');
        const businessObject = getBusinessObject(shape);

        const inputOutput = getInputOutput(businessObject);
        const inputParameters = getInputParameters(inputOutput);

        const context = {
          element: shape,
          currentObject: inputOutput,
          propertyName: 'inputParameters',
          objectsToRemove: inputParameters
        };

        // assume
        expect(inputOutput).to.exist;

        // when
        commandStack.execute('properties-panel.update-businessobject-list', context);

        // then
        expect(getInputOutput(businessObject)).to.exist;
      })
    );


    it('should keep other extension elements',
      inject(function(elementRegistry, commandStack) {

        // given
        const shape = elementRegistry.get('ServiceTask_4');
        const businessObject = getBusinessObject(shape);

        const inputOutput = getInputOutput(businessObject);
        const inputParameters = getInputParameters(inputOutput);

        const context = {
          element: shape,
          currentObject: inputOutput,
          propertyName: 'inputParameters',
          objectsToRemove: inputParameters
        };

        // assume
        expect(getExtensionElementsList(businessObject)).to.have.length(2);

        // when
        commandStack.execute('properties-panel.update-businessobject-list', context);

        // then
        expect(getExtensionElementsList(businessObject)).to.have.length(1);
      })
    );


    describe('delete last input parameter', function() {

      let businessObject;

      beforeEach(inject(function(elementRegistry, commandStack) {

        // given
        const shape = elementRegistry.get('ServiceTask_1');

        businessObject = getBusinessObject(shape);

        const inputOutput = getInputOutput(businessObject);
        const inputParameters = getInputParameters(inputOutput);

        const context = {
          element: shape,
          currentObject: inputOutput,
          propertyName: 'inputParameters',
          objectsToRemove: inputParameters
        };

        // assume
        expect(inputOutput).to.exist;

        // when
        commandStack.execute('properties-panel.update-businessobject-list', context);
      }));


      it('should execute', inject(function() {

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getInputOutput(businessObject)).to.exist;
      }));


      it('should redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));

    });


    describe('delete last output parameter', function() {

      let businessObject;

      beforeEach(inject(function(elementRegistry, commandStack) {

        // given
        const shape = elementRegistry.get('ServiceTask_2');

        businessObject = getBusinessObject(shape);

        const inputOutput = getInputOutput(businessObject);
        const outputParameters = getOutputParameters(inputOutput);

        const context = {
          element: shape,
          currentObject: inputOutput,
          propertyName: 'outputParameters',
          objectsToRemove: outputParameters
        };

        // assume
        expect(inputOutput).to.exist;

        // when
        commandStack.execute('properties-panel.update-businessobject-list', context);
      }));


      it('should execute', inject(function() {

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));


      it('should undo', inject(function(commandStack) {

        // when
        commandStack.undo();

        // then
        expect(getInputOutput(businessObject)).to.exist;
      }));


      it('should redo', inject(function(commandStack) {

        // when
        commandStack.undo();
        commandStack.redo();

        // then
        expect(getInputOutput(businessObject)).to.not.exist;
      }));

    });

  });

});


// helper //////////////////

function getOutputParameters(inputOutput) {
  return inputOutput.get('outputParameters');
}

function getInputParameters(inputOutput) {
  return inputOutput.get('inputParameters');
}

function getInputOutput(businessObject) {
  return (getExtensionElementsList(businessObject, 'camunda:InputOutput') || [])[0];
}

function getProperties(businessObject) {
  return (getExtensionElementsList(businessObject, 'camunda:Properties') || [])[0];
}

function getExtensionElementsList(businessObject, type = undefined) {
  const elements = ((businessObject.get('extensionElements') &&
                  businessObject.get('extensionElements').get('values')) || []);

  return (elements.length && type) ?
    elements.filter((value) => is(value, type)) :
    elements;
}