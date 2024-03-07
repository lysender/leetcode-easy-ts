class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function createList(items: number[], pos: number): ListNode[] {
  const reversedItems = [ ...items ];
  reversedItems.reverse();

  let list: ListNode[] = [];
  let prev: ListNode | null = null;

  for (const v of reversedItems) {
    const node: ListNode = new ListNode(v, prev);
    list.push(node);
    prev = node;
  }

  list.reverse();

  if (pos >= 0) {
    const back = list[pos];
    list[list.length - 1].next = back;
  }

  return list;
}

function hasCycle(head: ListNode | null): boolean {
  // Form a sort of a stack and repeatedly check for repitation
  const map: Map<number, ListNode> = new Map();
  let mainPos = 0;
  let mainCurrent = head;

  function verify(existingNode: ListNode, currentPos: number, backPos: number): boolean {
    // Iterate each item and it should match until we reach the current pos
    let verifyCurrent = existingNode.next;
    let runningPos = backPos + 1;
    let alt = map.get(runningPos);

    // Peek next value and see if they are the same
    if (verifyCurrent && alt && verifyCurrent.val !== alt.val) {
      return false;
    }

    while (verifyCurrent && alt && runningPos < currentPos) {
      if (verifyCurrent.val !== alt.val) {
        return false;
      }
      runningPos += 1;

      alt = map.get(runningPos);
      const node = verifyCurrent.next;

      if (!alt || !node) {
        return false;
      }

      verifyCurrent = node;
    }

    return runningPos >= currentPos;
  }

  function cycleCheck(node: ListNode, currentPos: number): boolean {
    // Check if the last value already exists in the map
    const keys = Array.from(map.keys());
    let existingKey: number | null = null;
    for (const k of keys) {
      if (map.get(k)?.val === node.val) {
        // Somehow, value already exists
        existingKey = k;
        break;
      }
    }

    if (existingKey !== null && currentPos > existingKey) {
      // We definitely have looped back, however, we need to verify
      // if we can actually arrive on currentPos following the existing key
      // We need to prove that we actually pointed back into a loop
      // If we can predict the next item, then we are indeed in a loop
      // Unless sample linked list actually contain duplicates
      const existingNode = map.get(existingKey);
      const nextNode = map.get(existingKey + 1);

      if (existingNode?.next && nextNode) {
        if (existingNode.next?.val === nextNode.val) {
          // Pass the original node and the existing node and see if they converge
          const result = verify(node, currentPos, existingKey);
          if (result) {
            return true;
          }
        }
      }
    }
    return false;
  }

  while (mainCurrent && mainCurrent.next) {
    map.set(mainPos, mainCurrent);

    if (cycleCheck(mainCurrent, mainPos)) {
      return true;
    }
    mainCurrent = mainCurrent.next;
    mainPos += 1;
  }
  return false;
}

// Run some tests
function test1() {
  const list = createList([3, 2, 0, -4], 1);
  const result = hasCycle(list[0]);
  console.log(`test1, pos: 1: ${result ? 'PASS' : 'FAIL'}`);
}

function test2() {
  const list = createList([1, 2], 0);
  const result = hasCycle(list[0]);
  console.log(`test2, pos: 0: ${result ? 'PASS' : 'FAIL'}`);
}

function test3() {
  const list = createList([1], -1);
  const result = hasCycle(list[0]);
  console.log(`test3, pos: -1: ${!result ? 'PASS' : 'FAIL'}`);
}

function test4() {
  const list = createList([-21,10,17,8,4,26,5,35,33,-7,-16,27,-12,6,29,-12,5,9,20,14,14,2,13,-24,21,23,-21,5], -1);
  const result = hasCycle(list[0]);
  console.log(`test3, pos: -1: ${!result ? 'PASS' : 'FAIL'}`);
}

test1();
test2();
test3();
test4();
