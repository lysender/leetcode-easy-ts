import { ListNode } from '../types/list-node';

export function getIntersectionNode(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  // First try, use a set for headA, then try each node in headB if they matches in the hash map
  if (headA === null || headB === null) {
    return null;
  }

  const set = new Set<ListNode>();
  // Process headA
  let current: ListNode | null = headA;
  while (current !== null) {
    set.add(current);
    current = current.next;
  }

  // Find intersect in headB
  current = headB;
  while (current !== null) {
    if (set.has(current)) {
      return current;
    }
    current = current.next;
  }
  return null;
}
