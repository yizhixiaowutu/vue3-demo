// 冒泡排序
const arr = [4, 1, 3, 1, 5, 2]

function bubbleSort(arr: number[]): number[] {
  for (let i = arr.length - 1; i > 0; i--) {
    let flag = false
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let tmp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = tmp
        flag = true
      }
    }
    if (!flag) break
  }
  return arr
}

const bubbleArr = bubbleSort(arr)
console.log('bubbleArr', bubbleArr)
