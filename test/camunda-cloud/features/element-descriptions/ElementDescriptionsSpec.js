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

import elementDescriptionsModule from 'lib/base/features/element-descriptions';

import createAppendGroupsModule from 'lib/base/features/create-append-groups';

import {
  ELEMENT_DESCRIPTIONS
} from 'lib/base/features/element-descriptions/descriptions';

import { findPopupEntry as findEntry } from 'lib/util/PopupMenuEntriesUtil';

import diagramXML from './ElementDescriptions.bpmn';


describe('camunda-cloud/features/element-descriptions', function() {

  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      coreModule,
      contextPadModule,
      paletteModule,
      editorActionsModule,
      modelingModule,
      popupMenuModule,
      createAppendAnythingModule,
      elementDescriptionsModule,
      createAppendGroupsModule
    ]
  }));


  it('should describe a replace entry (direct id)', inject(function(elementRegistry) {

    // given
    const startEvent = elementRegistry.get('StartEvent_1');

    // when
    const entries = openReplace(startEvent);

    // then
    expect(entries['replace-with-timer-start'].description).to.eql(ELEMENT_DESCRIPTIONS['timer-start']);
  }));


  it('should describe a replace entry with a legacy actionName', inject(function(elementRegistry) {

    // given
    const startEvent = elementRegistry.get('StartEvent_1');

    // when
    const entries = openReplace(startEvent);

    // then the plain start event uses the legacy `replace-with-none-start` action
    expect(entries['replace-with-none-start'].description).to.eql(ELEMENT_DESCRIPTIONS['none-start-event']);
  }));


  it('should describe a create entry nested in a category', inject(function(canvas) {

    // given
    const rootElement = canvas.getRootElement();

    // when
    const entries = openMenu(rootElement, 'bpmn-create');

    // then the leaf is nested inside the Tasks category
    expect(findEntry(entries, 'create-user-task').description).to.eql(ELEMENT_DESCRIPTIONS['user-task']);
  }));


  it('should describe a non-interrupting start event', inject(function(canvas) {

    // given
    const rootElement = canvas.getRootElement();

    // when
    const entries = openMenu(rootElement, 'bpmn-create');

    // then non-interrupting starts use the `replace-with-<id>` create action
    expect(findEntry(entries, 'create-replace-with-non-interrupting-message-start').description)
      .to.eql(ELEMENT_DESCRIPTIONS['non-interrupting-message-start']);
  }));


  it('should describe an append entry nested in a category', inject(function(elementRegistry) {

    // given
    const startEvent = elementRegistry.get('StartEvent_1');

    // when
    const entries = openMenu(startEvent, 'bpmn-append');

    // then
    expect(findEntry(entries, 'append-user-task').description).to.eql(ELEMENT_DESCRIPTIONS['user-task']);
  }));

});


// helpers /////////////

function openReplace(element) {
  return getBpmnJS().invoke(function(popupMenu) {
    popupMenu.open(element, 'bpmn-replace', { x: 100, y: 100 });

    return popupMenu._current.entries;
  });
}

function openMenu(element, providerId) {
  return getBpmnJS().invoke(function(popupMenu) {
    popupMenu.open(element, providerId, { x: 100, y: 100 });

    return popupMenu._current.entries;
  });
}
