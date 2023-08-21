/* eslint-env node */

/**
 * Generates all possible combinations of the items in the given arrays.
 *
 * @param {...Array} - arrays with options to combine
 * @returns {Array<Array>} array with all posible combinations of items
 */
export function getAllCombinations() {
  const [ first, ...rest ] = arguments;

  if (!first) {
    return;
  }

  const combinations = getAllCombinations(...rest);

  return first.reduce((acc, cur) => {

    const newCombination = combinations ? combinations.map(combination => [ cur, ...combination ]) : [ [ cur ] ];

    return acc.concat(
      newCombination
    );
  }, []);
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toKebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}