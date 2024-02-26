import inherits from 'inherits-browser';

import BaseModeler from '../base/Modeler';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-platform';

import {
  CamundaPlatformPropertiesProviderModule,
  CamundaPlatformTooltipProvider
} from 'bpmn-js-properties-panel';

import {
  ElementTemplatesPropertiesProviderModule
} from 'bpmn-js-element-templates';

import {
  CamundaVariableResolverModule as variableResolverModule
} from '@bpmn-io/variable-resolver';

import { commonModdleExtensions } from './util/commonModules';

import colorPickerModule from 'bpmn-js-color-picker';

import {
  CreateAppendAnythingModule as createAppendAnythingModule,
  RemoveTemplatesModule as removeTemplatesModule
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
      tooltip: CamundaPlatformTooltipProvider,
      ...options.propertiesPanel
    }
  };

  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype._camundaPlatformModules = [
  behaviorsModule,
  CamundaPlatformPropertiesProviderModule,
  ElementTemplatesPropertiesProviderModule,
  colorPickerModule,
  createAppendAnythingModule,
  variableResolverModule,
  removeTemplatesModule
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaPlatformModules
);
