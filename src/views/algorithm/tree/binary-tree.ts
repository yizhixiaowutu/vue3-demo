import { TreeNode } from './tree-node'

/**
 * 初始化二叉树
 */
let n1 = new TreeNode(1)
let n2 = new TreeNode(2)
let n3 = new TreeNode(3)
let n4 = new TreeNode(4)
let n5 = new TreeNode(5)

n1.left = n2
n1.right = n3
n2.left = n4
n2.right = n5

console.log('n1', n1)

// 插入节点
const P = new TreeNode(0)
n1.left = P
P.left = n2

console.log('插入节点后n1', n1)

// 删除节点
n1.left = n2
console.log('删除节点后n1', n1)

/**
 * 二叉树常见术语
 * 1.根节点(root node): 位于二叉树顶层的节点，没有父节点
 * 2.叶子结点(leaf node): 没有子节点的节点，左右两指针指向 None
 * 3.边(edge): 连接两个节点的线段，即节点引用（指针）
 * 4.层(level): 从根节点到叶子结点递增，根节点所在层为 1
 * 5.度(degree): 节点的子节点数量，二叉树中取值范围是 0,1,2
 * 6.二叉树的高度(height): 从根节点到最远叶子结点所经过的边数
 * 7.节点的深度(depth):从根节点到该节点经过的边数
 * 8.节点的高度(height):从距离该节点最远的叶子节点到该节点所经过的边的数量
 */

/**
 * 常见二叉树类型
 * 1. 完美二叉树 或 满二叉树(perfect binary tree): 叶节点度为0，其余节点度为2;
 *    若树高度为h，则节点总数为 2^(h+1)-1
 *    可用于描述自然界的细胞分裂
 *
 * 2. 完全二叉树(complete binary tree): 只有底层的节点未被填满，且最底层节点优先靠左填充
 *
 * 3. 完满二叉树(full binary tree): 除了叶子节点外，其余节点都有两个子节点
 *    即所有节点的度为 0 或 2
 *
 * 4. 平衡二叉树(balanced binary tree): 节点的 左子树height - 右子树height = d
 *    则平衡二叉树中所有节点满足 |d| <= 1
 */
