import {
  act,
  waitFor
} from '@testing-library/preact';

import {
  query as domQuery,
  queryAll as domQueryAll
} from 'min-dom';

import {
  map
} from 'min-dash';

import {
  bootstrapModeler,
  inject,
  getBpmnJS
} from 'test/TestHelper';

import coreModule from 'bpmn-js/lib/core';
import contexPadModule from 'diagram-js/lib/features/context-pad';
import paletteModule from 'diagram-js/lib/features/palette';
import editorActionsModule from 'bpmn-js/lib/features/editor-actions';
import popupMenuModule from 'bpmn-js/lib/features/popup-menu';
import modelingModule from 'bpmn-js/lib/features/modeling';

import {
  CreateAppendAnythingModule as createAppendAnythingModule
} from 'bpmn-js-create-append-anything';

import camundaDetailsPopupMenuModule from 'lib/camunda-cloud/features/popup-menu';

import diagramXML from './CamundaDetailsPopupMenuProvider.bpmn';


describe('camunda-cloud/features/popup-menu - CamundaDetailsPopupMenuProvider', function() {

  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      coreModule,
      contexPadModule,
      paletteModule,
      editorActionsModule,
      popupMenuModule,
      modelingModule,
      createAppendAnythingModule,
      camundaDetailsPopupMenuModule
    ]
  }));


  it('should annotate create options', inject(function(canvas) {

    // given
    const rootElement = canvas.getRootElement();

    // when
    const {
      entries
    } = openPopup(rootElement, 'bpmn-create');

    // then
    expectAnnotated(entries, [
      'create-user-task',
      'create-message-end',
      'create-message-intermediate-throw',
      'create-send-task',
      'create-script-task',
      'create-service-task',
      'create-rule-task',
      'create-receive-task',
      'create-call-activity'
    ]);
  }));


  it('should annotate append options', inject(function(elementRegistry) {

    // given
    const task = elementRegistry.get('TASK');

    // when
    const {
      entries
    } = openPopup(task, 'bpmn-append');

    // then
    expectAnnotated(entries, [
      'append-user-task',
      'append-message-end',
      'append-message-intermediate-throw',
      'append-send-task',
      'append-script-task',
      'append-service-task',
      'append-rule-task',
      'append-receive-task',
      'append-call-activity'
    ]);

    expectAnnotation(entries, 'append-call-activity', 'child process');
    expectAnnotation(entries, 'append-rule-task', 'dmn decision');
  }));


  describe('should annotate replace options', function() {

    it('on task', inject(function(elementRegistry) {

      // given
      const task = elementRegistry.get('TASK');

      // when
      const {
        entries
      } = openPopup(task, 'bpmn-replace');

      // then
      expectAnnotated(entries, [
        'replace-with-user-task',
        'replace-with-service-task',
        'replace-with-script-task',
        'replace-with-send-task',
        'replace-with-rule-task',
        'replace-with-receive-task',
        'replace-with-call-activity'
      ]);

      expectAnnotation(entries, 'replace-with-user-task', 'form human');
    }));


    it('on start event', inject(function(elementRegistry) {

      // given
      const startEvent = elementRegistry.get('START_EVENT');

      // when
      const {
        entries
      } = openPopup(startEvent, 'bpmn-replace');

      // then
      expectAnnotated(entries, [
        'replace-with-message-intermediate-throw',
        'replace-with-message-end'
      ]);

      expectAnnotation(entries, 'replace-with-message-end', 'job worker');
    }));

  });


  it('should rank create-service-task higher than other job workers', inject(async function(canvas) {

    // given
    const rootElement = canvas.getRootElement();

    // when
    openPopup(rootElement, 'bpmn-create', { search: true });

    await triggerSearch('job');

    await expectEntries([
      'create-service-task',
      'create-send-task',
      'create-script-task',
      'create-message-end',
      'create-message-intermediate-throw'
    ]);

  }));

});


// helpers //////////////

function openPopup(element, providerId, options) {

  return getBpmnJS().invoke(function(popupMenu) {

    popupMenu.open(element, providerId, { x: 100, y: 100 }, options);

    return popupMenu._current;
  });
}

function getPopupContainer() {
  return getBpmnJS().invoke(function(popupMenu) {
    const current = popupMenu._current;

    expect(current, 'expect popupMenu to be open').to.exist;

    return current.container;
  });
}

function queryPopup(selector, q = domQuery) {
  var container = getPopupContainer();

  if (selector) {
    expect(container).to.exist;

    return q(selector, container);
  }

  return container;
}

function queryPopupAll(selector) {
  return queryPopup(selector, domQueryAll);
}

/**
 * @param {string} key
 *
 * @return {KeyboardEvent}
 */
function keyUp(key) {
  return new KeyboardEvent('keyup', { key, bubbles: true });
}

function triggerSearch(value) {

  return act(() => {
    var searchInput = queryPopup('.djs-popup-search input');

    expect(searchInput, 'search exists').to.exist;

    searchInput.value = value;
    searchInput.dispatchEvent(keyUp('ArrowRight'));
  });
}

/**
 * Return ids of currently open popup menu entries.
 *
 * @return {Promise<string[]>} entryIds
 */
function queryEntryIds() {
  return waitFor(() => {
    return queryPopupAll('.entry');
  }).then(entries => {
    return map(entries, e => e.dataset.id);
  });
}

/**
 * @param {string[]} expectedEntryIds
 */
async function expectEntries(expectedEntryIds) {

  const entryIds = await queryEntryIds();

  expect(entryIds, 'entry ids').to.eql(expectedEntryIds);
}

function expectAnnotated(entries, expectedAnnotatedIds) {
  for (const expectedId of expectedAnnotatedIds) {
    expect(entries[expectedId]?.search, `<${expectedId}> annotated with search`).to.exists;
  }
}

function expectAnnotation(entries, entryId, annotation) {
  expect(entries[entryId]?.search, `<${entryId}> to have annotation <${ annotation }>`).to.eql(annotation);
}