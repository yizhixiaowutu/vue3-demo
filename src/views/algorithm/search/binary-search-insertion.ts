/**
 * 给定一个长度为 n 的有序数组 nums 和一个元素 target ，数组不存在重复元素。
 * 现将 target 插入数组 nums 中，并保持其有序性。
 * 若数组中已存在元素 target ，则插入到其左方。
 * 请返回插入后 target 在数组中的索引。
 */

export function binarySearchInsertion(nums: number[], target: number): number {
  let i = 0
  let j = nums.length - 1
  while (i <= j) {
    const mid = Math.floor(i + (j - i) / 2)
    if (nums[mid] < target) {
      i = mid + 1
    } else if (nums[mid] > target) {
      j = mid - 1
    } else {
      j = mid - 1 // 首个小于 target 的元素在区间 [i, mid-1] 中
      // i = mid + 1 // 最后一个小于等于 target 的元素在区间 [mid+1, j] 中
    }
  }
  return i
}

const arr = [1, 3, 5, 7, 7, 9, 11, 13, 15, 17]
console.log('binarySearchInsertion', binarySearchInsertion(arr, 9)) // 5
