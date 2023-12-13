function bubbleSortWithFlag(nums: number[]): void {
  let count = 0 // 记录比较次数
  // 外循环：未排序区间为 [0, i]
  for (let i = nums.length - 1; i > 0; i--) {
    let flag = false // 初始化标志位
    // 内循环：将未排序区间 [0, i] 中的最大元素交换至该区间的最右端
    for (let j = 0; j < i; j++) {
      count++
      if (nums[j] > nums[j + 1]) {
        // 交换 nums[j] 与 nums[j + 1]
        let tmp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = tmp
        flag = true // 记录交换元素
        console.log(`交换元素：${nums[j]} 和 ${nums[j + 1]}`)
      }
    }
    console.log(`一轮排序结束，数组状态：${nums}`)
    if (!flag) {
      console.log('此轮冒泡未交换任何元素，直接跳出')
      break // 此轮冒泡未交换任何元素，直接跳出
    }
  }
  console.log('比较次数：', count)
}

// 测试

const badCase = [5, 4, 3, 2, 1]
const goodCase = [1, 2, 3, 4, 5]

bubbleSortWithFlag(badCase)
bubbleSortWithFlag(goodCase)
