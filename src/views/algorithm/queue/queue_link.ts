/**
 * 基于链表实现队列
 */

class ListNode {
  val: number
  next: ListNode | null
  constructor(val: number, next: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

class LinkedListQueue {
  private front: ListNode | null // 队列头结点
  private rear: ListNode | null // 队列尾节点
  private queueSize: number = 0 // 队列长度

  constructor() {
    this.front = null
    this.rear = null
  }

  get size(): number {
    return this.queueSize
  }

  get isEmpty(): boolean {
    return this.size === 0
  }

  // 入队
  push(num: number): void {
    const node = new ListNode(num)
    if (!this.front) {
      // 队列为空则头尾结点均指向该节点
      this.front = node
      this.rear = node
    } else {
      // 队列不为空则尾结点指向该节点
      this.rear!.next = node
      this.rear = node
    }
  }

  // 出队
  pop(): number | undefined {
    const num = this.peek()
    if (!this.front) throw new Error('队列为空')
    this.front = this.front.next
    this.queueSize--
    return num
  }

  // 获取队首元素
  peek(): number {
    if (!this.front) throw new Error('队列为空')
    return this.front.val
  }

  // 返回 Array
  toArray(): number[] {
    const arr: number[] = new Array(this.size)
    let node = this.front
    for (let i = this.size; i > 0; i--) {
      arr[i] = node!.val
      node = node!.next
    }
    return arr
  }
}
