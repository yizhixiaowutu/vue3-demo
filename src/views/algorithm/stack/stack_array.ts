// 基于动态数组实现的栈

class ArrayStack {
  private stack: number[] // 栈

  constructor() {
    this.stack = []
  }

  // 获取栈的长度
  get size(): number {
    return this.stack.length
  }

  // 判断栈是否为空
  get isEmpty(): boolean {
    return this.stack.length === 0
  }

  // 入栈
  push(num: number): void {
    this.stack.push(num)
  }

  // 出栈
  pop(): number | undefined {
    if (this.isEmpty) throw new Error('栈为空,无法出栈')
    return this.stack.pop()
  }

  // 获取栈顶元素
  peek(): number | undefined {
    if (this.isEmpty) throw new Error('栈为空')
    return this.stack[this.stack.length - 1]
  }

  // 返回 Array
  toArray(): number[] {
    return this.stack
  }
}

const arrayStack = new ArrayStack()
for (let i = 1; i <= 5; i++) {
  arrayStack.push(i)
}
console.log('arrayStack:', arrayStack.toArray())
const peek = arrayStack.peek()
console.log('peek:', peek)

const pop = arrayStack.pop()
console.log('pop:', pop) // 5

const peek2 = arrayStack.peek()
console.log('peek2:', peek2) // 4
