import inherits from 'inherits-browser';

import BaseModeler from '../base/Modeler';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud';

import {
  ZeebePropertiesProviderModule as zeebePropertiesProviderModule,
  ZeebeTooltipProvider
} from 'bpmn-js-properties-panel';

import {
  CloudElementTemplatesPropertiesProviderModule as cloudElementTemplatesPropertiesProvider
} from 'bpmn-js-element-templates';

import {
  ZeebeVariableResolverModule as variableResolverModule
} from '@bpmn-io/variable-resolver';

import exampleDataPropertiesProviderModule from '@camunda/example-data-properties-provider';
import formVariableProviderModule from '@bpmn-io/form-variable-provider';

import colorPickerModule from 'bpmn-js-color-picker';
import elementTemplateChooserModule from '@bpmn-io/element-template-chooser';
import { commonModdleExtensions, commonModules } from './util/commonModules';

import {
  CreateAppendAnythingModule as createAppendAnythingModule,
  CreateAppendElementTemplatesModule as createAppendElementTemplatesModule
} from 'bpmn-js-create-append-anything';

import camundaDetailsPopupMenuModule from './features/popup-menu';

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
      tooltip: ZeebeTooltipProvider,
      getFeelPopupLinks: (type) => {
        if (type === 'feel') {
          return [
            {
              title: 'Learn FEEL expressions',
              href: 'https://docs.camunda.io/docs/components/modeler/feel/what-is-feel/'
            },
            {
              title: 'Try FEEL Copilot',
              href: 'https://feel-copilot.camunda.com/'
            }
          ];
        } else if (type === 'feelers') {
          return [
            {
              title: 'Learn templating',
              href: 'https://docs.camunda.io/docs/components/modeler/forms/configuration/forms-config-templating-syntax/'
            }
          ];
        }
      },
      ...options.propertiesPanel
    }
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
  zeebePropertiesProviderModule,
  cloudElementTemplatesPropertiesProvider,
  createAppendAnythingModule,
  createAppendElementTemplatesModule,
  colorPickerModule,
  variableResolverModule,
  exampleDataPropertiesProviderModule,
  formVariableProviderModule,
  camundaDetailsPopupMenuModule
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaCloudModules
);
