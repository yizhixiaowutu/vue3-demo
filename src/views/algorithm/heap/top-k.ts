import { MinHeap } from './min-heap'

// 元素入堆
function pushMinHeap(minHeap: MinHeap, val: number): void {
  return minHeap.push(val)
}

// 元素出堆
function popMinHeap(minHeap: MinHeap): number {
  return minHeap.pop()!
}

// 获取堆顶元素
function peekMinHeap(minHeap: MinHeap): number {
  return minHeap.peek()
}

// 取出堆中元素
function getMinHeap(minHeap: MinHeap): number[] {
  return minHeap.getMinHeap()
}

// 基于堆查找数组中最大的 k 个元素
function topKHeap(numbers: number[], k: number): number[] {
  const minHeap = new MinHeap([])
  for (let i = 0; i < k; i++) {
    pushMinHeap(minHeap, numbers[i])
  }
  for (let i = k; i < numbers.length; i++) {
    if (numbers[i] > peekMinHeap(minHeap)) {
      popMinHeap(minHeap)
      pushMinHeap(minHeap, numbers[i])
    }
  }

  return getMinHeap(minHeap)
}

// const numbers = [3, 2, 1, 5, 6, 4]
// const k = 7
// console.log(topKHeap(numbers, k))
