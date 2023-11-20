// 键值对 Number -> string
class Pair {
  key: number
  value: string

  constructor(key: number, value: string) {
    this.key = key
    this.value = value
  }
}

// 基于数组的哈希表
class ArrayHashMap {
  private readonly buckets: (Pair | null)[]

  constructor() {
    // 初始化数组，包含100个桶
    this.buckets = new Array(100)
  }

  private hashFunc(key: number): number {
    return key % 100
  }
}
