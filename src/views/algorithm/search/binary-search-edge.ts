/**
 * 给定一个长度为 n 的有序数组 nums ，其中可能包含重复元素。
 * 请返回数组中最左一个元素 target 的索引。
 * 若数组中不包含该元素，则返回 -1。
 * */

import { binarySearchInsertion } from './binary-search-insertion'

function binarySearchEdge(nums: number[], target: number): number {
  const i = binarySearchInsertion(nums, target)
  if (i === nums.length || nums[i] !== target) return -1
  return i
}
