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

import { GROUP_DESCRIPTIONS } from 'lib/base/features/create-append-groups/options';

import { findPopupEntry as findEntry } from 'lib/util/PopupMenuEntriesUtil';

import diagramXML from '../element-descriptions/ElementDescriptions.bpmn';


describe('camunda-cloud/features/create-append-groups', function() {

  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      coreModule,
      contextPadModule,
      paletteModule,
      editorActionsModule,
      modelingModule,
      popupMenuModule,
      createAppendAnythingModule,
      createAppendGroupsModule
    ]
  }));


  describe('create', function() {

    it('should organize entries into categories', inject(function(canvas) {

      // when
      const entries = openMenu(canvas.getRootElement(), 'bpmn-create');

      // then
      expect(Object.keys(entries)).to.include.members([
        'create-tasks',
        'create-gateways',
        'create-subprocesses',
        'create-events',
        'create-data',
        'create-participants'
      ]);
    }));


    it('should split Events into typed sub-categories', inject(function(canvas) {

      // when
      const entries = openMenu(canvas.getRootElement(), 'bpmn-create');

      // then
      expect(Object.keys(entries[ 'create-events' ].entries)).to.eql([
        'create-start-events',
        'create-intermediate-catch-events',
        'create-intermediate-throw-events',
        'create-boundary-events',
        'create-end-events'
      ]);
    }));


    it('should nest an option under its category, reusing the action', inject(function(canvas) {

      // when
      const entries = openMenu(canvas.getRootElement(), 'bpmn-create');

      // then
      const entry = findEntry(entries, 'create-user-task');

      expect(entry).to.exist;
      expect(entry.action).to.exist;
    }));


    it('should describe a category', inject(function(canvas) {

      // when
      const entries = openMenu(canvas.getRootElement(), 'bpmn-create');

      // then
      expect(findEntry(entries, 'create-tasks').description).to.eql(GROUP_DESCRIPTIONS['tasks']);
    }));


    it('should keep entries the static tree does not cover', inject(function(canvas, popupMenu) {

      // given another provider contributes a non-taxonomy, non-template entry
      // (e.g. an external resource) after the flat menu, before grouping
      popupMenu.registerProvider('bpmn-create', 950, {
        getPopupMenuEntries: () => (entries) => ({
          ...entries,
          'resources-create-rpa-0': { label: 'My RPA', action() {} }
        })
      });

      // when
      const entries = openMenu(canvas.getRootElement(), 'bpmn-create');

      // then it survives grouping at the top level
      expect(entries[ 'resources-create-rpa-0' ]).to.exist;
    }));


    it('should group element templates into a Templates category', inject(function(canvas, popupMenu) {

      // given a provider contributes flat element-template entries
      popupMenu.registerProvider('bpmn-create', 950, {
        getPopupMenuEntries: () => (entries) => ({
          ...entries,
          'create.template-foo': { label: 'Foo template', action() {} }
        })
      });

      // when
      const entries = openMenu(canvas.getRootElement(), 'bpmn-create');

      // then they are collected under the Templates category
      const templates = entries[ 'create-templates' ];

      expect(templates, 'Templates category').to.exist;
      expect(templates.entries[ 'create.template-foo' ]).to.exist;
    }));

  });


  describe('append', function() {

    it('should organize entries into categories', inject(function(elementRegistry) {

      // given
      const startEvent = elementRegistry.get('StartEvent_1');

      // when
      const entries = openMenu(startEvent, 'bpmn-append');

      // then
      expect(Object.keys(entries)).to.include.members([
        'append-tasks',
        'append-gateways'
      ]);
    }));


    it('should drop categories that are not appendable', inject(function(elementRegistry) {

      // given
      const startEvent = elementRegistry.get('StartEvent_1');

      // when
      const entries = openMenu(startEvent, 'bpmn-append');

      // then participants cannot be appended
      expect(entries).not.to.have.property('append-participants');
    }));

  });

});


// helpers /////////////

function openMenu(element, providerId) {
  return getBpmnJS().invoke(function(popupMenu) {
    popupMenu.open(element, providerId, { x: 100, y: 100 });

    return popupMenu._current.entries;
  });
}
