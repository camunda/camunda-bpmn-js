export default function CreateAppendAnythingFeatureToggle(config, contextPad, palette) {
  this._contextPad = contextPad;
  this._palette = palette;

  if (config && config.appendAnything === false) {
    this.register();
  }
}

CreateAppendAnythingFeatureToggle.prototype.register = function() {
  this._contextPad.registerProvider(500,this);
  this._palette.registerProvider(500, this);
};

CreateAppendAnythingFeatureToggle.prototype.getContextPadEntries = function(element) {
  return function(entries) {

    delete entries.append;

    return entries;
  };
};

CreateAppendAnythingFeatureToggle.prototype.getPaletteEntries = function(element) {
  return function(entries) {

    delete entries.create;

    return entries;
  };
};

CreateAppendAnythingFeatureToggle.$inject = [
  'config.connectorsExtension',
  'contextPad',
  'palette'
];
