/**
 * 基于邻接矩阵实现的无向图类 graph adjacency matrix
 */
class GraphAdjMat {
  vertices: number[] // 顶点列表，元素代表顶点值，索引代表顶点索引
  adjMat: number[][] // 邻接矩阵，行索引对应顶点索引

  constructor(vertices: number[], edges: number[][]) {
    this.vertices = []
    this.adjMat = []
    // 初始化顶点列表
    for (const val of vertices) {
      this.addVertex(val)
    }

    // 添加边
    for (const e of edges) {
      this.addEdge(e[0], e[1])
    }
  }

  size(): number {
    return this.vertices.length
  }

  // 添加顶点
  addVertex(val: number): void {
    const n: number = this.size()
    // 向顶点列表中添加新顶点的值
    this.vertices.push(val)
    // 在邻接矩阵中添加一行
    const newRow: number[] = []
    for (let j = 0; j < n; j++) {
      newRow.push(0)
    }
    this.adjMat.push(newRow)
    // 在邻接矩阵中添加一列
    for (const row of this.adjMat) {
      row.push(0)
    }
  }

  // 删除顶点
  removeVertex(index: number): void {
    if (this.size() <= index) {
      throw new RangeError('顶点索引越界')
    }
    // 在顶点列表中移除索引 index 的顶点
    this.vertices.splice(index, 1)

    // 在邻接矩阵中删除索引 index 的行
    this.adjMat.splice(index, 1)
    // 在邻接矩阵中删除索引 index  的列
    for (const row of this.adjMat) {
      row.splice(index, 1)
    }
  }

  // 添加边 i,j 对应 vertices 元素索引
  addEdge(i: number, j: number): void {
    if (i < 0 || j < 0 || this.size() <= i || this.size() <= j || i === j) {
      throw new RangeError('索引越界异常')
    }
    // 无向图中，邻接矩阵沿主对角线对称，满足 [i,j] = [j,i]
    this.adjMat[i][j] = 1
    this.adjMat[j][i] = 1
  }

  // 删除边 i,j 对应 vertices 元素索引
  removeEdge(i: number, j: number): void {
    if (i < 0 || j < 0 || this.size() <= i || this.size() <= j || i === j) {
      throw new RangeError('索引越界异常')
    }
    this.adjMat[i][j] = 0
    this.adjMat[j][i] = 0
  }

  // 打印邻接矩阵
  print(): void {
    console.log('顶点列表', this.vertices)
    console.log('邻接矩阵', this.adjMat)
  }
}

const vertices: number[] = [1, 3, 2, 5, 4]
const edges: number[][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 3],
  [2, 4],
  [3, 4],
]

const graph: GraphAdjMat = new GraphAdjMat(vertices, edges)
console.log('\n初始化后，图为')
graph.print()

/* 添加边 */
// 顶点 1, 2 的索引分别为 0, 2
graph.addEdge(0, 2)
console.log('\n添加边 1-2 后，图为')
graph.print()

/* 删除边 */
// 顶点 1, 3 的索引分别为 0, 1
graph.removeEdge(0, 1)
console.log('\n删除边 1-3 后，图为')
graph.print()

/* 添加顶点 */
graph.addVertex(6)
console.log('\n添加顶点 6 后，图为')
graph.print()

/* 删除顶点 */
// 顶点 3 的索引为 1
graph.removeVertex(1)
console.log('\n删除顶点 3 后，图为')
graph.print()
