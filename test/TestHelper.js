export * from 'bpmn-js/test/helper';

import {
  bootstrapBpmnJS,
  insertCSS
} from 'bpmn-js/test/helper';

import Modeler from '../lib/Modeler';

insertCSS(
  'diagram.css',
  require('bpmn-js/dist/assets/diagram-js.css').default
);

insertCSS(
  'bpmn-font.css',
  require('bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css').default
);

export function bootstrapZeebeModeler(diagram, options, locals) {
  return bootstrapBpmnJS(Modeler, diagram, options, locals);
}