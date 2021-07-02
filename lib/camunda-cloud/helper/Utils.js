import Ids from 'ids';

/**
 * generate a semantic id with given prefix
 */
export function nextId(prefix) {
  const ids = new Ids([32,32,1]);

  return ids.nextPrefixed(prefix);
}
