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
import elementDescriptionsModule from 'lib/base/features/element-descriptions';

import { findPopupEntry as findEntry } from 'lib/util/PopupMenuEntriesUtil';

import diagramXML from 'test/fixtures/simple.bpmn';


describe('camunda-platform/features/create-append-menu', function() {

  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      coreModule,
      contextPadModule,
      paletteModule,
      editorActionsModule,
      modelingModule,
      popupMenuModule,
      createAppendAnythingModule,
      createAppendGroupsModule,
      elementDescriptionsModule
    ]
  }));


  it('should group the create menu into categories', inject(function(canvas) {

    // when
    const entries = openMenu(canvas.getRootElement(), 'bpmn-create');

    // then
    expect(Object.keys(entries)).to.include.members([
      'create-tasks',
      'create-gateways'
    ]);
  }));


  it('should describe a create menu element', inject(function(canvas) {

    // when
    const entries = openMenu(canvas.getRootElement(), 'bpmn-create');

    // then
    expect(findEntry(entries, 'create-user-task').description).to.exist;
  }));

});


// helpers /////////////

function openMenu(element, providerId) {
  return getBpmnJS().invoke(function(popupMenu) {
    popupMenu.open(element, providerId, { x: 100, y: 100 });

    return popupMenu._current.entries;
  });
}
