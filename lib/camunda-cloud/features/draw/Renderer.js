import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isLabel
} from 'bpmn-js/lib/util/LabelUtil';

import {
  getStrokeColor
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
  append as svgAppend,
  create as svgCreate
} from 'tiny-svg';

const connectorTaskIcons = {
  'foo': 'm 11.504082,24.374985 h 9.305414 V 22.249272 H 14.020232 V 18.06292 h 5.574572 V 15.937208 H 14.020232 V 12.31482 h 6.572355 v -2.12571 h -9.088505 z'
};


export default class CamundaCloudRenderer extends BaseRenderer {

  constructor(config, eventBus, bpmnRenderer) {
    super(eventBus, 1250);

    this._bpmnRenderer = bpmnRenderer;
    this._config = config || {};
  }

  canRender(element) {
    return !!getElementTemplate(element);
  }

  drawShape(parentGfx, element) {
    const renderer = this._bpmnRenderer.handlers['bpmn:Task'];

    const gfx = renderer(parentGfx, element);

    const icon = svgCreate(getModelerTemplateIcon(element));

    console.log(icon);

    // this._bpmnRenderer._drawPath(parentGfx, icon, {
    //   fill: getStrokeColor(element, this._config.defaultStrokeColor),
    //   stroke: 'none'
    // });

    svgAppend(parentGfx, icon);

    // todo: provide default icon

    return gfx;
  }
}

CamundaCloudRenderer.$inject = [
  'config.bpmnRenderer',
  'eventBus',
  'bpmnRenderer'
];


// helper ///////////////

function getElementTemplate(element) {
  return !isLabel(element) && is(element, 'bpmn:Activity') && getBusinessObject(element).get('zeebe:modelerTemplate');
}

function getModelerTemplateIcon(element) {
  const modelerTemplateIcon = findExtension(element, 'zeebe:ModelerTemplateIcon');
  return modelerTemplateIcon && modelerTemplateIcon.get('body');
}

function findExtension(element, type) {
  const businessObject = getBusinessObject(element);

  let extensionElements;

  if (is(businessObject, 'bpmn:ExtensionElements')) {
    extensionElements = businessObject;
  } else {
    extensionElements = businessObject.get('extensionElements');
  }

  if (!extensionElements) {
    return null;
  }

  return extensionElements.get('values').find((value) => {
    return is(value, type);
  });
}