/**
 * 单个节点
 */
class ListNode {
  val: number
  next: ListNode | null
  constructor(val: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val // 节点值
    this.next = next === undefined ? null : next // 指向下一节点的引用
  }
}
/**
 * 基于链表实现的栈
 */
class LinkedListStack {
  private stackPeek: ListNode | null // 将头结点作为栈顶
  private stackSize: number = 0 // 栈长度

  constructor() {
    this.stackPeek = null // 初始化栈顶
  }
  // 获取栈的长度
  get size() {
    return this.stackSize
  }

  // 判断栈是否为空
  get isEmpty() {
    return this.stackSize === 0
  }

  // 入栈
  push(num: number): void {
    const node = new ListNode(num) // 初始化一个新节点
    node.next = this.stackPeek // 新节点的 next 指向原栈顶
    this.stackPeek = node // 将新节点作为栈顶
    this.stackSize++ // 栈长度 + 1
  }
  // 出栈
  pop(): number {
    const num = this.peek()
    if (!num) throw new Error('栈为空,无法出栈')
    this.stackPeek = this.stackPeek?.next || null // 将栈顶指向下一节点
    this.stackSize-- // 栈长度 - 1
    return num
  }
  // 获取栈顶元素
  peek(): number {
    if (!this.stackPeek?.val) throw new Error('栈为空') // 栈为空，返回null(栈顶不存在
    return this.stackPeek.val
  }

  // 链表转化为数组
  toArray(): number[] {
    const arr = new Array<number>(this.size)
    // 从栈顶开始遍历，对于
    for (let i = this.size; i >= 0; i--) {
      arr[i] = this.stackPeek!.val
      this.stackPeek = this.stackPeek!.next
    }
    return arr
  }
}
