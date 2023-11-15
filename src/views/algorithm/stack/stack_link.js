/**
 * 基于链表实现的栈
 */
class LinkedListStack {
  #stackPeek; // 将头结点作为栈顶
  #stackSize; // 栈长度

  constructor() {
    this.#stackPeek = null; // 初始化栈顶
    this.next = null;
  }
  // 获取栈的长度
  get size() {
    return this.#stackSize;
  }

  // 判断栈是否为空
  get isEmpty() {
    return this.#stackSize === 0;
  }

  // 入栈
  push(num) {
    const node = new LinkedListStack(num); // 初始化一个新节点
    node.next = this.#stackPeek; // 新节点的 next 指向原栈顶
    this.#stackPeek = node; // 将新节点作为栈顶
    this.#stackSize++; // 栈长度 + 1
  }
  // TODO: 未完成
  // 出栈
  // pop() {
  //   const num = this.
  // }
}
