import Fuse from 'fuse.js/basic';

import {
  getLabel,
  isLabel
} from 'bpmn-js/lib/util/LabelUtil';

const options = {
  includeScore: true,
  ignoreLocation: true,
  includeMatches: true,
  threshold: 0.25,
  keys: [
    {
      name: 'label',
      weight: 2
    },
    'id'
  ]
};

export default function BpmnSearchProvider(canvas, elementRegistry, searchPad) {
  this._canvas = canvas;
  this._elementRegistry = elementRegistry;

  searchPad.registerProvider(this);
}

BpmnSearchProvider.$inject = [
  'canvas',
  'elementRegistry',
  'searchPad'
];

/**
 * @param {string} pattern
 *
 * @return {SearchResult[]}
 */
BpmnSearchProvider.prototype.find = function(pattern) {
  var rootElements = this._canvas.getRootElements();

  var elements = this._elementRegistry
    .filter(function(element) {
      return !isLabel(element) && !rootElements.includes(element);
    })
    .map(function(element) {
      return {
        element,
        id: element.id,
        label: getLabel(element)
      };
    });

  const fuse = new Fuse(elements, options);

  const result = fuse.search(pattern);

  return result.map(({ item }) => {
    const { element } = item;

    return {
      element,
      primaryTokens: highlightSubstring(getLabel(element), pattern),
      secondaryTokens: highlightSubstring(element.id, pattern)
    };
  });
};

function highlightSubstring(string, substring) {
  if (!substring.length) return [ { normal: string } ];

  const occurances = findAllSubstringOccurrences(string, substring);

  if (!occurances.length) return [ { normal: string } ];

  let lastIndexEnd = 0;

  const tokens = [];

  occurances.forEach((start, index) => {
    const end = start + substring.length;

    if (start !== 0) {
      tokens.push({
        normal: string.slice(lastIndexEnd, start)
      });
    }

    tokens.push({
      matched: string.slice(start, end)
    });

    if (index === occurances.length - 1 && end !== string.length - 1) {
      tokens.push({
        normal: string.slice(end)
      });
    }

    lastIndexEnd = end;
  });

  return tokens;
}

function findAllSubstringOccurrences(string, subString) {
  let indices = [];
  let startIndex = 0;
  let index;

  while (
    (index = string
      .toLowerCase()
      .indexOf(subString.toLowerCase(), startIndex)) > -1
  ) {
    indices.push(index);

    startIndex = index + 1;
  }

  return indices;
}