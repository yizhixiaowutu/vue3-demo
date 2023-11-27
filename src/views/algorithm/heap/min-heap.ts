// 最小堆
class MinHeap {
  minHeap: number[]

  constructor(numbers?: number[]) {
    this.minHeap = numbers === undefined ? [] : [...numbers]
    // TODO: 思考最小堆如何初始化建堆，是从顶向下还是从底向上？
    for (let i = 0; i < this.size(); i++) {
      this.siftUp(i)
    }
  }

  size(): number {
    return this.minHeap.length
  }

  isEmpty(): boolean {
    return this.minHeap.length === 0
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
    return this.minHeap[0]
  }

  swap(i: number, j: number): void {
    const temp = this.minHeap[i]
    this.minHeap[i] = this.minHeap[j]
    this.minHeap[j] = temp
  }

  push(val: number): void {
    this.minHeap.push(val)
    this.siftUp(this.size() - 1)
  }

  siftUp(i: number): void {
    while (true) {
      const p = this.parent(i)
      if (p < 0 || this.minHeap[p] <= this.minHeap[i]) break
      this.swap(i, p)
      i = p
    }
  }

  pop(): number | undefined {
    if (this.isEmpty()) throw new Error('Heap is empty')
    this.swap(0, this.size() - 1)
    const del = this.minHeap.pop()
    this.siftDown(0)
    return del
  }

  siftDown(i: number): void {
    while (true) {
      const l = this.left(i)
      const r = this.right(i)
      let min = i
      if (l < this.size() && this.minHeap[l] < this.minHeap[min]) {
        min = l
      }
      if (r < this.size() && this.minHeap[r] < this.minHeap[min]) {
        min = r
      }
      if (min === i) break
      this.swap(i, min)
      i = min
    }
  }

  getMinHeap(): number[] {
    return this.minHeap
  }
}

export { MinHeap }
