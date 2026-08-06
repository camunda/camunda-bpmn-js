/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

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

import colorPickerModule from 'bpmn-js-color-picker';
import elementTemplateChooserModule from '@bpmn-io/element-template-chooser';
import { commonModdleExtensions, commonModules } from './util/commonModules';

import {
  CreateAppendAnythingModule as createAppendAnythingModule,
  CreateAppendElementTemplatesModule as createAppendElementTemplatesModule
} from 'bpmn-js-create-append-anything';

import camundaDetailsPopupMenuModule from './features/popup-menu';
import elementDescriptionsModule from '../base/features/element-descriptions';
import createAppendGroupsModule from '../base/features/create-append-groups';
import createAppendTabsModule from '../base/features/create-append-tabs';
import { BPMN_TAB } from '../base/features/create-append-tabs/tabs';
import { DefaultHandlersModule, ResourcesModule } from './features/external-resources';

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
    popupMenu: {
      defaultTab: BPMN_TAB,
      ...options.popupMenu
    },
    propertiesPanel: {
      tooltip: ZeebeTooltipProvider,
      getFeelPopupLinks: (type) => {
        if (type === 'feel') {
          return [
            {
              title: 'Learn FEEL expressions',
              href: 'https://docs.camunda.io/docs/components/modeler/feel/what-is-feel/'
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
  camundaDetailsPopupMenuModule,
  elementDescriptionsModule,
  createAppendGroupsModule,
  createAppendTabsModule,
  DefaultHandlersModule,
  ResourcesModule
];

Modeler.prototype._modules = [].concat(
  BaseModeler.prototype._modules,
  Modeler.prototype._camundaCloudModules
);
