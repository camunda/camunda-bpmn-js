import iconRendererModule from '@bpmn-io/element-templates-icons-renderer';

import drilldownModule from '../features/drilldown';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

export const commonModules = [
  drilldownModule,
  iconRendererModule
];

export const commonModdleExtensions = {
  zeebe: zeebeModdle
};