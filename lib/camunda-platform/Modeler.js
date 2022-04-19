import inherits from 'inherits';

import BaseModeler from '../base/Modeler';

import behaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-platform';

import camundaModdleExtension from 'camunda-bpmn-moddle/lib';

import {
  CamundaPlatformPropertiesProviderModule,
  ElementTemplatesPropertiesProviderModule
} from 'bpmn-js-properties-panel';

import { commonModdleExtensions } from './util/commonModules';


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
  camundaModdleExtension,
  behaviorsModule,
  CamundaPlatformPropertiesProviderModule,
  ElementTemplatesPropertiesProviderModule
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaPlatformModules
);
