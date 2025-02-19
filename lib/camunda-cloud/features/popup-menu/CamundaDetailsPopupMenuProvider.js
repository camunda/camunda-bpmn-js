/**
 * @typedef { import('diagram-js/lib/features/popup-menu/PopupMenu').default } PopupMenu
 * @typedef { import('diagram-js/lib/model').Element } Element
 * @typedef { import('diagram-js/lib/features/popup-menu/PopupMenuProvider').PopupMenuEntries } PopupMenuEntries
 */

import { reduce } from 'min-dash';

const LOW_PRIORITY = 250;

const ANNOTATIONS = [
  {
    entries: [
      'replace-with-call-activity',
      'append-call-activity',
      'create-call-activity'
    ],
    search: 'child process'
  },
  {
    entries: [
      'replace-with-receive-task',
      'append-receive-task',
      'create-receive-task'
    ],
    search: 'message'
  },
  {
    entries: [
      'replace-with-rule-task',
      'append-rule-task',
      'create-rule-task'
    ],
    search: 'dmn decision'
  },
  {
    entries: [
      'replace-with-service-task',
      'append-service-task',
      'create-service-task',
      'replace-with-script-task',
      'append-script-task',
      'create-script-task',
      'replace-with-send-task',
      'append-send-task',
      'create-send-task',
      'replace-with-message-intermediate-throw',
      'append-message-intermediate-throw',
      'create-message-intermediate-throw',
      'replace-with-message-end',
      'append-message-end',
      'create-message-end'
    ],
    search: 'job worker'
  },
  {
    entries: [
      'replace-with-user-task',
      'append-user-task',
      'create-user-task'
    ],
    search: 'form human'
  }
];

const ANNOTATIONS_KEYED = reduce(ANNOTATIONS, (annotationsKeyed, annotation) => {

  const { entries, search } = annotation;

  for (const entry of entries) {
    if (annotationsKeyed[entry]) {
      annotationsKeyed[entry].search += ' ' + search;
    } else {
      annotationsKeyed[entry] = { search };
    }
  }

  return annotationsKeyed;
}, {});


/**
 * @param { PopupMenu } popupMenu
 *
 * @implements PopupMenuProvider
 */
export default function CamundaDetailsPopupMenuProvider(popupMenu) {

  this._popupMenu = popupMenu;

  this.register();
}

CamundaDetailsPopupMenuProvider.$inject = [ 'popupMenu' ];


/**
 * Register create menu provider in the popup menu
 */
CamundaDetailsPopupMenuProvider.prototype.register = function() {

  // plug-into create-append-anything <create> menu
  this._popupMenu.registerProvider('bpmn-create', LOW_PRIORITY, this);

  // plug-into create-append-anything <append> menu
  this._popupMenu.registerProvider('bpmn-append', LOW_PRIORITY, this);

  // plug-into <replace> menu
  this._popupMenu.registerProvider('bpmn-replace', LOW_PRIORITY, this);
};


/**
 * Returns the create options as menu entries
 *
 * @param { Element } _element
 */
CamundaDetailsPopupMenuProvider.prototype.getPopupMenuEntries = function(_element) {

  /**
   * @param { PopupMenuEntries } existingEntries
   *
   * @return { PopupMenuEntries }
   */
  return (existingEntries) => {

    return Object.entries(existingEntries).reduce((entries, [ name, entry ]) => {

      entries[name] = this._annotateEntry(name, entry);

      return entries;
    }, { });
  };

};

CamundaDetailsPopupMenuProvider.prototype._annotateEntry = function(name, entry) {

  const annotation = ANNOTATIONS_KEYED[name];

  if (annotation) {
    return {
      ...entry,
      search: entry.search ? `${ entry.search } ${ annotation.search }` : annotation.search
    };
  }

  return entry;
};