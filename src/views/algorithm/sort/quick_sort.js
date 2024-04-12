var count = 0;

/* 元素交换 */
function swap(nums, i, j) {
  var tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
  count += 1; // 累加次数
}

/* 哨兵划分 */
function partition(nums, left, right) {
  // 以 nums[left] 为基准数
  var i = left, j = right;
  while (i < j) {
    while (i < j && nums[j] >= nums[left]) {
      j -= 1; // 从右向左找首个小于基准数的元素
    }
    while (i < j && nums[i] <= nums[left]) {
      i += 1; // 从左向右找首个大于基准数的元素
    }
    // 元素交换
    swap(nums, i, j); // 交换这两个元素
  }
  swap(nums, i, left); // 将基准数交换至两子数组的分界线
  return i; // 返回基准数的索引
}

/* 快速排序 */
function quickSort(nums, left, right) {
  // 子数组长度为 1 时终止递归
  if (left >= right) {
    return;
  }
  // 哨兵划分
  var pivot = partition(nums, left, right);
  // 递归左子数组、右子数组
  quickSort(nums, left, pivot - 1);
  quickSort(nums, pivot + 1, right);
}

const numArr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
quickSort(numArr, 0, numArr.length - 1);
console.log('count', count);