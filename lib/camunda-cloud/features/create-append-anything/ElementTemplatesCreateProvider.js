import { assign } from 'min-dash';

/**
 * A popup menu provider that allows to create elements with
 * element templates.
 */
export default function ElementTemplatesCreateProvider(
    popupMenu, translate, elementTemplates,
    mouse, create) {

  this._popupMenu = popupMenu;
  this._translate = translate;
  this._elementTemplates = elementTemplates;
  this._mouse = mouse;
  this._create = create;

  this.register();
}

ElementTemplatesCreateProvider.$inject = [
  'popupMenu',
  'translate',
  'elementTemplates',
  'mouse',
  'create'
];

/**
 * Register create menu provider in the popup menu
 */
ElementTemplatesCreateProvider.prototype.register = function() {
  this._popupMenu.registerProvider('bpmn-create', this);
};

/**
 * Adds the element templates to the create menu.
 * @param {djs.model.Base} element
 *
 * @returns {Object}
 */
ElementTemplatesCreateProvider.prototype.getPopupMenuEntries = function(element) {
  return (entries) => {

    // add template entries
    assign(entries, this.getTemplateEntries(element));

    return entries;
  };
};

/**
 * Get all element templates.
 *
 * @param {djs.model.Base} element
 *
 * @return {Array<Object>} a list of element templates as menu entries
 */
ElementTemplatesCreateProvider.prototype.getTemplateEntries = function() {

  const templates = this._elementTemplates.getLatest();
  const templateEntries = {};

  templates.map(template => {

    const {
      icon = {},
      category,
    } = template;

    const entryId = `create.template-${template.id}`;

    const defaultGroup = {
      id: 'templates',
      name: this._translate('Templates')
    };

    templateEntries[entryId] = {
      label: template.name,
      description: template.description,
      documentationRef: template.documentationRef,
      imageUrl: icon.contents,
      group: category || defaultGroup,
      action: {
        click: this._getEntryAction(template),
        dragstart: this._getEntryAction(template)
      }
    };
  });

  return templateEntries;
};


ElementTemplatesCreateProvider.prototype._getEntryAction = function(template) {
  const create = this._create;
  const popupMenu = this._popupMenu;
  const elementTemplates = this._elementTemplates;
  const mouse = this._mouse;

  return (event) => {

    popupMenu.close();

    // create the new element
    let newElement = elementTemplates.createElement(template);

    // use last mouse event if triggered via keyboard
    if (event instanceof KeyboardEvent) {
      event = mouse.getLastMoveEvent();
    }

    return create.start(event, newElement);
  };
};
