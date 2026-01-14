/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

export class ResourceLoader {
  static $inject = [ 'eventBus', 'resources' ];

  constructor(eventBus, resources) {
    this._resources = resources;
    this._providers = [];

    eventBus.on('diagram.init', () => {
      this.reload();
    });
  }

  register(resourceProvider) {
    this._providers.push(resourceProvider);
  }

  reload() {
    const combined = this._providers.reduce((resources, provider) => {
      return resources.concat(provider.getResources());
    }, []);

    this._resources.set(combined);
  }
}
