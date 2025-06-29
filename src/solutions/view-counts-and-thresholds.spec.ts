import { describe, expect, it } from 'vitest';
import { calcViewCountsThresholdsTriggered } from './view-counts-and-thresholds';

describe('calcViewCountsThresholdsTriggered', () => {
  describe('simple input', () => {
    it('should pass', async () => {
      const viewCounts = [10, 20, 30, 40, 50];
      const thresholds = [50, 30, 90, 100];
      const result = calcViewCountsThresholdsTriggered(viewCounts, thresholds);
      expect(result).toEqual([2, 1, 3, 3]);
    });
  });
});
