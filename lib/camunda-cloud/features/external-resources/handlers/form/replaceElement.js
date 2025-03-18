import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';

/**
 * @typedef {{
*   type: 'form',
*   name: string,
*   formId: string
* }} Form
*/

/**
 * @param {import('diagram-js/lib/model').Element} element
 * @param {Form} resource
 * @param {import('didi').Injector} injector
*/
export function replaceElement(element, resource, injector) {
  const bpmnFactory = injector.get('bpmnFactory'),
        bpmnReplace = injector.get('bpmnReplace'),
        modeling = injector.get('modeling'),
        commandStack = injector.get('commandStack');


  commandStack.execute('external-resources.composed-command', {
    command: replace
  });


  function replace() {
    const replacedElement = bpmnReplace.replaceElement(element, { type: 'bpmn:UserTask' });
    modeling.updateProperties(replacedElement, {
      name: resource.name
    });

    const bo = getBusinessObject(replacedElement);

    const extensionElements = bo.get('extensionElements');

    if (!extensionElements) {
      modeling.updateProperties(replacedElement, {
        extensionElements: bpmnFactory.create('bpmn:ExtensionElements', {
          values: [
            createZeebeUserTask(bpmnFactory),
            createFormDefinition(resource, bpmnFactory)
          ]
        })
      });

      return;
    }

    const formDefinition = getFormDefinition(replacedElement);

    if (!formDefinition) {
      modeling.updateModdleProperties(replacedElement, extensionElements, {
        values: [
          ...extensionElements.values,
          createFormDefinition(resource, bpmnFactory)
        ]
      });

      return;
    }

    modeling.updateModdleProperties(replacedElement, formDefinition, {
      formId: resource.formId
    });
  }
}

function getFormDefinition(element) {
  return element.businessObject?.extensionElements?.values.find(value => is(value, 'zeebe:FormDefinition'));
}

function createFormDefinition(resource, bpmnFactory) {
  return bpmnFactory.create('zeebe:FormDefinition', {
    formId: resource.formId
  });
}

function createZeebeUserTask(bpmnFactory) {
  return bpmnFactory.create('zeebe:UserTask');
}