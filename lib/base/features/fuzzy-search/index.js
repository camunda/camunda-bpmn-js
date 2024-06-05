import FuzzySearchProvider from './FuzzySearchProvider';
import FuzzySearchPopupMenuProvider from './FuzzySearchPopupMenuProvider';

export default {
  __init__: [ 'bpmnSearch', 'fuzzySearchPopupMenuProvider' ],
  bpmnSearch: [ 'type', FuzzySearchProvider ],
  fuzzySearchPopupMenuProvider: [ 'type', FuzzySearchPopupMenuProvider ]
};