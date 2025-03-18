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
