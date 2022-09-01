import inherits from 'inherits';

import BaseModeler from '../base/Modeler';

import disableCollapsedSubprocessModule from 'bpmn-js-disable-collapsed-subprocess';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';

import paletteModule from './features/palette';

import contextPadModule from './features/context-pad';

import popupMenuModule from './features/popup-menu';

import rulesModule from './features/rules';

import {
  ZeebePropertiesProviderModule as zeebePropertiesProviderModule,
  CloudElementTemplatesPropertiesProviderModule as cloudElementTemplatesPropertiesProvider,
  ZeebeDescriptionProvider
} from 'bpmn-js-properties-panel';


import { commonModdleExtensions, commonModules } from './util/commonModules';


/**
 *
 * @param {Object} options
 */
export default function Modeler(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      ...commonModdleExtensions,
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
  ...commonModules,
  behaviorsModule,
  contextPadModule,
  paletteModule,
  popupMenuModule,
  rulesModule,
  disableCollapsedSubprocessModule,
  zeebePropertiesProviderModule,
  cloudElementTemplatesPropertiesProvider
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaCloudModules
);
