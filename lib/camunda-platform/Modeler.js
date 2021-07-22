import inherits from 'inherits';

import BaseModeler from '../base/Modeler';

import modelingModule from './features/modeling';

import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';

import camundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';

import camundaModdleExtension from 'camunda-bpmn-moddle/lib';


/**
 *
 * @param {Object} options
 */
export default function Modeler(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      camunda: camundaModdle,
      ...options.moddleExtensions
    }
  };

  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype._camundaPlatformModules = [
  camundaModdleExtension,
  modelingModule,
  propertiesProviderModule
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaPlatformModules
);
