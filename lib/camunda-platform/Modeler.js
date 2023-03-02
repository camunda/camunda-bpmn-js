import inherits from 'inherits-browser';

import BaseModeler from '../base/Modeler';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-platform';

import {
  CamundaPlatformPropertiesProviderModule,
  ElementTemplatesPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import {
  CamundaVariableResolverModule as variableResolverModule
} from '@bpmn-io/variable-resolver';

import { commonModdleExtensions } from './util/commonModules';

import sharedReplaceModule from '../shared/features/replace';
import colorPickerModule from 'bpmn-js-color-picker';


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
    }
  };

  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype._camundaPlatformModules = [
  behaviorsModule,
  CamundaPlatformPropertiesProviderModule,
  ElementTemplatesPropertiesProviderModule,
  sharedReplaceModule,
  colorPickerModule,
  variableResolverModule
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaPlatformModules
);
