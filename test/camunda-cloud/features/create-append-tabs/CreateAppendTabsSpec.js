/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { expect } from 'chai';

import {
  act,
  waitFor
} from '@testing-library/preact';

import {
  query as domQuery,
  queryAll as domQueryAll
} from 'min-dom';

import {
  find,
  map
} from 'min-dash';

import {
  bootstrapModeler,
  getBpmnJS,
  inject
} from 'test/TestHelper';

import coreModule from 'bpmn-js/lib/core';
import contextPadModule from 'diagram-js/lib/features/context-pad';
import paletteModule from 'diagram-js/lib/features/palette';
import editorActionsModule from 'bpmn-js/lib/features/editor-actions';
import modelingModule from 'bpmn-js/lib/features/modeling';
import popupMenuModule from 'bpmn-js/lib/features/popup-menu';

import {
  CreateAppendAnythingModule as createAppendAnythingModule
} from 'bpmn-js-create-append-anything';

import createAppendGroupsModule from 'lib/base/features/create-append-groups';

import createAppendTabsModule from 'lib/base/features/create-append-tabs';

import {
  BPMN_TAB,
  REUSABLE_ASSETS_TAB
} from 'lib/base/features/create-append-tabs/tabs';

import diagramXML from '../element-descriptions/ElementDescriptions.bpmn';


const modules = [
  coreModule,
  contextPadModule,
  paletteModule,
  editorActionsModule,
  modelingModule,
  popupMenuModule,
  createAppendAnythingModule,
  createAppendGroupsModule,
  createAppendTabsModule
];


describe('camunda-cloud/features/create-append-tabs', function() {

  beforeEach(bootstrapModeler(diagramXML, {
    modules,
    popupMenu: {
      defaultTab: BPMN_TAB
    }
  }));


  describe('create', function() {

    it('should render a BPMN and a Reusable Assets tab', inject(function(canvas) {

      // given
      contribute('bpmn-create', { 'create.template-foo': template() });

      // when
      openMenu(canvas.getRootElement(), 'bpmn-create');

      // then
      expect(tabLabels()).to.eql([ BPMN_TAB.label, REUSABLE_ASSETS_TAB.label ]);
    }));


    it('should keep reusable assets out of the BPMN tab', inject(function(canvas) {

      // given
      contribute('bpmn-create', { 'create.template-foo': template() });

      // when
      openMenu(canvas.getRootElement(), 'bpmn-create');

      // then
      expect(entryIds()).not.to.include('create.template-foo');
    }));


    it('should move reusable assets into the Reusable Assets tab', inject(async function(canvas) {

      // given
      contribute('bpmn-create', {
        'create.template-foo': template(),
        'resources-create-rpa-0': resource()
      });

      openMenu(canvas.getRootElement(), 'bpmn-create');

      // when
      await selectTab(REUSABLE_ASSETS_TAB.label);

      // then
      await waitFor(function() {
        expect(entryIds()).to.include.members([ 'create.template-foo', 'resources-create-rpa-0' ]);
      });
    }));


    it('should order groups as resources, categories, templates, connectors', inject(async function(canvas) {

      // given
      contribute('bpmn-create', {
        'create.template-connector': template({ id: 'connectors', name: 'Connectors' }),
        'create.template-plain': template({ id: 'templates', name: 'Templates' }),
        'create.template-catalog': template({ id: 'catalog', name: 'Catalog' }),
        'resources-create-rpa-0': resource()
      });

      openMenu(canvas.getRootElement(), 'bpmn-create');

      // when
      await selectTab(REUSABLE_ASSETS_TAB.label);

      // then
      await waitFor(function() {
        expect(groupIds()).to.eql([ 'rpa', 'catalog', 'templates', 'connectors' ]);
      });
    }));


    it('should not render tabs without reusable assets', inject(function(canvas) {

      // when
      openMenu(canvas.getRootElement(), 'bpmn-create');

      // then
      expect(tabLabels()).to.be.empty;
    }));


    it('should find a reusable asset by its template id', inject(async function(canvas) {

      // given
      contribute('bpmn-create', { 'create.template-xyzzy': template() });

      openMenu(canvas.getRootElement(), 'bpmn-create');

      // when
      await triggerSearch('xyzzy');

      // then
      await waitFor(function() {
        expect(entryIds()).to.include('create.template-xyzzy');
      });
    }));

  });


  describe('replace', function() {

    it('should move reusable assets into the Reusable Assets tab', inject(async function(elementRegistry) {

      // given
      contribute('bpmn-replace', { 'replace.template-foo': template() });

      openMenu(elementRegistry.get('Task_1'), 'bpmn-replace');

      // when
      await selectTab(REUSABLE_ASSETS_TAB.label);

      // then
      await waitFor(function() {
        expect(entryIds()).to.include('replace.template-foo');
      });
    }));

  });

});


// helpers /////////////

function template(group) {
  return {
    label: 'Template',
    action() {},
    ...(group && { group })
  };
}

function resource() {
  return {
    label: 'Resource',
    action() {},
    group: { id: 'rpa', name: 'RPA' }
  };
}

function contribute(menuId, entries) {
  getBpmnJS().invoke(function(popupMenu) {
    popupMenu.registerProvider(menuId, 950, {
      getPopupMenuEntries: () => (current) => ({ ...current, ...entries })
    });
  });
}

function openMenu(element, menuId) {
  getBpmnJS().invoke(function(popupMenu) {
    popupMenu.open(element, menuId, { x: 100, y: 100 }, { search: true });
  });
}

function container() {
  return getBpmnJS().invoke(function(popupMenu) {
    return popupMenu._current.container;
  });
}

function tabLabels() {
  return map(domQueryAll('.djs-popup-tab', container()), (tab) => tab.textContent.trim());
}

function groupIds() {
  return map(domQueryAll('.djs-popup-group', container()), (group) => group.getAttribute('data-group'));
}

function entryIds() {
  return map(domQueryAll('.entry', container()), (entry) => entry.getAttribute('data-id'));
}

async function selectTab(label) {
  await act(async () => {});

  const tab = find(domQueryAll('.djs-popup-tab', container()), (tab) => tab.textContent.trim() === label);

  await act(() => tab.click());
}

function triggerSearch(term) {
  const input = domQuery('.djs-popup-search input', container());

  return act(() => {
    input.value = term;
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', bubbles: true }));
  });
}
