import { describe, expect, it } from 'vitest';
import { createList } from '../types/list-node';
import {
  getIntersectionNode,
  getIntersectionNodeTwoPointer,
} from './intersection-node';

describe('intersection-node', () => {
  describe('naive method, using set', () => {
    describe('test1 - with intersect', () => {
      it('should pass', async () => {
        const list1 = createList([4, 1, 8, 4, 5]);
        const list2 = createList([5, 6, 1]);
        // Then join the last node of list 2 to the other node
        list2[2].next = list1[2];

        expect(getIntersectionNode(list1[0], list2[0])).toEqual(list1[2]);
      });
    });

    describe('test2 - with intersect', () => {
      it('should pass', async () => {
        const list1 = createList([1, 9, 1, 2, 4]);
        const list2 = createList([3]);
        // Then join the last node of list 2 to the other node
        list2[0].next = list1[3];

        expect(getIntersectionNode(list1[0], list2[0])).toEqual(list1[3]);
      });
    });

    describe('test3 - not intersect', () => {
      it('should pass', async () => {
        const list1 = createList([2, 6, 4]);
        const list2 = createList([1, 5]);

        expect(getIntersectionNode(list1[0], list2[0])).toEqual(null);
      });
    });
  });

  describe('using two pointer technique', () => {
    describe('test1 - with intersect', () => {
      it('should pass', async () => {
        const list1 = createList([4, 1, 8, 4, 5]);
        const list2 = createList([5, 6, 1]);
        // Then join the last node of list 2 to the other node
        list2[2].next = list1[2];

        expect(getIntersectionNodeTwoPointer(list1[0], list2[0])).toEqual(
          list1[2],
        );
      });
    });

    describe('test2 - with intersect', () => {
      it('should pass', async () => {
        const list1 = createList([1, 9, 1, 2, 4]);
        const list2 = createList([3]);
        // Then join the last node of list 2 to the other node
        list2[0].next = list1[3];

        expect(getIntersectionNodeTwoPointer(list1[0], list2[0])).toEqual(
          list1[3],
        );
      });
    });

    describe('test3 - not intersect', () => {
      it('should pass', async () => {
        const list1 = createList([2, 6, 4]);
        const list2 = createList([1, 5]);

        expect(getIntersectionNodeTwoPointer(list1[0], list2[0])).toEqual(null);
      });
    });
  });
});
