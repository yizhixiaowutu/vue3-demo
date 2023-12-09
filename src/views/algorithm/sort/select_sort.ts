// 选择排序
function selectionSort(arr: number[]): number[] {
  let flag = 1
  for (let i = 0; i < arr.length - 1; i++) {
    let k = i
    for (let j = i + 1; j < arr.length; j++) {
      flag += 1
      if (arr[j] < arr[k]) {
        k = j
      }
    }
    ;[arr[i], arr[k]] = [arr[k], arr[i]]
  }
  console.log('flag', flag)
  return arr
}

// const arr = [4, 1, 3, 1, 5, 2]
const arr = [5, 4, 3, 2, 1]
const sortArr = selectionSort(arr)
console.log('sortArr', sortArr) // [1, 1, 2, 3, 4, 5]
