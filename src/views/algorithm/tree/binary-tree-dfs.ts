import type { TreeNode } from '../utils/tree-node'
import { arr2Tree } from '../utils/tree-node'
const list: number[] = []

// 二叉树的深度优先遍历  depth-first traversal(dfs)

/**
 * 前序遍历
 * @param root
 * @returns
 * @description
 */
function preOrder(root: TreeNode | null): void {
  if (!root) return
  list.push(root.val)
  preOrder(root.left)
  preOrder(root.right)
}

function inOrder(root: TreeNode | null): void {
  if (!root) return
  inOrder(root.left)
  list.push(root.val)
  inOrder(root.right)
}

function postOrder(root: TreeNode | null): void {
  if (!root) return
  postOrder(root.left)
  postOrder(root.right)
  list.push(root.val)
}

const root = arr2Tree([1, 2, 3, 4, 5, 6, 7])

list.length = 0
preOrder(root)
console.log('前序遍历 ->', list)

list.length = 0
inOrder(root)
console.log('中序遍历 ->', list)

list.length = 0
postOrder(root)
console.log('后序遍历 ->', list)
