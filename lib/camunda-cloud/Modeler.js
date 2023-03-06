import inherits from 'inherits-browser';

import BaseModeler from '../base/Modeler';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';

import rulesModule from './features/rules';

import {
  ZeebePropertiesProviderModule as zeebePropertiesProviderModule,
  CloudElementTemplatesPropertiesProviderModule as cloudElementTemplatesPropertiesProvider,
  ZeebeDescriptionProvider
} from 'bpmn-js-properties-panel';

import {
  ZeebeVariableResolverModule as variableResolverModule
} from '@bpmn-io/variable-resolver';

import replaceModule from './features/replace';
import sharedReplaceModule from '../shared/features/replace';
import colorPickerModule from 'bpmn-js-color-picker';
import createAppendElementTemplatesModule from './features/create-append-anything';

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


  }
};

Modeler.prototype._camundaCloudModules = [
  ...commonModules,
  behaviorsModule,
  rulesModule,
  zeebePropertiesProviderModule,
  cloudElementTemplatesPropertiesProvider,
  createAppendElementTemplatesModule,
  replaceModule,
  sharedReplaceModule,
  colorPickerModule,
  variableResolverModule
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaCloudModules
);
