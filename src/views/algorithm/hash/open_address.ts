import { Pair } from './array_hash'
// 开放寻址哈希表
class HashMapOpenAddress {
  size: number // 键值对数量
  capacity: number // 哈希表容量
  loadThreshold: number // 触发扩容的负载因子阈值
  extentRatio: number // 扩容倍数
  buckets: Array<Pair | null> // 桶数组
  TOMBSTONE: Pair // 删除标记(墓碑)

  constructor() {
    this.size = 0
    this.capacity = 4
    this.loadThreshold = 2.0 / 3.0
    this.extentRatio = 2
    this.buckets = new Array(this.capacity).fill(null)
    this.TOMBSTONE = new Pair(-1, '-1')
  }

  hashFunc(key: number): number {
    return key % this.capacity
  }

  loadFactor(): number {
    return this.size / this.capacity
  }

  findBucket(key: number): number {
    let index = this.hashFunc(key)
    let firstTombstone = -1
    // 线性探测，遇到空桶时跳出
    while (this.buckets[index] !== null) {
      // 若遇到 key ，返回对应桶索引
      if (this.buckets[index]?.key === key) {
        // 如果遍历到删除标记，则将键值对移动到该索引下
        if (firstTombstone !== -1) {
          this.buckets[firstTombstone] = this.buckets[index]
          this.buckets[index] = this.TOMBSTONE // 交换位置后，给原index位置填充为删除标记
          return firstTombstone // 返回移动后的桶索引
        }
        return index
      }
      // 记录遇到的首个删除标记
      if (firstTombstone === -1 && this.buckets[index] === this.TOMBSTONE) {
        firstTombstone = index
      }
      // 计算桶的索引，越过尾部返回头部
      index = (index + 1) % this.capacity
    }
    return firstTombstone === -1 ? index : firstTombstone
  }

  put(key: number, value: string): void {
    if (this.loadFactor() > this.loadThreshold) {
      this.extend()
    }
    const index = this.findBucket(key)
    if (
      this.buckets[index] !== null &&
      this.buckets[index] !== this.TOMBSTONE
    ) {
      this.buckets[index]!.value = value
      return
    }
    this.buckets[index] = new Pair(key, value)
    this.size++
  }

  // 不能在开放寻址哈希表中直接删除元素，因为会产生空桶
  // 线性探测到空桶就会返回，导致该空桶下的元素都无法被访问到，回导致程序误判这些元素不存在
  remove(key: number): void {
    const index = this.findBucket(key)
    // 存在该键值对，则用删除标记覆盖，视为删除
    if (
      this.buckets[index] !== null &&
      this.buckets[index] !== this.TOMBSTONE
    ) {
      this.buckets[index] = this.TOMBSTONE
      this.size--
    }
  }

  get(key: number): string | null {
    const index = this.findBucket(key)
    if (this.buckets[index] && this.buckets[index] !== this.TOMBSTONE) {
      return this.buckets[index]!.value
    }
    return null
  }

  extend(): void {
    const bucketsTmp = this.buckets
    this.capacity *= this.extentRatio
    this.buckets = new Array(this.capacity).fill(null)
    this.size = 0
    for (const bucket of bucketsTmp) {
      if (bucket && bucket !== this.TOMBSTONE) {
        this.put(bucket.key, bucket.value)
      }
    }
  }

  print(): void {
    for (const bucket of this.buckets) {
      if (bucket === null) {
        console.log('null')
      } else if (bucket === this.TOMBSTONE) {
        console.log('TOMBSTONE')
      } else {
        console.log(bucket.key, '->', bucket.value)
      }
    }
  }
}

const hashMap = new HashMapOpenAddress()
console.log('init', hashMap)
hashMap.put(1, '这是第一位')
hashMap.put(2, '2')
hashMap.put(3, '3')
hashMap.put(4, '第四位')
console.log('四次put', hashMap)

const get_2 = hashMap.get(2)
console.log('get_2', get_2)

hashMap.remove(4)
console.log('remove第四位', hashMap.buckets)
