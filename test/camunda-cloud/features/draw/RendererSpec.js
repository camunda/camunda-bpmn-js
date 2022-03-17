import {
  bootstrapCamundaCloudModeler,
  inject
} from 'test/TestHelper';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import coreModule from 'bpmn-js/lib/core';

import modelingModule from 'bpmn-js/lib/features/modeling';

import drawModule from 'lib/camunda-cloud/features/draw';

import diagramXML from 'test/fixtures/zeebe.bpmn';

const testModules = [
  coreModule,
  drawModule,
  modelingModule
];

describe('camunda-cloud/features - Renderer', function() {

  beforeEach(bootstrapCamundaCloudModeler(diagramXML, { modules: testModules }));

  it.only('should render icon', inject(function(elementRegistry) {

    // given
    const gfx = elementRegistry.getGraphics('ServiceTask_1');

    // then
    expect(gfx).to.exist;
  }));


  it('should render updated icon', inject(function(elementRegistry, modeling, bpmnjs) {

    // given
    const element = elementRegistry.get('ServiceTask_1');

    const modelerTemplateIcon = findExtension(element, 'zeebe:ModelerTemplateIcon');

    const newIcon = '<svg xmlns="http://www.w3.org/2000/svg"><path d="m 11.504082,24.374985 h 9.305414 V 22.249272 H 14.020232 V 18.06292 h 5.574572 V 15.937208 H 14.020232 V 12.31482 h 6.572355 v -2.12571 h -9.088505 z" id="EMAIL_TASK_ICON"/></svg>';

    // when
    modeling.updateModdleProperties(
      element,
      modelerTemplateIcon,
      {
        body: newIcon
      }
    );

    bpmnjs.saveXML({ format: true }).then(console.log);
  }));
});


// helpers /////////////

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