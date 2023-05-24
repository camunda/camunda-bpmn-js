import iconRendererModule from '@bpmn-io/element-template-icon-renderer';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

export const commonModules = [
  iconRendererModule
];

/**
 * @type { {
 *   zeebe: any
 * } }
 */
export const commonModdleExtensions = {
  zeebe: zeebeModdle
};