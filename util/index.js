/**
 * Generates all possible combinations of the items in the given arrays.
 *
 * @param {...Array} - arrays with options to combine
 * @returns {Array<Array>} array with all posible combinations of items
 */
function getAllCombinations() {
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

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toKebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}


module.exports = {
  getAllCombinations,
  capitalize,
  toKebabCase
};
