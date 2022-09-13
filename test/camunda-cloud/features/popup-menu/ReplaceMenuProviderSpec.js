import {
  bootstrapCamundaCloudModeler,
  getBpmnJS,
  inject
} from 'test/TestHelper';

import {
  query as domQuery
} from 'min-dom';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import contextPadModule from 'bpmn-js/lib/features/context-pad';

import paletteModule from 'bpmn-js/lib/features/palette';

import zeebeReplaceMenuProvider from 'lib/camunda-cloud/features/popup-menu';

import diagramXML from 'test/fixtures/diagram.bpmn';

const testModules = [
  coreModule,
  paletteModule,
  contextPadModule,
  modelingModule,
  zeebeReplaceMenuProvider
];


describe('camunda-cloud/features - PopupMenu', function() {

  beforeEach(bootstrapCamundaCloudModeler(diagramXML, { modules: testModules }));

  describe('events', function() {

    it('should contain options for StartEvent', inject(function(
        popupMenu, elementRegistry) {

      // given
      const startEvent = elementRegistry.get('StartEvent_1');

      openPopup(startEvent);

      const endEventEntry = queryEntry(popupMenu, 'replace-with-none-end'),
            intermediateEventEntry = queryEntry(popupMenu, 'replace-with-none-intermediate-throwing'),
            messageStartEntry = queryEntry(popupMenu, 'replace-with-message-start'),
            timerStartEntry = queryEntry(popupMenu, 'replace-with-timer-start');

      // then
      expect(endEventEntry).to.exist;
      expect(intermediateEventEntry).to.exist;
      expect(messageStartEntry).to.exist;
      expect(timerStartEntry).to.exist;
    }));


    it('should contain options for EndEvent', inject(function(
        popupMenu, elementRegistry) {

      // given
      const endEvent = elementRegistry.get('EndEvent_1');

      openPopup(endEvent);

      const startEventEntry = queryEntry(popupMenu, 'replace-with-none-start'),
            intermediateEventEntry = queryEntry(popupMenu, 'replace-with-none-intermediate-throw'),
            errorEndEventEntry = queryEntry(popupMenu, 'replace-with-error-end'),
            messageEndEventEntry = queryEntry(popupMenu, 'replace-with-message-end');

      // then
      expect(startEventEntry).to.exist;
      expect(intermediateEventEntry).to.exist;
      expect(errorEndEventEntry).to.exist;
      expect(messageEndEventEntry).to.exist;
    }));


    it('should contain options for TimerEvent', inject(function(
        popupMenu, elementRegistry) {

      // given
      const timerEvent = elementRegistry.get('TimerEvent_1');

      openPopup(timerEvent);

      const startEventEntry = queryEntry(popupMenu, 'replace-with-none-start'),
            endEventEntry = queryEntry(popupMenu, 'replace-with-none-end'),
            intermediateEventEntry = queryEntry(popupMenu, 'replace-with-none-intermediate-throw'),
            messageEventEntry = queryEntry(popupMenu, 'replace-with-message-intermediate-catch'),
            messageThrowEventEntry = queryEntry(popupMenu, 'replace-with-message-intermediate-throw');

      // then
      expect(startEventEntry).to.exist;
      expect(endEventEntry).to.exist;
      expect(intermediateEventEntry).to.exist;
      expect(messageEventEntry).to.exist;
      expect(messageThrowEventEntry).to.exist;
    }));


    it('should contain options for MessageEvent', inject(function(
        popupMenu, elementRegistry) {

      // given
      const timerEvent = elementRegistry.get('MessageEvent_1');

      openPopup(timerEvent);

      const startEventEntry = queryEntry(popupMenu, 'replace-with-none-start'),
            endEventEntry = queryEntry(popupMenu, 'replace-with-none-end'),
            intermediateEventEntry = queryEntry(popupMenu, 'replace-with-none-intermediate-throw'),
            timerEventEntry = queryEntry(popupMenu, 'replace-with-timer-intermediate-catch'),
            messageThrowEventEntry = queryEntry(popupMenu, 'replace-with-message-intermediate-throw');

      // then
      expect(startEventEntry).to.exist;
      expect(endEventEntry).to.exist;
      expect(intermediateEventEntry).to.exist;
      expect(timerEventEntry).to.exist;
      expect(messageThrowEventEntry).to.exist;
    }));


    it('should contain options for MessageThrowEvent', inject(function(
        popupMenu, elementRegistry) {

      // given
      const messageThrowEvent = elementRegistry.get('MessageThrowEvent_1');

      openPopup(messageThrowEvent);

      const startEventEntry = queryEntry(popupMenu, 'replace-with-none-start'),
            endEventEntry = queryEntry(popupMenu, 'replace-with-none-end'),
            intermediateEventEntry = queryEntry(popupMenu, 'replace-with-none-intermediate-throw'),
            timerEventEntry = queryEntry(popupMenu, 'replace-with-timer-intermediate-catch'),
            messageCatchEventEntry = queryEntry(popupMenu, 'replace-with-message-intermediate-catch');

      // then
      expect(startEventEntry).to.exist;
      expect(endEventEntry).to.exist;
      expect(intermediateEventEntry).to.exist;
      expect(timerEventEntry).to.exist;
      expect(messageCatchEventEntry).to.exist;
    }));


    it('should contain options for MessageEndEvent', inject(function(
        popupMenu, elementRegistry) {

      // given
      const messageEndEvent = elementRegistry.get('MessageEndEvent_1');

      openPopup(messageEndEvent);

      const startEventEntry = queryEntry(popupMenu, 'replace-with-none-start'),
            intermediateEventEntry = queryEntry(popupMenu, 'replace-with-none-intermediate-throw'),
            errorEndEventEntry = queryEntry(popupMenu, 'replace-with-error-end'),
            endEventEntry = queryEntry(popupMenu, 'replace-with-none-end');

      // then
      expect(startEventEntry).to.exist;
      expect(intermediateEventEntry).to.exist;
      expect(errorEndEventEntry).to.exist;
      expect(endEventEntry).to.exist;
    }));


    it('should contain options for BoundaryEvent', inject(function(
        popupMenu, elementRegistry) {

      // given
      const endEvent = elementRegistry.get('BoundaryEvent_1');

      openPopup(endEvent);

      const messageBoundaryEntry = queryEntry(popupMenu, 'replace-with-message-boundary'),
            timerBoundaryEntry = queryEntry(popupMenu, 'replace-with-timer-boundary'),
            errorBoundaryEntry = queryEntry(popupMenu, 'replace-with-error-boundary'),
            nonInterruptingMessageBoundaryEntry =
          queryEntry(popupMenu, 'replace-with-non-interrupting-message-boundary'),
            nonInterruptingTimerBoundaryEntry =
          queryEntry(popupMenu, 'replace-with-non-interrupting-timer-boundary');

      // then
      expect(messageBoundaryEntry).to.exist;
      expect(timerBoundaryEntry).to.exist;
      expect(errorBoundaryEntry).to.exist;
      expect(nonInterruptingMessageBoundaryEntry).to.exist;
      expect(nonInterruptingTimerBoundaryEntry).to.exist;
    }));

  });


  describe('activities', function() {

    it('should contain options for Task', inject(function(
        popupMenu, elementRegistry) {

      // given
      const task = elementRegistry.get('Task_1');

      // when
      openPopup(task);

      // then
      expectEntries(popupMenu, [
        'replace-with-receive-task',
        'replace-with-service-task',
        'replace-with-call-activity',
        'replace-with-collapsed-subprocess',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-user-task',
        'replace-with-script-task',
        'replace-with-send-task',
        'replace-with-rule-task',
        'replace-with-manual-task'
      ]);
    }));


    it('should contain options for MessageTask', inject(function(
        popupMenu, elementRegistry) {

      // given
      const messageTask = elementRegistry.get('MessageTask_1');

      openPopup(messageTask);

      // then
      expectEntries(popupMenu, [
        'replace-with-task',
        'replace-with-service-task',
        'replace-with-call-activity',
        'replace-with-collapsed-subprocess',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-user-task',
        'replace-with-script-task',
        'replace-with-send-task',
        'replace-with-rule-task',
        'replace-with-manual-task'
      ]);
    }));


    it('should contain options for ServiceTask', inject(function(
        popupMenu, elementRegistry) {

      // given
      const serviceTask = elementRegistry.get('ServiceTask_1');

      // when
      openPopup(serviceTask);

      // then
      expectEntries(popupMenu, [
        'replace-with-task',
        'replace-with-receive-task',
        'replace-with-call-activity',
        'replace-with-collapsed-subprocess',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-user-task',
        'replace-with-script-task',
        'replace-with-send-task',
        'replace-with-rule-task',
        'replace-with-manual-task'
      ]);
    }));


    it('should contain options for SendTask', inject(function(
        popupMenu, elementRegistry) {

      // given
      const serviceTask = elementRegistry.get('SendTask_1');

      // when
      openPopup(serviceTask);

      // then
      expectEntries(popupMenu, [
        'replace-with-task',
        'replace-with-receive-task',
        'replace-with-service-task',
        'replace-with-call-activity',
        'replace-with-collapsed-subprocess',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-user-task',
        'replace-with-script-task',
        'replace-with-rule-task',
        'replace-with-manual-task'
      ]);
    }));


    it('should contain options for ScriptTask', inject(function(
        popupMenu, elementRegistry) {

      // given
      const serviceTask = elementRegistry.get('ScriptTask_1');

      // when
      openPopup(serviceTask);

      // then
      expectEntries(popupMenu, [
        'replace-with-task',
        'replace-with-receive-task',
        'replace-with-service-task',
        'replace-with-call-activity',
        'replace-with-collapsed-subprocess',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-user-task',
        'replace-with-send-task',
        'replace-with-rule-task',
        'replace-with-manual-task'
      ]);
    }));


    it('should contain options for BusinessRuleTask', inject(function(
        popupMenu, elementRegistry) {

      // given
      const serviceTask = elementRegistry.get('BusinessRuleTask_1');

      // when
      openPopup(serviceTask);

      // then
      expectEntries(popupMenu, [
        'replace-with-task',
        'replace-with-receive-task',
        'replace-with-service-task',
        'replace-with-call-activity',
        'replace-with-collapsed-subprocess',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-user-task',
        'replace-with-script-task',
        'replace-with-send-task',
        'replace-with-manual-task'
      ]);
    }));


    it('should contain options for CallActivity', inject(function(
        popupMenu, elementRegistry) {

      // given
      const callActivity = elementRegistry.get('CallActivity_1');

      // when
      openPopup(callActivity);

      // then
      expectEntries(popupMenu, [
        'replace-with-task',
        'replace-with-receive-task',
        'replace-with-service-task',
        'replace-with-collapsed-subprocess',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-script-task',
        'replace-with-send-task',
        'replace-with-rule-task',
        'replace-with-manual-task',
      ]);
    }));


    it('should contain options for UserTask', inject(function(
        popupMenu, elementRegistry) {

      // given
      const userTask = elementRegistry.get('UserTask_1');

      // when
      openPopup(userTask);

      // then
      expectEntries(popupMenu, [
        'replace-with-task',
        'replace-with-service-task',
        'replace-with-receive-task',
        'replace-with-call-activity',
        'replace-with-collapsed-subprocess',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-script-task',
        'replace-with-send-task',
        'replace-with-rule-task'
      ]);
    }));


    it('should contain options for ManualTask', inject(function(
        popupMenu, elementRegistry) {

      // given
      const manualTask = elementRegistry.get('ManualTask_1');

      // when
      openPopup(manualTask);

      // then
      expectEntries(popupMenu, [
        'replace-with-task',
        'replace-with-user-task',
        'replace-with-service-task',
        'replace-with-receive-task',
        'replace-with-call-activity',
        'replace-with-collapsed-subprocess',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-script-task',
        'replace-with-send-task',
        'replace-with-rule-task'
      ]);
    }));

  });


  describe('gateways', function() {

    it('should contain options for EventBasedGateway', inject(function(
        popupMenu, elementRegistry) {

      // given
      const eventBasedGateway = elementRegistry.get('EventBasedGateway_1');

      openPopup(eventBasedGateway);

      const exclusiveGatewayEntry = queryEntry(popupMenu, 'replace-with-exclusive-gateway'),
            inclusiveGatewayEntry = queryEntry(popupMenu, 'replace-with-inclusive-gateway'),
            parallelGatewayEntry = queryEntry(popupMenu, 'replace-with-parallel-gateway');

      // then
      expect(exclusiveGatewayEntry).to.exist;
      expect(inclusiveGatewayEntry).to.exist;
      expect(parallelGatewayEntry).to.exist;
    }));


    it('should contain options for ParallelGateway', inject(function(
        popupMenu, elementRegistry) {

      // given
      const parallelGateway = elementRegistry.get('ParallelGateway_1');

      openPopup(parallelGateway);

      const eventBasedGatewayEntry = queryEntry(popupMenu, 'replace-with-event-based-gateway'),
            exclusiveGatewayEntry = queryEntry(popupMenu, 'replace-with-exclusive-gateway'),
            inclusiveGatewayEntry = queryEntry(popupMenu, 'replace-with-inclusive-gateway');

      // then
      expect(eventBasedGatewayEntry).to.exist;
      expect(exclusiveGatewayEntry).to.exist;
      expect(inclusiveGatewayEntry).to.exist;
    }));


    it('should contain options for ExclusiveGateway', inject(function(
        popupMenu, elementRegistry) {

      // given
      const exclusiveGateway = elementRegistry.get('ExclusiveGateway_1');

      openPopup(exclusiveGateway);

      const eventBasedGatewayEntry = queryEntry(popupMenu, 'replace-with-event-based-gateway'),
            inclusiveGatewayEntry = queryEntry(popupMenu, 'replace-with-inclusive-gateway'),
            parallelGatewayEntry = queryEntry(popupMenu, 'replace-with-parallel-gateway');

      // then
      expect(eventBasedGatewayEntry).to.exist;
      expect(inclusiveGatewayEntry).to.exist;
      expect(parallelGatewayEntry).to.exist;
    }));


    it('should contain options for ExclusiveGateway', inject(function(
        popupMenu, elementRegistry) {

      // given
      const exclusiveGateway = elementRegistry.get('ExclusiveGateway_1');

      openPopup(exclusiveGateway);

      const eventBasedGatewayEntry = queryEntry(popupMenu, 'replace-with-event-based-gateway'),
            inclusiveGatewayEntry = queryEntry(popupMenu, 'replace-with-inclusive-gateway'),
            parallelGatewayEntry = queryEntry(popupMenu, 'replace-with-parallel-gateway');

      // then
      expect(eventBasedGatewayEntry).to.exist;
      expect(inclusiveGatewayEntry).to.exist;
      expect(parallelGatewayEntry).to.exist;
    }));


    it('should contain options for InclusiveGateway', inject(function(
        popupMenu, elementRegistry) {

      // given
      const inclusiveGateway = elementRegistry.get('InclusiveGateway_1');

      openPopup(inclusiveGateway);

      const eventBasedGatewayEntry = queryEntry(popupMenu, 'replace-with-event-based-gateway'),
            exclusiveGatewayEntry = queryEntry(popupMenu, 'replace-with-exclusive-gateway'),
            parallelGatewayEntry = queryEntry(popupMenu, 'replace-with-parallel-gateway');

      // then
      expect(eventBasedGatewayEntry).to.exist;
      expect(exclusiveGatewayEntry).to.exist;
      expect(parallelGatewayEntry).to.exist;
    }));

  });


  describe('sub processes', function() {

    it('should contain options for (collapsed) SubProcess', inject(function(
        popupMenu, elementRegistry) {

      // given
      const subProcess = elementRegistry.get('SubProcess_1');

      // when
      openPopup(subProcess);

      // then
      expectEntries(popupMenu, [
        'replace-with-task',
        'replace-with-receive-task',
        'replace-with-service-task',
        'replace-with-call-activity',
        'replace-with-expanded-subprocess',
        'toggle-parallel-mi',
        'toggle-sequential-mi',
        'replace-with-user-task',
        'replace-with-script-task',
        'replace-with-send-task',
        'replace-with-rule-task',
        'replace-with-manual-task'
      ]);
    }));


    it('should contain options for (expanded) SubProcess', inject(function(
        popupMenu, elementRegistry) {

      // given
      const subProcess = elementRegistry.get('SubProcess_2');

      openPopup(subProcess);

      const collapsedSubProcessEntry = queryEntry(popupMenu, 'replace-with-collapsed-subprocess'),
            eventSubProcessEntry = queryEntry(popupMenu, 'replace-with-event-subprocess'),
            sequentialMultiInstanceEntry = queryEntry(popupMenu, 'toggle-parallel-mi'),
            parallelMultiInstanceEntry = queryEntry(popupMenu, 'toggle-sequential-mi');

      // then
      expect(collapsedSubProcessEntry).to.exist;
      expect(eventSubProcessEntry).to.exist;
      expect(sequentialMultiInstanceEntry).to.exist;
      expect(parallelMultiInstanceEntry).to.exist;
    }));

  });


  describe('participants', function() {

    it('should contain options for  (expanded) Participant', inject(function(
        popupMenu, elementRegistry) {

      // given
      const participant = elementRegistry.get('Participant_1');

      openPopup(participant);

      const collapseEntry = queryEntry(popupMenu, 'replace-with-collapsed-pool');

      // then
      expect(collapseEntry).to.exist;
    }));


    it('should contain options for  (collapsed) Participant', inject(function(
        popupMenu, elementRegistry) {

      // given
      const participant = elementRegistry.get('Participant_2');

      openPopup(participant);

      const expandEntry = queryEntry(popupMenu, 'replace-with-expanded-pool');

      // then
      expect(expandEntry).to.exist;
    }));

  });


  describe('event sub process', function() {

    it('should contain options for EventSubProcess', inject(function(
        popupMenu, elementRegistry) {

      // given
      const eventSubProcess = elementRegistry.get('EventSubProcess1');

      openPopup(eventSubProcess);

      const subProcessEntry = queryEntry(popupMenu, 'replace-with-subprocess'),
            sequentialMultiInstanceEntry = queryEntry(popupMenu, 'toggle-parallel-mi'),
            parallelMultiInstanceEntry = queryEntry(popupMenu, 'toggle-sequential-mi');

      // then
      expect(subProcessEntry).to.exist;
      expect(sequentialMultiInstanceEntry).not.to.exist;
      expect(parallelMultiInstanceEntry).not.to.exist;
    }));


    it('should contain options for StartEvent in EventSubProcess', inject(function(
        popupMenu, elementRegistry) {

      // given
      const startEvent = elementRegistry.get('StartEvent_2');

      openPopup(startEvent);

      const timerStartEntry = queryEntry(popupMenu, 'replace-with-timer-start'),
            messageStartEntry = queryEntry(popupMenu, 'replace-with-message-start'),
            errorStartEntry = queryEntry(popupMenu, 'replace-with-error-start'),
            messageNonInterruptingEntry = queryEntry(popupMenu, 'replace-with-non-interrupting-message-start'),
            timerNonInterruptingEntry = queryEntry(popupMenu, 'replace-with-non-interrupting-timer-start');

      // then
      expect(timerStartEntry).to.exist;
      expect(messageStartEntry).to.exist;
      expect(errorStartEntry).to.exist;
      expect(messageNonInterruptingEntry).to.exist;
      expect(timerNonInterruptingEntry).to.exist;
    }));

  });

});


// helper //////////

/**
 * Query popup menu to check if queries exist.
 *
 * @param {string[]} entries - ids of the expected entries
 */
function expectEntries(popupMenu, entries) {
  for (const entryId of entries) {
    const entry = queryEntry(popupMenu, entryId);

    expect(entry, `Entry ${entryId} not found`).to.exist;
  }
}

const queryEntry = (popupMenu, id) => {
  return domQuery('[data-id="' + id + '"]', popupMenu._current.container);
};

const openPopup = (element, offset) => {
  offset = offset || 100;

  getBpmnJS().invoke(function(popupMenu) {

    popupMenu.open(element, 'bpmn-replace', {
      x: element.x + offset, y: element.y + offset
    });

  });
};
