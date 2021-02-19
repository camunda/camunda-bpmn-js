
import {
  bootstrapModeler,
  inject,
  triggerValue
} from 'test/TestHelper';

import TestContainer from 'mocha-test-container-support';

import propertiesPanelModule from 'bpmn-js-properties-panel';

import {
  query as domQuery
} from 'min-dom';

import coreModule from 'bpmn-js/lib/core';

import selectionModule from 'diagram-js/lib/features/selection';

import modelingModule from 'bpmn-js/lib/features/modeling';

import propertiesProviderModule from 'lib/camunda-cloud/features/properties-provider';

import zeebeModdleExtensions from 'zeebe-bpmn-moddle/resources/zeebe';

import {
  getUserTaskForm,
  getFormDefinition
} from 'lib/camunda-cloud/helper/FormsHelper';

import diagramXML from './Forms.bpmn';


describe('camunda-cloud/features/properties-provider - forms definition properties', function() {

  const testModules = [
    coreModule, selectionModule, modelingModule,
    propertiesPanelModule,
    propertiesProviderModule
  ];

  const moddleExtensions = {
    zeebe: zeebeModdleExtensions
  };

  let container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });

  beforeEach(bootstrapModeler(diagramXML, {
    modules: testModules,
    moddleExtensions
  }));


  beforeEach(inject(function(commandStack, propertiesPanel) {

    const undoButton = document.createElement('button');
    undoButton.textContent = 'UNDO';

    undoButton.addEventListener('click', () => {
      commandStack.undo();
    });

    container.appendChild(undoButton);

    propertiesPanel.attachTo(container);
  }));

  describe('on UserTask', function() {

    describe('of form json', function() {

      describe('create', function() {

        let shape;

        beforeEach(inject(function(elementRegistry, selection) {

          // given
          shape = elementRegistry.get('UserTask_empty');
          selection.select(shape);

          // assume
          expect(getUserTaskForm(shape)).to.not.exist;
          expect(getFormDefinition(shape)).to.not.exist;

          const textBox = getJSONField(container, 'form-json');

          // when
          triggerValue(textBox, 'foo', 'change');
        }));

        it('should execute', function() {

          // then
          expect(getUserTaskForm(shape)).to.exist;
          expect(getFormDefinition(shape)).to.exist;

        });


        it('should undo', inject(function(commandStack) {

          // when
          commandStack.undo();

          // then
          expect(getUserTaskForm(shape)).to.not.exist;
          expect(getFormDefinition(shape)).to.not.exist;

        }));

        it('should redo', inject(function(commandStack) {

          // when
          commandStack.undo();
          commandStack.redo();

          // then
          expect(getUserTaskForm(shape)).to.exist;
          expect(getFormDefinition(shape)).to.exist;

        }));

      });


      describe('update', function() {

        let textBox, userTaskForm;

        beforeEach(inject(function(elementRegistry, selection) {

          // given
          const shape = elementRegistry.get('UserTask_1');
          selection.select(shape);

          userTaskForm = getUserTaskForm(shape);

          // assume
          expect(userTaskForm).to.exist;

          textBox = getJSONField(container, 'form-json');

          // when
          triggerValue(textBox, 'foo', 'change');

        }));

        describe('in the DOM', function() {

          it('should execute', function() {


            // then
            expect(textBox.value).to.equal('foo');
          });


          it('should undo', inject(function(commandStack) {

            // when
            commandStack.undo();

            // then
            expect(textBox.value).to.eql('{ components: [ { label: "field", key: "field" } ] }');
          }));


          it('should redo', inject(function(commandStack) {

            // when
            commandStack.undo();
            commandStack.redo();

            // then
            expect(textBox.value).to.equal('foo');
          }));


          describe('on the business object', function() {

            it('should execute', function() {

              // then

              expect(userTaskForm.body).to.equal('foo');
            });


            it('should undo', inject(function(commandStack) {

              // when
              commandStack.undo();

              // then
              expect(userTaskForm.body).to.eql('{ components: [ { label: "field", key: "field" } ] }');
            }));


            it('should redo', inject(function(commandStack) {

              // when
              commandStack.undo();
              commandStack.redo();

              // then
              expect(userTaskForm.body).to.equal('foo');
            }));

          });

        });

      });


      describe('delete (on no content)', function() {

        let shape, textBox;

        beforeEach(inject(function(elementRegistry, selection) {

          // given
          shape = elementRegistry.get('UserTask_1');
          selection.select(shape);

          const userTaskForm = getUserTaskForm(shape);

          // assume
          expect(userTaskForm).to.exist;

          textBox = getJSONField(container, 'form-json');

          // when
          triggerValue(textBox, '', 'change');

        }));

        describe('in the DOM', function() {

          it('should execute', function() {


            // then
            expect(textBox.value).to.equal('');
          });


          it('should undo', inject(function(commandStack) {

            // when
            commandStack.undo();

            // then
            expect(textBox.value).to.eql('{ components: [ { label: "field", key: "field" } ] }');
          }));


          it('should redo', inject(function(commandStack) {

            // when
            commandStack.undo();
            commandStack.redo();

            // then
            expect(textBox.value).to.equal('');
          }));


          describe('on the business object', function() {

            it('should execute', function() {

              // then

              expect(getUserTaskForm(shape)).to.not.exist;
              expect(getFormDefinition(shape)).to.not.exist;
            });


            it('should undo', inject(function(commandStack) {

              // when
              commandStack.undo();

              // then
              expect(getUserTaskForm(shape)).to.exist;
              expect(getFormDefinition(shape)).to.exist;
            }));


            it('should redo', inject(function(commandStack) {

              // when
              commandStack.undo();
              commandStack.redo();

              // then
              expect(getUserTaskForm(shape)).to.not.exist;
              expect(getFormDefinition(shape)).to.not.exist;
            }));

          });

        });

      });

    });

  });

});


// helper ///////////////////////

const getFormsTab = (container) => {
  return domQuery('div[data-tab="forms"]', container);
};

const getFormsGroup = (container) => {
  const tab = getFormsTab(container);
  return domQuery('div[data-group="forms-properties"]', tab);
};

const getEntry = (container, entryId) => {
  return domQuery('div[data-entry="' + entryId + '"]', getFormsGroup(container));
};

function getJSONField(container, selector) {
  const entry = getEntry(container, selector);

  return domQuery('input[name=formJSON]', entry);
}
