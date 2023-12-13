// 插入排序
function insertSort(arr: number[]): void {
  for (let i = 0; i < arr.length; i++) {
    let base = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > base) {
      arr[j + 1] = arr[j]
      j--
      console.log('i', i, arr[i])
      console.log('j', j, arr[j])
    }
    arr[j + 1] = base
    console.log('此时的arr', arr)
  }
}

const arrs = [3, 2, 1, 5, 4]
insertSort(arrs)
