import inherits from 'inherits';

import BaseModeler from '../base/Modeler';

import modelingModule from './features/modeling';

import paletteModule from './features/palette';

import contextPadModule from './features/context-pad';

import popupMenuModule from './features/popup-menu';

import rulesModule from './features/rules';

import propertiesProviderModule from './features/properties-provider';

import zeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';

import zeebeModdleExtension from 'zeebe-bpmn-moddle/lib';

import disableUserTasksModule from './features/disable-user-tasks';


/**
 *
 * @param {Object} options
 */
export default function Modeler(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      zeebe: zeebeModdle,
      ...options.moddleExtensions
    }
  };

  /**
   * @pinussilvestrus: Disable Zeebe User Task support until the Engine is supporting it
   * Cf. https://github.com/camunda/camunda-modeler/issues/2140
   */
  if (!options.enableZeebeUserTasks) {
    this._modules = [
      ...this._modules,
      disableUserTasksModule
    ];
  }

  BaseModeler.call(this, options);
}

inherits(Modeler, BaseModeler);

Modeler.prototype._camundaCloudModules = [
  modelingModule,
  contextPadModule,
  paletteModule,
  popupMenuModule,
  rulesModule,
  propertiesProviderModule,
  zeebeModdleExtension
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaCloudModules
);