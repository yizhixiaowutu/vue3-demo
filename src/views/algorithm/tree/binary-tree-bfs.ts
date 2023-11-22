import { TreeNode } from './tree-node'

const root = new TreeNode(0)
const n1 = new TreeNode(1)
const n2 = new TreeNode(2)
const n3 = new TreeNode(3)
const n4 = new TreeNode(4)
const n5 = new TreeNode(5)
const n6 = new TreeNode(6)

root.left = n1
root.right = n2
n1.left = n3
n1.right = n4
n2.left = n5
n2.right = n6

/**
 * 层序遍历 -> 本质属于广度优先遍历  breadth-first traversal(bfs)
 * @param root 需要遍历的节点
 */
function levelOrder(root: TreeNode | null): number[] {
  // 初始化队列,加入根节点
  if (!root) return []
  const queue = [root]
  const list: number[] = []
  while (queue.length) {
    let node = queue.shift() as TreeNode // 队列入队
    console.log('levelOrder.val ->', node.val)
    list.push(node.val) // 保存子节点的值
    if (node.left) {
      queue.push(node.left) // 左子节点入队
    }
    if (node.right) {
      queue.push(node.right) // 右子节点入队
    }
  }
  return list
}

const levelOrderArr = levelOrder(root)
console.log('层序遍历->', levelOrderArr)
