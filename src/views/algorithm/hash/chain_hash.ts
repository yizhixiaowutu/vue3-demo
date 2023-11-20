import { Pair } from './array_hash'
/**
 * 链式地址哈希表
 * 使用列表（动态数组）代替链表
 */
class HashMapChaining {
  size: number // 键值对数量
  capacity: number // 哈希表容量
  loadThreshold: number // 触发扩容的负载因子阈值
  extentRatio: number // 扩容倍数
  buckets: Pair[][] // 桶数组

  constructor() {
    this.size = 0
    this.capacity = 4
    this.loadThreshold = 2.0 / 3.0
    this.extentRatio = 2
    this.buckets = new Array(this.capacity).fill(null).map(() => [])
  }

  hashFunc(key: number): number {
    return key % this.capacity
  }

  // 负载因子
  loadFactor(): number {
    return this.size / this.capacity
  }

  // 扩容
  extend(): void {
    const bucketsTmp = this.buckets
    this.capacity *= this.extentRatio // 扩容
    this.buckets = new Array(this.capacity).fill(null).map(() => [])
    this.size = 0
    for (const bucket of bucketsTmp) {
      for (const pair of bucket) {
        this.put(pair.key, pair.value) // 重新插入
      }
    }
  }

  // 添加
  put(key: number, value: string): void {
    if (this.loadFactor() > this.loadThreshold) {
      this.extend()
    }
    const index = this.hashFunc(key)
    const bucket = this.buckets[index]
    // 如果已经存在，更新值
    for (const pair of bucket) {
      if (pair.key === key) {
        pair.value = value
        return
      }
    }
    // 不存在，插入
    const pair = new Pair(key, value)
    this.buckets[index].push(pair)
    this.size++
  }

  // 删除
  remove(key: number): void {
    const index = this.hashFunc(key)
    const bucket = this.buckets[index]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1)
        this.size--
        break
      }
    }
  }

  // 查询
  get(key: number): string | null {
    const index = this.hashFunc(key)
    const bucket = this.buckets[index]
    for (const pair of bucket) {
      if (pair.key === key) {
        return pair.value
      }
    }
    return null
  }

  // 输出打印哈希表
  print(): void {
    for (const bucket of this.buckets) {
      const res = []
      for (const pair of bucket) {
        res.push(pair.key + '->' + pair.value)
      }
      console.log(res)
    }
  }
}

const hashMap = new HashMapChaining()
hashMap.put(4, 'a')
hashMap.put(5, 'b')
hashMap.put(6, 'c')
hashMap.put(7, 'd')
console.log('bucket', hashMap.buckets)
