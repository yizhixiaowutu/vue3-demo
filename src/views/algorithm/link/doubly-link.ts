// 双向链表 doubly linked list
class DoubleLinkNode {
  val: number;
  next: DoubleLinkNode | null;
  prev: DoubleLinkNode | null;
  constructor(
    val?: number,
    next?: DoubleLinkNode | null,
    prev?: DoubleLinkNode | null
  ) {
    this.val = val ? val : 0; // 节点值
    this.next = next ? next : null; // 指向下一节点的引用
    this.prev = prev ? prev : null; // 指向上一节点的引用
  }
}

function insertByNext(n0: DoubleLinkNode, P: DoubleLinkNode): void {
  const n1 = n0.next; // 找到当前节点的下一节点
  P.next = n1; // 将新节点的next指向当前节点的下一节点
  P.prev = n0; // 将新节点的prev指向当前节点
  n0.next = P; // 将当前节点的next指向新节点
  if (n1) {
    // 如果当前节点的下一节点存在
    n1.prev = P; // 将当前节点的下一节点的prev指向新节点
  }
}

function insertByPrev(n0: DoubleLinkNode, P: DoubleLinkNode): void {
  const n1 = n0.prev; // 找到当前节点的上一节点
  P.prev = n1; // 将新节点的prev指向当前节点的上一节点
  P.next = n0; // 将新节点的next指向当前节点
  n0.prev = P; // 将当前节点的prev指向新节点
  if (n1) {
    n1.next = P; // 将当前节点的上一节点的next指向新节点
  }
}

// TODO: 双向remove
function remove(n0: DoubleLinkNode): void {
  const P = n0.next; // 找到n0的下一节点
  if (!P) return; // 如果n0没有下一节点，直接返回
  const n1 = P.next; // 找到n0的下下节点
  n0.next = n1; // 将n0的next指向下下节点
  if (n1) {
    n1.prev = n0;
  }
}
function accessByNext(
  head: DoubleLinkNode | null,
  index: number
): DoubleLinkNode | null {
  for (let i = 0; i < index; i++) {
    if (!head) return null;
    head = head.next;
  }
  return head;
}
function accessByPrev(
  head: DoubleLinkNode | null,
  index: number
): DoubleLinkNode | null {
  for (let i = 0; i < index; i++) {
    if (!head) return null;
    head = head.prev;
  }
  return head;
}

function findByNext(head: DoubleLinkNode | null, target: number): number {
  let index = 0; // 索引
  while (head) {
    // 遍历链表
    if (head.val === target) return index; // 找到目标值，返回索引
    head = head.next; // 没找到，继续遍历
    index++; // 索引自增
  }
  return -1; // 遍历完链表，没找到目标值，返回 -1
}
function findByPrev(head: DoubleLinkNode | null, target: number): number {
  let index = 0; // 索引
  while (head) {
    // 遍历链表
    if (head.val === target) return index; // 找到目标值，返回索引
    head = head.prev; // 没找到，继续遍历
    index++; // 索引自增
  }
  return -1; // 遍历完链表，没找到目标值，返回 -1
}

const n0 = new DoubleLinkNode(0);
const n1 = new DoubleLinkNode(1);
const n2 = new DoubleLinkNode(2);
const n3 = new DoubleLinkNode(3);
const n4 = new DoubleLinkNode(4);
n0.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.prev = n3;
n3.prev = n2;
n2.prev = n1;
n1.prev = n0;

// const node = accessByNext(n0, 1);
// console.log("node", node); // {val: 1, next: {val:2, ...}, prev: {val: 0, ...} }
// const node2 = accessByPrev(n4, 1);
// console.log("node2", node2); // {val:3, next: {val:4, ...}, prev: {val: 2, ...} }

// const index = findByNext(n0, 2);
// const index2 = findByPrev(n3, 2);
// console.log("index", index); // 2
// console.log("index2", index2); // 1

insertByNext(n1, new DoubleLinkNode(1.5));
// console.log("n1", n1);
// console.log("n2", n2);

console.log("=====================");
insertByPrev(n3, new DoubleLinkNode(2.5));
console.log("n1", n1);
console.log("n2", n2);
console.log("n3", n3);
