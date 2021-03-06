import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';

import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';

import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';

import executableProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ExecutableProps';

import inputOutput from './parts/InputOutputProps';

import headers from './parts/HeadersProps';

import taskDefinition from './parts/TaskDefinitionProps';

import sequenceFlowProps from './parts/SequenceFlowProps';

import messageProps from './parts/MessageProps';

import timerProps from './parts/TimerEventProps';

import multiInstanceProps from './parts/MultiInstanceProps';

import errorProps from './parts/ErrorProps';

import callActivityProps from './parts/CallActivityProps';

import formProps from './parts/FormProps';

import { is } from 'bpmn-js/lib/util/ModelUtil';

function getIdOptions(element) {
  if (is(element, 'bpmn:Participant')) {
    return { id: 'participant-id', label: 'Participant Id' };
  }
}

function getNameOptions(element) {
  if (is(element, 'bpmn:Participant')) {
    return { id: 'participant-name', label: 'Participant Name' };
  }
}

function createGeneralTabGroups(element, bpmnFactory, canvas, translate) {
  const generalGroup = {
    id: 'general',
    label: translate('General'),
    entries: []
  };

  idProps(generalGroup, element, translate, getIdOptions(element));
  nameProps(generalGroup, element, bpmnFactory, canvas, translate, getNameOptions(element));
  processProps(generalGroup, element, translate);
  executableProps(generalGroup, element, translate);

  const detailsGroup = {
    id: 'details',
    label: translate('Details'),
    entries: []
  };
  taskDefinition(detailsGroup, element, bpmnFactory, translate);
  sequenceFlowProps(detailsGroup, element, bpmnFactory, translate);
  messageProps(detailsGroup, element, bpmnFactory, translate);
  timerProps(detailsGroup, element, bpmnFactory, translate);
  errorProps(detailsGroup, element, bpmnFactory, translate);
  callActivityProps(detailsGroup, element, bpmnFactory, translate);

  const multiInstanceGroup = {
    id: 'multiInstance',
    label: translate('Multi Instance'),
    entries: []
  };
  multiInstanceProps(multiInstanceGroup, element, bpmnFactory, translate);

  return [
    generalGroup,
    detailsGroup,
    multiInstanceGroup
  ];
}

function createFormsGroups(element, bpmnFactory, translate) {

  const formsGroups = {
    id: 'forms-properties',
    label: translate('Forms'),
    entries: []
  };
  formProps(formsGroups, element, bpmnFactory, translate);


  return [
    formsGroups
  ];
}

function createHeadersGroups(element, bpmnFactory, translate) {

  const headersGroup = {
    id: 'headers-properties',
    label: translate('Headers'),
    entries: []
  };
  headers(headersGroup, element, bpmnFactory, translate);

  return [
    headersGroup
  ];
}


function createInputOutputTabGroups(element, bpmnFactory, translate) {

  const inputGroup = {
    id: 'input',
    label: translate('Input Parameters'),
    entries: []
  };

  inputOutput(inputGroup, element, bpmnFactory, translate, {
    type: 'zeebe:Input',
    prop: 'inputParameters',
    prefix: 'input'
  });

  const outputGroup = {
    id: 'output',
    label: translate('Output Parameters'),
    entries: []
  };

  inputOutput(outputGroup, element, bpmnFactory, translate, {
    type: 'zeebe:Output',
    prop: 'outputParameters',
    prefix: 'output'
  });

  return [
    inputGroup,
    outputGroup
  ];
}

export default class ZeebePropertiesProvider extends PropertiesActivator {
  constructor(eventBus, bpmnFactory, canvas, translate) {

    super(eventBus);

    this._bpmnFactory = bpmnFactory;
    this._canvas = canvas;
    this._translate = translate;

  }

  getTabs(element) {
    const generalTab = {
      id: 'general',
      label: this._translate('General'),
      groups: createGeneralTabGroups(
        element, this._bpmnFactory, this._canvas, this._translate)
    };

    const formsTab = {
      id: 'forms',
      label: this._translate('Forms'),
      groups: createFormsGroups(
        element, this._bpmnFactory, this._translate
      )
    };

    const inputOutputTab = {
      id: 'input-output',
      label: this._translate('Input/Output'),
      groups: createInputOutputTabGroups(
        element, this._bpmnFactory, this._translate)
    };

    const headersTab = {
      id: 'headers',
      label: this._translate('Headers'),
      groups: createHeadersGroups(
        element, this._bpmnFactory, this._translate)
    };

    return [
      generalTab,
      formsTab,
      inputOutputTab,
      headersTab
    ];
  }

}

ZeebePropertiesProvider.$inject = [
  'eventBus',
  'bpmnFactory',
  'canvas',
  'translate'
];
