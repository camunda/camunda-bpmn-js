/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import {
  TASK,
  GATEWAY,
  SUBPROCESS,
  ALL_EVENTS,
  DATA_OBJECTS,
  PARTICIPANT
} from 'bpmn-js-create-append-anything';

const eventsOfType = type => ALL_EVENTS.filter(option => option.target.type === type);

/**
 * The Camunda create/append taxonomy: a drill-in tree of categories over the
 * flat options that `bpmn-js-create-append-anything` provides.
 */
export const CREATE_OPTIONS_TREE = [
  {
    id: 'tasks',
    name: 'Tasks',
    className: 'bpmn-icon-task',
    items: TASK
  },
  {
    id: 'gateways',
    name: 'Gateways',
    className: 'bpmn-icon-gateway-none',
    items: GATEWAY
  },
  {
    id: 'subprocesses',
    name: 'Sub-processes',
    className: 'bpmn-icon-subprocess-expanded',
    items: SUBPROCESS
  },
  {
    id: 'events',
    name: 'Events',
    className: 'bpmn-icon-intermediate-event-none',
    items: [
      {
        id: 'start-events',
        name: 'Start events',
        className: 'bpmn-icon-start-event-none',
        items: eventsOfType('bpmn:StartEvent')
      },
      {
        id: 'intermediate-catch-events',
        name: 'Intermediate catch events',
        className: 'bpmn-icon-intermediate-event-none',
        items: eventsOfType('bpmn:IntermediateCatchEvent')
      },
      {
        id: 'intermediate-throw-events',
        name: 'Intermediate throw events',
        className: 'bpmn-icon-intermediate-event-none',
        items: eventsOfType('bpmn:IntermediateThrowEvent')
      },
      {
        id: 'boundary-events',
        name: 'Boundary events',
        className: 'bpmn-icon-intermediate-event-none',
        items: eventsOfType('bpmn:BoundaryEvent')
      },
      {
        id: 'end-events',
        name: 'End events',
        className: 'bpmn-icon-end-event-none',
        items: eventsOfType('bpmn:EndEvent')
      }
    ]
  },
  {
    id: 'data',
    name: 'Data',
    className: 'bpmn-icon-data-object',
    items: DATA_OBJECTS
  },
  {
    id: 'participants',
    name: 'Participants',
    className: 'bpmn-icon-participant',
    items: PARTICIPANT
  }
];

/**
 * Plain-language descriptions for the categories, keyed by category id.
 */
export const GROUP_DESCRIPTIONS = {
  'tasks': 'Atomic units of work in a process',
  'gateways': 'Route the flow: branch or merge paths',
  'subprocesses': 'Nested or reusable activities',
  'events': 'Things a process reacts to or emits',
  'start-events': 'Where a process or path begins',
  'intermediate-catch-events': 'Wait for something to happen before continuing',
  'intermediate-throw-events': 'Emit an event, then continue',
  'boundary-events': 'React to something while an activity is running',
  'end-events': 'Where a process path ends',
  'data': 'Data the process uses',
  'participants': 'Systems or organizations involved'
};
