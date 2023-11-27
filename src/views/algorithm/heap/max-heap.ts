// 最大堆
class MaxHeap {
  maxHeap: number[]

  // 构造方法建立空堆，或者根据输入数组建堆
  constructor(numbers?: number[]) {
    this.maxHeap = numbers === undefined ? [] : [...numbers]
    // 堆化除了叶子结点以外的所有结点
    // NOTE: 叶子结点天然符合最大堆的性质，所以不需要堆化
    for (let i = this.parent(this.size() - 1); i >= 0; i--) {
      this.siftDown(i)
    }
  }

  size(): number {
    return this.maxHeap.length
  }

  isEmpty(): boolean {
    return this.maxHeap.length === 0
  }

  left(i: number): number {
    return 2 * i + 1
  }

  right(i: number): number {
    return 2 * i + 2
  }

  parent(i: number): number {
    return Math.floor((i - 1) / 2)
  }

  peek(): number {
    return this.maxHeap[0]
  }

  swap(i: number, j: number): void {
    const temp = this.maxHeap[i]
    this.maxHeap[i] = this.maxHeap[j]
    this.maxHeap[j] = temp
  }

  push(val: number): void {
    this.maxHeap.push(val)
    this.siftUp(this.size() - 1)
  }

  // 从节点 i 开始，自下往上调整节点，使其符合最大堆的性质
  siftUp(i: number): void {
    while (true) {
      const parentIndex = this.parent(i)
      if (parentIndex < 0 || this.maxHeap[parentIndex] >= this.maxHeap[i]) break
      this.swap(i, parentIndex)
      i = parentIndex
    }
  }

  pop(): number | undefined {
    if (this.isEmpty()) throw new Error('Heap is empty')
    this.swap(0, this.size() - 1)
    const del = this.maxHeap.pop()
    this.siftDown(0)
    return del
  }

  // 从节点 i 开始，自上往下调整节点，使其符合最大堆的性质
  siftDown(i: number): void {
    while (true) {
      const left = this.left(i)
      const right = this.right(i)
      let max = i
      if (left < this.size() && this.maxHeap[left] > this.maxHeap[max])
        max = left
      if (right < this.size() && this.maxHeap[right] > this.maxHeap[max])
        max = right
      if (max === i) break
      this.swap(i, max)
      i = max
    }
  }

  getMaxHeap(): number[] {
    return this.maxHeap
  }
}

export { MaxHeap }
