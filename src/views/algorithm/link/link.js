/**
 * 链表节点类
 */
var LinkNode = /** @class */ (function () {
    function LinkNode(val, next) {
        this.val = val === undefined ? 0 : val; // 节点值
        this.next = next === undefined ? null : next; // 指向下一节点的引用
    }
    return LinkNode;
}());
/**
 * 插入节点
 * @param n0 需要在此节点后插入
 * @param p 需要插入的节点
 * @returns void
 * @example insert(n1, new LinkNode(4))
 */
function insert(n0, p) {
    var n1 = n0.next; // 找到当前节点的下一节点
    p.next = n1; // 将新节点的next指向当前节点的下一节点
    n0.next = p; // 将当前节点的next指向新节点
}
/**
 * 删除节点
 * @param n0 需要删除n0节点后的首个节点
 * @returns void
 * @example remove(n1) // n1.next = n2, n2.next = n3 => n1.next = n3
 */
function remove(n0) {
    if (!n0.next)
        return; // 如果n0没有下一节点，直接返回
    var P = n0.next; // 找到n0的下一节点
    var n1 = P.next; // 找到n0的下下节点
    n0.next = n1; // 将n0的next指向下下节点
}
function access(head, index) {
    for (var i = 0; i < index; i++) {
        if (!head)
            return null;
        head = head.next;
    }
    return head;
}
var n0 = new LinkNode(0);
var n1 = new LinkNode(1);
var n2 = new LinkNode(2);
var n3 = new LinkNode(3);
n0.next = n1;
n1.next = n2;
n2.next = n3;
insert(n1, new LinkNode(4));
console.log("n0", n0);
