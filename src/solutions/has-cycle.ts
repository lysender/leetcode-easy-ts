import { ListNode } from '../types/list-node';

export function hasCycle(head: ListNode | null): boolean {
  // Use two pointer technique with a slow and fast pointer
  // Slow pointer moves next one at a time
  // Fast pointer moves next twice at a time
  // If slow pointer catches up with the fast pointer, then there is a cycle
  // If fast pointer reaches the end, then there is no cycle
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    if (slow) {
      slow = slow.next;
    }
    if (fast) {
      fast = fast.next?.next;
    }
    if (slow == fast) {
      return true;
    }
  }
  return false;
}
