export * from 'bpmn-js/test/helper';

import {
  insertCSS
} from 'bpmn-js/test/helper';

insertCSS(
  'diagram.css',
  require('bpmn-js/dist/assets/diagram-js.css').default
);

insertCSS(
  'bpmn-font.css',
  require('bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css').default
);