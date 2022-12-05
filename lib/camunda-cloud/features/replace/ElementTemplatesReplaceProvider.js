import {
  isDifferentType
} from 'bpmn-js/lib/features/popup-menu/util/TypeUtil';

import {
  getBusinessObject,
  isAny
} from 'bpmn-js/lib/util/ModelUtil';

import {
  getReplaceOptionGroups
} from './ReplaceOptionsUtil';

/**
 * A replace menu provider that allows to replace elements with
 * element templates.
 */
export default function ElementTemplatesReplaceProvider(config, popupMenu, translate, elementTemplates) {

  this._popupMenu = popupMenu;
  this._translate = translate;
  this._elementTemplates = elementTemplates;
  this._config = config;

  if (this._replaceWithTemplates()) {
    this.register();
  }
}

ElementTemplatesReplaceProvider.$inject = [
  'config.elementTemplatesReplaceProvider',
  'popupMenu',
  'translate',
  'elementTemplates'
];

/**
 * Register replace menu provider in the popup menu
 */
ElementTemplatesReplaceProvider.prototype.register = function() {
  this._popupMenu.registerProvider('bpmn-replace', this);
};

/**
 * Adds the element templates to the replace menu.
 * @param {djs.model.Base} element
 *
 * @returns {Object}
 */
ElementTemplatesReplaceProvider.prototype.getPopupMenuEntries = function(element) {

  return (entries) => {

    // convert our entries into something sortable
    let entrySet = Object.entries(entries);

    // add unlink template option
    this._addPlainElementEntry(element, entrySet);

    // add template entries
    entrySet = [ ...entrySet, ...this.getTemplateEntries(element) ];

    // convert back to object
    return entrySet.reduce((entries, [ key, value ]) => {
      entries[key] = value;

      return entries;
    }, {});
  };
};

/**
 * Adds the option to replace with plain element (unlink template).
 *
 * @param {djs.model.Base} element
 * @param {Array<Object>} entries
 */
ElementTemplatesReplaceProvider.prototype._addPlainElementEntry = function(element, entries) {

  const replaceOption = this._getPlainEntry(element, entries);

  const [
    insertIndex,
    entry
  ] = replaceOption;

  // insert unlink entry
  entries.splice(insertIndex, 0, [ entry.id, entry ]);
};

/**
 * Returns the option to replace with plain element and the index where it should be inserted.
 *
 * @param {djs.model.Base} element
 * @param {Array<Object>} entries
 *
 * @returns {Array<Object, number>}
 */
ElementTemplatesReplaceProvider.prototype._getPlainEntry = function(element, entries) {

  const {
    options,
    option,
    optionIndex
  } = findReplaceOptions(element) || { };

  if (!options) {
    return;
  }

  const entry = {
    id: option.actionName,
    action: () => {
      this._elementTemplates.applyTemplate(element, null);
    },
    label: this._translate(option.label),
    className: option.className
  };

  // insert after previous option, if it exists
  const previousIndex = getOptionIndex(options, optionIndex - 1, entries);

  if (previousIndex) {
    return [
      previousIndex + 1,
      entry
    ];
  }

  // insert before next option, if it exists
  const nextIndex = getOptionIndex(options, optionIndex + 1, entries);

  if (nextIndex) {
    return [
      nextIndex,
      entry
    ];
  }

  // fallback to insert at start
  return [
    0,
    entry
  ];
};

/**
 * Get all element templates that can be used to replace the given element.
 *
 * @param {djs.model.Base} element
 *
 * @return {Array<Object>} a list of element templates as menu entries
 */
ElementTemplatesReplaceProvider.prototype.getTemplateEntries = function(element) {

  const templates = this._getMatchingTemplates(element);
  return templates.map(template => {

    const {
      icon = {},
      category,
    } = template;

    const entryId = `replace-with-template-${template.id}`;

    const defaultGroup = {
      id: 'templates',
      name: this._translate('Templates')
    };

    return [ entryId, {
      name: template.name,
      description: template.description,
      documentationRef: template.documentationRef,
      imageUrl: icon.contents,
      group: category || defaultGroup,
      action: () => {
        this._elementTemplates.applyTemplate(element, template);
      }
    } ];
  });
};

/**
 * Returns the templates that can the element can be replaced with.
 *
 * @param  {djs.model.Base} element
 *
 * @return {Array<ElementTemplate>}
 */
ElementTemplatesReplaceProvider.prototype._getMatchingTemplates = function(element) {
  return this._elementTemplates.getLatest().filter(template => {
    return isAny(element, template.appliesTo) && !isTemplateApplied(element, template);
  });
};

/**
 * Returns true if this feature is enabled in config, false otherwise.
 *
 * @returns {boolean}
 */
ElementTemplatesReplaceProvider.prototype._replaceWithTemplates = function() {
  return this._config && this._config.replaceWithTemplates || false;
};


// helpers ////////////
export function isTemplateApplied(element, template) {
  const businessObject = getBusinessObject(element);

  if (businessObject) {
    return businessObject.get('zeebe:modelerTemplate') === template.id;
  }

  return false;
}

function getOptionIndex(options, index, entries) {
  const option = options[index];

  if (!option) {
    return false;
  }

  return entries.findIndex(
    ([ key ]) => key === option.actionName
  );
}

/**
 * @param {ModdleElement} element
 *
 * @return { { options: Array<any>, option: any, optionIndex: number } | null }
 */
function findReplaceOptions(element) {

  const isSameType = (element, option) => option.target && !isDifferentType(element)(option);

  return getReplaceOptionGroups().reduce((result, options) => {

    if (result) {
      return result;
    }

    const optionIndex = options.findIndex(option => isSameType(element, option));

    if (optionIndex === -1) {
      return;
    }

    return {
      options,
      option: options[optionIndex],
      optionIndex
    };
  }, null);
}