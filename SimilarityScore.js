/**
 * This function compares two JSON Objects and return a score between 0 - 1.
 * I have taken few assumptions.
 *
 * For example: An object has 5 key value pairs.
 * Then each key value pair contributes 20% in the whole object.
 *
 * Currently I implemented only single level comparison.
 * But this function can be extended for deeply nested objects as well.
 *
 * @param {Object} first
 * @param {Object} second
 */

export default function similarityScore(first = {}, second = {}) {
  // Best case: Check whether both objects as strings are equal or not.
  if (JSON.stringify(first) === JSON.stringify(second)) return 1;

  if (
    (Array.isArray(first) && !Array.isArray(second)) ||
    (!Array.isArray(first) && Array.isArray(second))
  )
    return 0;

  // Check whether either of the objects are null or undefined.
  if ((!first && second) || (first && !second)) return 0;

  const keysInFirst = Object.keys(first);
  const lengthOfFirst = keysInFirst.length;

  const keysInSecond = Object.keys(second);
  const lengthOfSecond = keysInSecond.length;

  // Primary Items - basis of our comparison
  let primaryJsonKeys = keysInFirst;
  let primaryJsonLength = lengthOfFirst;
  let primaryJson = first;

  let secondaryJsonKeys = keysInSecond;
  let secondaryJsonLength = lengthOfSecond;
  let secondaryJson = second;

  // If second object has more keys than first
  if (lengthOfSecond > lengthOfFirst) {
    primaryJsonKeys = keysInSecond;
    primaryJsonLength = lengthOfSecond;
    primaryJson = second;

    secondaryJsonKeys = keysInFirst;
    secondaryJsonLength = lengthOfFirst;
    secondaryJson = second;
  }

  const numberOfPercentageForEachItem = 100 / (primaryJsonLength * 2);

  let i = 0;

  let totalScoreInPercentage = 0;

  while (i < primaryJsonLength) {
    if (secondaryJson[primaryJsonKeys[i]]) {
      totalScoreInPercentage += numberOfPercentageForEachItem;

      if (
        primaryJson[primaryJsonKeys[i]] === secondaryJson[primaryJsonKeys[i]]
      ) {
        totalScoreInPercentage += numberOfPercentageForEachItem;
      }
    }

    i++;
  }

  return totalScoreInPercentage / 100;
}
