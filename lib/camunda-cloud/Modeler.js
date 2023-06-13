import inherits from 'inherits-browser';

import BaseModeler from '../base/Modeler';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';

import rulesModule from './features/rules';

import {
  ZeebePropertiesProviderModule as zeebePropertiesProviderModule,
  ZeebeDescriptionProvider
} from 'bpmn-js-properties-panel';

import {
  CloudElementTemplatesPropertiesProviderModule as cloudElementTemplatesPropertiesProvider
} from 'bpmn-js-element-templates';

import {
  ZeebeVariableResolverModule as variableResolverModule
} from '@bpmn-io/variable-resolver';

import exampleDataPropertiesProviderModule from '@camunda/example-data-properties-provider';

import colorPickerModule from 'bpmn-js-color-picker';
import elementTemplateChooserModule from '@bpmn-io/element-template-chooser';
import { commonModdleExtensions, commonModules } from './util/commonModules';

import {
  CreateAppendAnythingModule as createAppendAnythingModule,
  CreateAppendElementTemplatesModule as createAppendElementTemplatesModule
} from 'bpmn-js-create-append-anything';

/**
 * @typedef {import('bpmn-js/lib/BaseViewer').BaseViewerOptions} BaseViewerOptions
 */

/**
 * @param {BaseViewerOptions} options
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
    },
  };

  this._addElementTemplateChooserModule(options);

  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype._addElementTemplateChooserModule = function(options) {
  const { elementTemplateChooser } = options;

  if (elementTemplateChooser !== false) {
    this._modules = [ ...this._modules, elementTemplateChooserModule ];
  }
};

Modeler.prototype._camundaCloudModules = [
  ...commonModules,
  behaviorsModule,
  rulesModule,
  zeebePropertiesProviderModule,
  cloudElementTemplatesPropertiesProvider,
  createAppendAnythingModule,
  createAppendElementTemplatesModule,
  colorPickerModule,
  variableResolverModule,
  exampleDataPropertiesProviderModule
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaCloudModules
);
