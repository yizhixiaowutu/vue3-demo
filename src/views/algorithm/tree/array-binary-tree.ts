/**
 * 数组表示下的二叉树类
 */
class ArrayBinaryTree {
  tree: (number | null)[]

  constructor(arr: (number | null)[]) {
    this.tree = arr
  }

  size(): number {
    return this.tree.length
  }

  // 获取索引为 i 的节点的值
  val(i: number): number | null {
    if (i < 0 || i >= this.size()) return null
    return this.tree[i]
  }

  // 获取索引为 i 的节点的左子节点
  left(i: number): number {
    console.log('left', i, 2 * i + 1)
    return 2 * i + 1
  }

  // 获取索引为 i 的节点的右子节点
  right(i: number): number {
    console.log('right', i, 2 * i + 2)
    return 2 * i + 2
  }

  // 获取索引为 i 的节点的父节点
  parent(i: number): number {
    return Math.floor((i - 1) / 2)
  }

  // 层序遍历(广度优先遍历)
  bfs(): number[] {
    const res = []
    for (let i = 0; i < this.size(); i++) {
      if (this.val(i) !== null) res.push(this.val(i))
    }
    return res as number[]
  }

  // 深度优先遍历
  dfs(i: number, order: 'pre' | 'in' | 'post', res: (number | null)[]): void {
    if (this.val(i) === null) return
    // 前序遍历
    if (order === 'pre') {
      console.log('前序-push', this.val(i))
      res.push(this.val(i))
    }
    this.dfs(this.left(i), order, res)
    // 中序遍历
    if (order === 'in') {
      res.push(this.val(i))
    }
    this.dfs(this.right(i), order, res)
    // 后序遍历
    if (order === 'post') {
      res.push(this.val(i))
    }
  }

  // 前序遍历
  preOrder(): (number | null)[] {
    const res: (number | null)[] = []
    this.dfs(0, 'pre', res)
    return res
  }

  // 中序遍历
  inOrder(): (number | null)[] {
    const res: (number | null)[] = []
    this.dfs(0, 'in', res)
    return res
  }

  // 后序遍历
  postOrder(): (number | null)[] {
    const res: (number | null)[] = []
    this.dfs(0, 'post', res)
    return res
  }
}

const perfectTree = new ArrayBinaryTree([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
])

console.log('tree', perfectTree.size(), perfectTree.tree)
const prePerfectTree = perfectTree.preOrder()
console.log('前序遍历 ->', prePerfectTree)

const inPerfectTree = perfectTree.inOrder()
console.log('中序遍历 ->', inPerfectTree)

const postPerfectTree = perfectTree.postOrder()
console.log('后序遍历 ->', postPerfectTree)
