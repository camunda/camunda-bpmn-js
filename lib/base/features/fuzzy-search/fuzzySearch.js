import Fuse from 'fuse.js/basic';

/**
 * @typedef { {
*   index: number;
*   match: boolean;
*   value: string;
* } } Token
*
* @typedef {Token[]} Tokens
*/

/**
* @template R
*
* @typedef { {
*   item: R,
*   tokens: Record<string, Tokens>
* } } SearchResult
*/

/**
 * Search items using fuzzy search.
 *
 * @template T
 *
 * @param {T[]} items
 * @param {string} pattern
 * @param { {
*   keys: string[];
* } } options
*
* @returns {SearchResult<T>[]}
*/
export default function fuzzySearch(items, pattern, options) {
  const fuse = new Fuse(items, {
    includeScore: true,
    ignoreLocation: true,
    includeMatches: true,
    threshold: 0.25,
    keys: options.keys
  });

  const result = fuse.search(pattern);

  console.log(result);

  return result.map(({ item, matches }) => {
    let tokens = {};

    for (const key of options.keys) {

      if (item[key] && item[key].length) {
        tokens = {
          ...tokens,
          [key]: matchesToTokens(matches, key, item[key])
        };
      } else {
        tokens = {
          ...tokens,
          [key]: []
        };
      }
    }

    return {
      item,
      tokens
    };
  });
};

function matchesToTokens(matches, key, value) {
  const match = matches.find((match) => match.key === key);

  if (!match) {
    return [
      {
        index: 0,
        value
      }
    ];
  }

  const { indices } = match;

  const tokensMatch = indices.map(([ start, end ]) => {
    return {
      index: start,
      match: true,
      value: match.value.slice(start, end + 1)
    };
  });

  const tokens = [];

  let lastIndex = 0;

  tokensMatch.forEach((token, index) => {
    if (token.index !== lastIndex) {
      tokens.push({
        index: lastIndex,
        value: match.value.slice(lastIndex, token.index)
      });
    }

    tokens.push(token);

    lastIndex = token.index + token.value.length;

    if (index === tokensMatch.length - 1 && lastIndex !== match.value.length) {
      tokens.push({
        index: lastIndex,
        value: match.value.slice(lastIndex)
      });
    }
  });

  return tokens;
}