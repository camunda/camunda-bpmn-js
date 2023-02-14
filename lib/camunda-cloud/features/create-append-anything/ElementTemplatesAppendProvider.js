import { assign } from 'min-dash';


/**
 * A popup menu provider that allows to append elements with
 * element templates.
 */
export default function ElementTemplatesAppendProvider(
    popupMenu, translate, elementTemplates,
    autoPlace, create, mouse, rules) {

  this._popupMenu = popupMenu;
  this._translate = translate;
  this._elementTemplates = elementTemplates;
  this._autoPlace = autoPlace;
  this._create = create;
  this._mouse = mouse;
  this._rules = rules;

  this.register();
}

ElementTemplatesAppendProvider.$inject = [
  'popupMenu',
  'translate',
  'elementTemplates',
  'autoPlace',
  'create',
  'move',
  'rules'
];

/**
 * Register append menu provider in the popup menu
 */
ElementTemplatesAppendProvider.prototype.register = function() {
  this._popupMenu.registerProvider('bpmn-append', this);
};

/**
 * Adds the element templates to the append menu.
 * @param {djs.model.Base} element
 *
 * @returns {Object}
 */
ElementTemplatesAppendProvider.prototype.getPopupMenuEntries = function(element) {
  return (entries) => {

    if (!this._rules.allowed('shape.append', { element: element })) {
      return [];
    }

    const filteredTemplates = this._filterTemplates(this._elementTemplates.getLatest());

    // add template entries
    assign(entries, this.getTemplateEntries(element, filteredTemplates));

    return entries;
  };
};

/**
 * Get all element templates.
 *
 * @param {djs.model.Base} element
 *
 * @return {Object} element templates as menu entries
 */
ElementTemplatesAppendProvider.prototype.getTemplateEntries = function(element, templates) {

  const templateEntries = {};

  templates.map(template => {

    const {
      icon = {},
      category,
    } = template;

    const entryId = `append.template-${template.id}`;

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
      action: this._getEntryAction(element, template)
    };
  });

  return templateEntries;
};

/**
 * Filter out templates from the options.
 *
 * @param {Array<Object>} templates
 *
 * @returns {Array<Object>}
 */
ElementTemplatesAppendProvider.prototype._filterTemplates = function(templates) {
  return templates.filter(template => {
    const {
      appliesTo,
      elementType
    } = template;

    const type = (elementType && elementType.value) || appliesTo[0];

    // elements that can not be appended
    if ([
      'bpmn:StartEvent',
      'bpmn:Participant'
    ].includes(type)) {
      return false;
    }

    // sequence flow templates are supported
    // but connections are not appendable
    if ('bpmn:SequenceFlow' === type) {
      return false;
    }

    return true;
  });
};

/**
 * Create an action for a given template.
 *
 * @param {djs.model.Base} element
 * @param {Object} template
 *
 * @returns {Object}
 */
ElementTemplatesAppendProvider.prototype._getEntryAction = function(element, template) {
  return {

    click: () => {
      const newElement = this._elementTemplates.createElement(template);
      this._autoPlace.append(element, newElement);
    },

    dragstart: (event) => {
      const newElement = this._elementTemplates.createElement(template);

      if (event instanceof KeyboardEvent) {
        event = this._mouse.getLastMoveEvent();
      }

      this._create.start(event, newElement, {
        source: element
      });
    }
  };
};
