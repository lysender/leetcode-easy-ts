/**
 * Let's say we have a variable called viewCounts which is an array of
 * view counts mapped to days. Then we also have a variable called thresholds
 * which is an array of thresholds which is the cumulative views.
 * Let's say we have viewCounts = [10, 20, 30, 40 50].
 * A threshold of 90 means that the view counts reached that threshold starting
 * from day 0 to day 3 (we use 0-based index for simplicity).
 * Given an array of thresholds = [50, 30, 90, 100],
 * return the earliest day each of the threshold is reached.
 * In this example, it will return: [2, 1, 3, 3].
 * If threshold is not reached, use -1 as index.
 */
export function calcViewCountsThresholdsTriggered(
  viewCounts: number[],
  thresholds: number[],
): number[] {
  if (viewCounts.length === 0 || thresholds.length === 0) {
    return [];
  }

  // Since we are going to sum each day over and over again,
  // why not build an index of summed view counts, then
  // for each threshold, we can just do a binary search
  // on which day threshold is triggered early!
  const prefixSums = buildPrefixSums(viewCounts);
  let result: number[] = [];

  for (const i of thresholds) {
    result.push(findThreshold(prefixSums, i));
  }

  return result;
}

function buildPrefixSums(viewCounts: number[]): number[] {
  const prefixSums = Array(viewCounts.length).fill(0);
  for (let i = 0; i < viewCounts.length; i++) {
    const val = viewCounts[i];
    if (i === 0) {
      prefixSums[i] = val;
    } else {
      prefixSums[i] = prefixSums[i - 1] + val;
    }
  }

  return prefixSums;
}

function findThreshold(prefixSums: number[], threshold: number): number {
  let result = -1;
  let l = 0;
  let r = prefixSums.length - 1;

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (prefixSums[mid] >= threshold) {
      // Could be earlier day
      r = mid - 1;

      // This could actually be it but let's try if there are
      // hit in earlier day
      result = mid;
    } else {
      // Could be later day
      l = mid + 1;
    }
  }

  return result;
}
