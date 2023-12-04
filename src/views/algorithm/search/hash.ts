/**
 * 给定一个整数数组 nums 和一个目标元素 target ，请在数组中搜索“和”为 target 的两个元素，并返回它们的数组索引。
 * 返回任意一个解即可。
 */

// 方法一：暴力枚举
function twoSumBruteForce(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
  return []
}

// 方法二：辅助哈希表
function twoSumHash(nums: number[], target: number): number[] {
  const map = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    const index = map.get(target - nums[i])
    if (index !== undefined) {
      return [index, i]
    } else {
      map.set(nums[i], i)
    }
  }
  return []
}
const nums = [2, 7, 11, 15]
const t = 13
console.log('twoSumBruteForce', twoSumBruteForce(nums, t)) // [0, 2]
console.log('twoSumHash', twoSumHash(nums, t)) // [0, 2]
