export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
  }
}

export function createList(items: number[], cycleBackPos: number = -1): ListNode[] {
  const reversedItems = [...items];
  reversedItems.reverse();

  let list: ListNode[] = [];
  let prev: ListNode | null = null;

  for (const v of reversedItems) {
    const node: ListNode = new ListNode(v, prev);
    list.push(node);
    prev = node;
  }

  list.reverse();

  if (cycleBackPos >= 0) {
    const back = list[cycleBackPos];
    list[list.length - 1].next = back;
  }

  return list;
}
