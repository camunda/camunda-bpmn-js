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

import { BpmnPropertiesPanelModule } from 'bpmn-js-properties-panel';


import camundaModdleExtensions from 'camunda-bpmn-moddle/resources/camunda';

import camundaPlatformModelingModules from 'lib/camunda-platform/features/modeling';

import diagramXML from './camunda-input-output-diagram.bpmn';


describe('camunda-platform/features/modeling - UpdateInputOutputBehavior', function() {

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
        expect(getExtensionElements(businessObject)).to.have.length(2);

        inputOutput.set('inputParameters', []);
        extensionElements.set('values', [ inputOutput, properties ]);

        // when
        modeling.updateProperties(shape, {
          extensionElements
        });

        // then
        expect(getExtensionElements(businessObject)).to.have.length(1);
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getExtensionElements(businessObject)).to.have.length(2);

        // when
        modeling.updateModdleProperties(shape, inputOutput, {
          inputParameters: []
        });

        // then
        expect(getExtensionElements(businessObject)).to.have.length(1);
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getInputOutput(businessObject)).not.to.exist;
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


    it('should NOT remove newly added camunda:InputOutput',
      inject(function(elementRegistry, commandStack, bpmnFactory) {

        // given
        const shape = elementRegistry.get('ServiceTask_empty');
        const businessObject = getBusinessObject(shape);
        const extensionElements = businessObject.get('extensionElements');

        // assume
        expect(getInputOutput(businessObject)).to.not.exist;

        const inputOutput = bpmnFactory.create('camunda:InputOutput');

        const context = {
          element: shape,
          currentObject: extensionElements,
          propertyName: 'values',
          objectsToAdd: [ inputOutput ]
        };

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
        expect(getExtensionElements(businessObject)).to.have.length(2);

        // when
        commandStack.execute('properties-panel.update-businessobject-list', context);

        // then
        expect(getExtensionElements(businessObject)).to.have.length(1);
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getInputOutput(businessObject)).not.to.exist;
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
        expect(getInputOutput(businessObject)).not.to.exist;
      }));

    });

  });

});


// helpers //////////

function getOutputParameters(inputOutput) {
  return inputOutput.get('outputParameters');
}

function getInputParameters(inputOutput) {
  return inputOutput.get('inputParameters');
}

function getInputOutput(businessObject) {
  return getExtensionElements(businessObject, 'camunda:InputOutput')[ 0 ];
}

function getProperties(businessObject) {
  return getExtensionElements(businessObject, 'camunda:Properties')[ 0 ];
}

function getExtensionElements(businessObject, type) {
  const extensionElements = businessObject.get('extensionElements');

  if (!extensionElements) {
    return;
  }

  if (!type) {
    return extensionElements.get('values');
  }

  return extensionElements.get('values').filter((element) => {
    return is(element, type);
  });
}