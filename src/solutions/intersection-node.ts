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

export function getIntersectionNodeTwoPointer(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  // Use two points and loop when at the same time
  // When any of the pointer reaches the end, reset pointer to head
  // Once they have cycled, they are equidistant with each other
  // They either met at intersection or both meet the end, meaning, no intersection
  let a: ListNode | null = headA;
  let b: ListNode | null = headB;

  if (headA === null || headB === null) {
    return null;
  }

  while (a !== b) {
    a = a?.next ?? null;
    b = b?.next ?? null;

    // Found it
    if (a === b) {
      return a;
    }

    if (a === null) {
      // Reset to head
      a = headA;
    }

    if (b === null) {
      b = headB;
    }
  }
  return a;
}

export function getIntersectionNodeDiffNodeCounts(
  headA: ListNode | null,
  headB: ListNode | null,
): ListNode | null {
  function countElements(head: ListNode | null): number {
    let x = 0;
    let current = head;
    while (current !== null) {
      current = current.next;
      x += 1;
    }
    return x;
  }

  // Count lengths of both list, just loop them at the same time
  let countA = countElements(headA);
  let countB = countElements(headB);

  // Find out the difference in length
  const diff = Math.abs(countA - countB);

  // Find the longer list
  // and reset the pointers
  let longer: ListNode | null;
  let shorter: ListNode | null;

  if (countA > countB) {
    longer = headA;
    shorter = headB;
  } else {
    longer = headB;
    shorter = headA;
  }

  // Move pointer a forward
  for (let x = 0; x < diff; x++) {
    if (longer === null) {
      // Not expected
      return null;
    }
    longer = longer.next;
  }

  // Move each pointer at the same time
  while (longer !== null && shorter !== null) {
    if (longer === shorter) {
      return longer;
    }

    // Move longer list forward
    longer = longer?.next ?? null;
    shorter = shorter?.next ?? null;
  }

  return null;
}
