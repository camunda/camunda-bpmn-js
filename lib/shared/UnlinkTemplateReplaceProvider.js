import { isDifferentType } from 'bpmn-js/lib/features/popup-menu/util/TypeUtil';
import { getReplaceOptionGroups } from './util/ReplaceOptionsUtil';

/**
 * A replace menu provider that allows to replace elements with
 * templates applied with the correspondent plain element.
 */
export default function UnlinkTemplateReplaceProvider(popupMenu, translate, elementTemplates) {

  this._popupMenu = popupMenu;
  this._translate = translate;
  this._elementTemplates = elementTemplates;

  this.register();
}

UnlinkTemplateReplaceProvider.$inject = [
  'popupMenu',
  'translate',
  'elementTemplates'
];

/**
 * Register replace menu provider in the popup menu
 */
UnlinkTemplateReplaceProvider.prototype.register = function() {
  this._popupMenu.registerProvider('bpmn-replace', this);
};

/**
 * Adds the element templates to the replace menu.
 * @param {djs.model.Base} element
 *
 * @returns {Object}
 */
UnlinkTemplateReplaceProvider.prototype.getPopupMenuEntries = function(element) {

  return (entries) => {

    // convert our entries into something sortable
    let entrySet = Object.entries(entries);

    if (this._elementTemplates.get(element)) {

      // add unlink template option
      this.addPlainElementEntry(element, entrySet, this._translate, this._elementTemplates);
    }

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
UnlinkTemplateReplaceProvider.prototype.addPlainElementEntry = function(element, entries, translate, elementTemplates) {

  const replaceOption = this.getPlainEntry(element, entries, translate, elementTemplates);

  if (!replaceOption) {
    return;
  }

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
UnlinkTemplateReplaceProvider.prototype.getPlainEntry = function(element, entries, translate, elementTemplates) {

  const {
    options,
    option,
    optionIndex
  } = findReplaceOptions(element) || { };

  if (!options) {
    return null;
  }

  const entry = {
    id: 'replace-unlink-element-template',
    action: () => {
      elementTemplates.applyTemplate(element, null);
    },
    label: translate(option.label),
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

function getOptionIndex(options, index, entries) {
  const option = options[index];

  if (!option) {
    return false;
  }

  return entries.findIndex(
    ([ key ]) => key === option.actionName
  );
}
