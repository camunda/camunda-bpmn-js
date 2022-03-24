import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isLabel
} from 'bpmn-js/lib/util/LabelUtil';

// todo: this is a dependency now!
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg';

export default class CamundaCloudRenderer extends BaseRenderer {

  constructor(config, eventBus, bpmnRenderer) {
    super(eventBus, 1250);

    this._bpmnRenderer = bpmnRenderer;
    this._config = config || {};
  }

  canRender(element) {
    return (

      // todo: support other element types?
      is(element, 'bpmn:Task') &&
      !!getElementTemplate(element) &&
      !!getModelerTemplateIcon(element)
    );
  }

  drawShape(parentGfx, element) {

    // todo: support other element types?
    const renderer = this._bpmnRenderer.handlers['bpmn:Task'];

    const gfx = renderer(parentGfx, element);

    const modelerTemplateIcon = getModelerTemplateIcon(element);

    const icon = svgCreate('image');
    svgAttr(icon, {
      href: modelerTemplateIcon,
      x: 2,
      y: 2
    });

    svgAppend(parentGfx, icon);

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