class TreeNode {
  val: number
  height: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(
    val?: number,
    height?: number,
    left?: TreeNode | null,
    right?: TreeNode | null
  ) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
    this.height = height === undefined ? 0 : height
  }
}

function arr2Tree(arr: (number | null)[], i: number = 0): TreeNode | null {
  if (i < 0 || i > arr.length || arr[i] === null) {
    return null
  }
  const root = new TreeNode(arr[i] as number)
  root.left = arr2Tree(arr, 2 * i + 1)
  root.right = arr2Tree(arr, 2 * i + 2)
  return root
}

export { TreeNode, arr2Tree }
