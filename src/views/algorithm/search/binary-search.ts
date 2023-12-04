/**
 * 给定一个长度为 n 的数组 nums ，元素按从小到大的顺序排列且不重复。
 * 请查找并返回元素 target 在该数组中的索引。若数组不包含该元素，则返回 -1 。
 */

function binarySearch(nums: number[], target: number): number {
  let i = 0
  let j = nums.length - 1
  while (i <= j) {
    const mid = Math.floor(i + (j - i) / 2)
    if (nums[mid] < target) {
      i = mid + 1
    } else if (nums[mid] > target) {
      j = mid - 1
    } else {
      return mid
    }
  }
  return -1
}

const orderNums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29]
const target = 11
console.log('binarySearch', binarySearch(orderNums, target)) // 5
