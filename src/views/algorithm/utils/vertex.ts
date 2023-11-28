/**
 * 顶点类 Vertex
 */

class Vertex {
  val: number
  constructor(val: number) {
    this.val = val
  }

  /* 输入值列表 vals ，返回顶点列表 vets */
  public static vals2Vertexes(vals: number[]): Vertex[] {
    const vets: Vertex[] = []
    for (let i = 0; i < vals.length; i++) {
      vets[i] = new Vertex(vals[i])
    }
    return vets
  }

  /* 输入顶点列表 vets ，返回值列表 vals */
  public static vertexes2Vals(vets: Vertex[]): number[] {
    const vals: number[] = []
    for (const vet of vets) {
      vals.push(vet.val)
    }
    return vals
  }
}

export { Vertex }
