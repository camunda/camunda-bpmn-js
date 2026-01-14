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

import BaseViewer from '../base/NavigatedViewer';

import { commonModdleExtensions } from './util/commonModules';

/**
 * @typedef {import('bpmn-js/lib/BaseViewer').BaseViewerOptions} BaseViewerOptions
 */

/**
 * @param {BaseViewerOptions} options
 */
export default function NavigatedViewer(options = {}) {

  options = {
    ...options,
    moddleExtensions: {
      ...commonModdleExtensions,
      ...options.moddleExtensions
    }
  };

  BaseViewer.call(this, options);
}

inherits(NavigatedViewer, BaseViewer);
