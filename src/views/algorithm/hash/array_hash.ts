// 键值对 Number -> string
export class Pair {
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

  // 哈希函数
  private hashFunc(key: number): number {
    return key % 100
  }

  // 查询
  public get(key: number): string | null {
    const index = this.hashFunc(key)
    const pair = this.buckets[index]
    if (!pair) return null
    return pair.value
  }

  // 插入
  public set(key: number, value: string): void {
    const index = this.hashFunc(key)
    this.buckets[index] = new Pair(key, value)
  }

  // 删除
  public delete(key: number): void {
    const index = this.hashFunc(key)
    this.buckets[index] = null // 将桶置空
  }
}
