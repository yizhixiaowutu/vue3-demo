/* 元素交换 */
function swap(nums: number[], i: number, j: number): void {
  let tmp = nums[i]
  nums[i] = nums[j]
  nums[j] = tmp
}

/* 哨兵划分 */
function partition(nums: number[], left: number, right: number): number {
  // 以 nums[left] 为基准数
  let i = left,
    j = right
  while (i < j) {
    while (i < j && nums[j] >= nums[left]) {
      j -= 1 // 从右向左找首个小于基准数的元素
    }
    while (i < j && nums[i] <= nums[left]) {
      i += 1 // 从左向右找首个大于基准数的元素
    }
    // 元素交换
    swap(nums, i, j) // 交换这两个元素
  }
  swap(nums, i, left) // 将基准数交换至两子数组的分界线
  return i // 返回基准数的索引
}

/* 快速排序 */
function quickSort(nums: number[], left: number, right: number): void {
  // 子数组长度为 1 时终止递归
  if (left >= right) {
    return
  }
  // 哨兵划分
  const pivot = partition(nums, left, right)
  // 递归左子数组、右子数组
  quickSort(nums, left, pivot - 1)
  quickSort(nums, pivot + 1, right)
}

/* 选取三个元素的中位数 */
function medianThree(
  nums: number[],
  left: number,
  mid: number,
  right: number
): number {
  // 此处使用异或运算来简化代码
  // 异或规则为 0 ^ 0 = 1 ^ 1 = 0, 0 ^ 1 = 1 ^ 0 = 1
  if (Number(nums[left] < nums[mid]) ^ Number(nums[left] < nums[right])) {
    return left
  } else if (Number(nums[mid] < nums[left]) ^ Number(nums[mid] < nums[right])) {
    return mid
  } else {
    return right
  }
}

const numArr = [2, 4, 1, 0, 3, 5]
const res = medianThree(numArr, 0, Math.floor(5 / 2), 5)
console.log('res', res)
