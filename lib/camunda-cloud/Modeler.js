import inherits from 'inherits-browser';

import BaseModeler from '../base/Modeler';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';

import rulesModule from './features/rules';

import {
  ZeebePropertiesProviderModule as zeebePropertiesProviderModule,
  CloudElementTemplatesPropertiesProviderModule as cloudElementTemplatesPropertiesProvider,
  ZeebeDescriptionProvider
} from 'bpmn-js-properties-panel';

import replaceModule from './features/replace';
import sharedReplaceModule from '../shared/features/replace';
import colorPickerModule from 'bpmn-js-color-picker';
import createAppendAnythingModule from 'bpmn-js/lib/features/create-append-anything';

import { commonModdleExtensions, commonModules } from './util/commonModules';
import { without } from 'min-dash';


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

  this._removeCreateAppendAnything(options);

  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype._removeCreateAppendAnything = function(options) {
  const { connectorsExtension } = options;

  if (connectorsExtension && connectorsExtension.appendAnything === false) {
    this._modules = without(this._modules, createAppendAnythingModule);
  }
};

Modeler.prototype._camundaCloudModules = [
  ...commonModules,
  behaviorsModule,
  rulesModule,
  zeebePropertiesProviderModule,
  cloudElementTemplatesPropertiesProvider,
  replaceModule,
  sharedReplaceModule,
  colorPickerModule
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaCloudModules
);
