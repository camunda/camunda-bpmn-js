import inherits from 'inherits';

import BaseModeler from '../base/Modeler';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';

import rulesModule from './features/rules';

import {
  ZeebePropertiesProviderModule as zeebePropertiesProviderModule,
  CloudElementTemplatesPropertiesProviderModule as cloudElementTemplatesPropertiesProvider,
  ZeebeDescriptionProvider
} from 'bpmn-js-properties-panel';

import replaceModule from './features/replace';
import sharedModules from '../shared';

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
  rulesModule,
  zeebePropertiesProviderModule,
  cloudElementTemplatesPropertiesProvider,
  replaceModule,
  sharedModules
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaCloudModules
);
