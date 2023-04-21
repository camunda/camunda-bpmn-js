import iconRendererModule from '@bpmn-io/element-templates-icons-renderer';

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