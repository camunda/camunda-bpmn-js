import inherits from 'inherits';

import BaseModeler from '../base/Modeler';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-platform';

import {
  CamundaPlatformPropertiesProviderModule,
  ElementTemplatesPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import { commonModdleExtensions } from './util/commonModules';

import sharedModules from '../shared';

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
  sharedModules
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaPlatformModules
);
