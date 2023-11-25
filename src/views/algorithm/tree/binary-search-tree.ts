/**
 * 二叉搜索树 binary-search-tree
 * 特点：对于任意节点（包含根节点），满足 左子结点 < 根结点 < 右子结点
 * 注意：不允许存在重复节点
 * */

import { TreeNode } from '../utils/tree-node'
class BinarySearchTree {
  root: TreeNode | null
  constructor() {
    this.root = null
  }

  // 查询
  search(num: number): TreeNode | null {
    let cur = this.root
    while (cur !== null) {
      if (cur.val < num) cur = cur.right
      else if (cur.val > num) cur = cur.left
      else break
    }
    return cur
  }

  // 插入
  insert(num: number): void {
    if (this.root === null) {
      this.root = new TreeNode(num)
      return
    }
    let cur: TreeNode | null = this.root
    let pre: TreeNode | null = null
    while (cur !== null) {
      if (cur.val === num) return
      pre = cur
      if (cur.val < num) cur = cur.right
      else cur = cur.left
    }
    const node = new TreeNode(num)
    if (pre!.val < num) pre!.right = node
    else pre!.left = node
  }

  // 删除
  remove(num: number): void {
    if (this.root === null) return
    let cur: TreeNode | null = this.root
    let pre: TreeNode | null = null
    while (cur !== null) {
      if (cur.val === num) break
      pre = cur
      if (cur.val < num) cur = cur.right
      else cur = cur.left
    }
    if (cur === null) return // 不存在该节点
    if (cur.left === null || cur.right === null) {
      // 子节点度为 0 或 1
      const child: TreeNode | null = cur.left || cur.right
      if (cur !== this.root) {
        if (pre!.left === cur) pre!.left = child
        else pre!.right = child
      } else {
        this.root = child
      }
    } else {
      // 子节点度为 2
      // 获取中序遍历中 cur 的下一个节点，记作 tmp
      let tmp: TreeNode | null = cur.right
      while (tmp!.left !== null) tmp = tmp!.left
      this.remove(tmp!.val)
      cur.val = tmp!.val
    }
  }
}
