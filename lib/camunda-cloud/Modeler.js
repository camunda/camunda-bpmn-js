import inherits from 'inherits';

import BaseModeler from '../base/Modeler';

import disableCollapsedSubprocessModule from 'bpmn-js-disable-collapsed-subprocess';

import modelingModule from './features/modeling';

import paletteModule from './features/palette';

import contextPadModule from './features/context-pad';

import drilldownModule from './features/drilldown';

import popupMenuModule from './features/popup-menu';

import rulesModule from './features/rules';

import {
  ZeebePropertiesProviderModule as zeebePropertiesProviderModule,
  ZeebeDescriptionProvider
} from 'bpmn-js-properties-panel';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

import zeebeModdleExtension from 'zeebe-bpmn-moddle/lib';


/**
 *
 * @param {Object} options
 */
export default function Modeler(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      zeebe: zeebeModdle,
      ...options.moddleExtensions
    },
    propertiesPanel: {
      description: ZeebeDescriptionProvider,
      ...options.propertiesPanel
    }
  };

  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype._camundaCloudModules = [
  modelingModule,
  contextPadModule,
  disableCollapsedSubprocessModule,
  drilldownModule,
  paletteModule,
  popupMenuModule,
  rulesModule,
  zeebePropertiesProviderModule,
  zeebeModdleExtension
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaCloudModules
);
