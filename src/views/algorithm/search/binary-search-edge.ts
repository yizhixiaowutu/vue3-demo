/**
 * 给定一个长度为 n 的有序数组 nums ，其中可能包含重复元素。
 * 请返回数组中最左一个元素 target 的索引。
 * 若数组中不包含该元素，则返回 -1。
 * */

import { binarySearchInsertion } from './binary-search-insertion'

// 二分查找最左一个 target 的索引
function binarySearchEdge(nums: number[], target: number): number {
  const i = binarySearchInsertion(nums, target)
  if (i === nums.length || nums[i] !== target) return -1
  return i
}

// 二分查找最右一个 target 的索引
function binarySearchRightEdge(nums: number[], target: number): number {
  // 转化为查找最左一个 target + 1 的索引
  /**
   * NOTE: 如果 target + 1 不存在或者溢出，所以返回的索引 i 一定是 target 的右边界
   *       如果 target + 1 存在，所以返回的索引 i 一定是 target 的右边界的下一个元素，即 target + 1 的左边界
   */
  const i = binarySearchInsertion(nums, target + 1)
  // j 指向最右一个 target ，i 指向首个大于 target 的元素
  const j = i - 1
  // 未找到 target ，返回 -1
  if (j === -1 || nums[j] !== target) return -1
  // 找到 target ，返回 索引 j
  return j
}
