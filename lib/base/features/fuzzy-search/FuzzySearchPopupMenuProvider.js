import Fuse from 'fuse.js/basic';

const options = {
  includeScore: true,
  ignoreLocation: true,
  includeMatches: true,
  threshold: 0.25,
  keys: [
    {
      name: 'label',
      weight: 3
    },
    {
      name: 'description',
      weight: 2
    },
    'search'
  ]
};

export default class FuzzySearchPopupMenuProvider {
  constructor(popupMenu) {
    popupMenu.registerProvider('bpmn-append', this);
    popupMenu.registerProvider('bpmn-create', this);
    popupMenu.registerProvider('bpmn-replace', this);
  }

  getPopupMenuEntries() {
    return {};
  }

  findPopupMenuEntries(entries, pattern) {
    const fuse = new Fuse(entries, options);

    const result = fuse.search(pattern);

    return result.map(({ item }) => item);
  }
}