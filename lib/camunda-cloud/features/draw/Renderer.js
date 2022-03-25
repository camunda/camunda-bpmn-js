import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import {
  isLabel
} from 'bpmn-js/lib/util/LabelUtil';

import {
  find
} from 'min-dash';

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

function getElementTemplateVersion(element) {
  return !isLabel(element) && is(element, 'bpmn:Activity') && getBusinessObject(element).get('zeebe:modelerTemplateVersion');
}

function getDefinitions(element) {
  let businessObject = getBusinessObject(element);

  while (businessObject && !is(businessObject, 'bpmn:Definitions')) {
    businessObject = businessObject.$parent;
  }

  return businessObject;
}

// todo: move to helpers we can use elsewhere (if needed)
function getModelerTemplateIcons(element) {
  const icons = findExtension(element, 'zeebe:ModelerTemplateIcons');
  return icons && icons.get('icons');
}

function getIconId(element) {
  const templateId = getElementTemplate(element);
  const templateVersion = getElementTemplateVersion(element);

  let iconId = 'Icon_' + templateId;
  if (templateVersion) {
    iconId = iconId + '-' + templateVersion;
  }

  return iconId;
}

function getModelerTemplateIcon(element) {
  const definitions = getDefinitions(element);

  const icons = getModelerTemplateIcons(definitions);

  const iconId = getIconId(element);

  const found = find(icons, function(icon) {
    return icon.get('id') === iconId;
  });

  return found && found.get('body');
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