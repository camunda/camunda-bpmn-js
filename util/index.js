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

  var combinations = getAllCombinations(...rest);

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

module.exports = {
  getAllCombinations,
  capitalize
};
