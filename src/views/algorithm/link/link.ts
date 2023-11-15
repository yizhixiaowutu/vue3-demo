/**
 * 链表节点类
 */

export class LinkNode {
  val: number;
  next: LinkNode | null;
  constructor(val: number, next?: LinkNode | null) {
    this.val = val === undefined ? 0 : val; // 节点值
    this.next = next === undefined ? null : next; // 指向下一节点的引用
  }
}

/**
 * 插入节点
 * @param n0 需要在此节点后插入
 * @param p 需要插入的节点
 * @returns void
 * @example insert(n1, new LinkNode(4))
 */
function insert(n0: LinkNode, p: LinkNode): void {
  const n1 = n0.next; // 找到当前节点的下一节点
  p.next = n1; // 将新节点的next指向当前节点的下一节点
  n0.next = p; // 将当前节点的next指向新节点
}

/**
 * 删除节点
 * @param n0 需要删除n0节点后的首个节点
 * @returns void
 * @example remove(n1) // n1.next = n2, n2.next = n3 => n1.next = n3
 */
function remove(n0: LinkNode) {
  if (!n0.next) return; // 如果n0没有下一节点，直接返回
  const P = n0.next; // 找到n0的下一节点
  const n1 = P.next; // 找到n0的下下节点
  n0.next = n1; // 将n0的next指向下下节点
}

/**
 * 访问节点
 * @param head 链表头结点
 * @param index 链表中的第index个节点
 * @returns 返回访问的节点
 */
function access(head: LinkNode | null, index: number): LinkNode | null {
  for (let i = 0; i < index; i++) {
    if (!head) return null;
    head = head.next;
  }
  return head;
}
/**
 * 在链表中查找值为 target 的首个节点
 * @param head 链表头结点
 * @param target 目标值
 * @returns 目标值索引
 */
function find(head: LinkNode | null, target: number): number {
  let index = 0; // 索引
  while (head) {
    // 遍历链表
    if (head.val === target) return index; // 找到目标值，返回索引
    head = head.next; // 没找到，继续遍历
    index++; // 索引自增
  }
  return -1; // 遍历完链表，没有找到目标值，返回-1
}
const n0 = new LinkNode(0);
const n1 = new LinkNode(1);
const n2 = new LinkNode(2);
const n3 = new LinkNode(3);

n0.next = n1;
n1.next = n2;
n2.next = n3;
insert(n1, new LinkNode(4));
console.log("n0", n0);
const accessNode = access(n0, 2); // { val: 4, next: { val: 2, next: ... } }
console.log("accessNode", accessNode);
