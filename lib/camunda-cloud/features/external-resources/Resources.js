export class Resources {
  static $inject = [ 'config.resources' ];

  constructor(resources) {
    this._resources = resources || [];
  }

  set(resources) {
    this._resources = resources;
  }

  getAll() {
    return this._resources;
  }

  filter(fn) {
    return this._resources.filter(fn);
  }
}
