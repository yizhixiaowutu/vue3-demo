<template>
  <div class="g6-page">
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
import G6, { Graph } from "@antv/g6";
import type { ModelConfig, EdgeConfig, IG6GraphEvent, Item } from "@antv/g6";
import { onMounted, reactive, ref } from "vue";
import { sop1 } from "./sop.js";

interface SopNode {
  sopNodeCode: string;
  processCode: string;
  processType: string;
  processName: string;
  nextNodeList: string[];
  triggerList: TriggerNode[];
}
interface TriggerNode {
  sopNodeCode: string;
  triggerCode: string;
  triggerName: string;
  nextNodeList: string[];
}

// <{ nodes: ModelConfig[]; edges: EdgeConfig[] }>
const sopNodeData = reactive<{ nodes: any[]; edges: any[] }>({
  nodes: [],
  edges: [],
});

const handleSopNodeList = (sopList: SopNode[]) => {
  const nodes = [] as any[];
  const edges = [] as any[];
  // 处理源数据
  sopList.forEach((node: SopNode) => {
    const { sopNodeCode, processName, nextNodeList, triggerList } = node;

    // 创建节点对象
    const nodeObj = {
      id: sopNodeCode,
      label: processName,
      triggerList: triggerList,
    };
    nodes.push(nodeObj);

    if (nextNodeList && nextNodeList.length > 0) {
      // 遍历nextNodeList创建边对象
      nextNodeList.forEach((nextNode) => {
        const edge = {
          source: sopNodeCode,
          target: nextNode,
          label: "",
        };

        // 查找对应的触发器信息
        const trigger = triggerList.find(
          (trigger: any) =>
            trigger.sopNodeCode === sopNodeCode &&
            trigger.nextNodeList[0] === nextNode
        );

        if (trigger) {
          edge.label = trigger.triggerName;
        }

        edges.push(edge);
      });
    }
  });
  return { nodes, edges };
};

const grid = new G6.Grid();
onMounted(() => {
  sopNodeData.edges = handleSopNodeList(sop1).edges;
  sopNodeData.nodes = handleSopNodeList(sop1).nodes;
  handleNodesAndEdges();
  createGraph();
});

const handleNodesAndEdges = () => {
  let maxWeight = 0;
  sopNodeData.nodes.forEach((node) => {
    if (node.label.length * 10 > maxWeight) {
      maxWeight = node.label.length * 10;
    }
  });
  sopNodeData.nodes.forEach((node) => {
    if (!node.style) {
      node.style = {};
    }
    node.style.lineWidth = 5;
    node.style.stroke = "RGBA(180, 216, 252, 1.00)";
    node.size = maxWeight;
  });
  sopNodeData.edges.forEach((edge) => {
    if (!edge.style) {
      edge.style = {};
    }
    edge.style.lineWidth = edge?.weight || 2;
    edge.style.stroke = "rgba(88, 181, 230, 1.00)";
  });
};
// 实例化 Image Minimap 插件
const createGraph = () => {
  const graph = new G6.Graph({
    container: "container",
    plugins: [grid],
    width: 800,
    height: 600,
    animate: true,
    fitView: true,
    defaultNode: {
      type: "ellipse",
      labelCfg: {
        style: {
          fill: "RGBA(66, 158, 250, 1.00)",
          fontSize: 20,
        },
      },
    },
    defaultEdge: {
      labelCfg: {
        autoRotate: true,
        fontSize: 16,
      },
      style: {
        endArrow: true,
      },
    },
    layout: {
      type: "dagre",
      nodesep: 100,
    },
    modes: {
      default: [
        "drag-canvas",
        "zoom-canvas",
        "drag-node",
        {
          type: "tooltip",
          formatText(node: any) {
            let text = "";
            text = "环节: " + node.label + "<br/>";
            if (node.triggerList?.length > 0) {
              text += "触发器列表:<br/>";
              text += (node?.triggerList as TriggerNode[])
                ?.map((trigger, index) => {
                  return `${index + 1}: ${trigger.triggerName}<br/>`;
                })
                .join("");
            }
            return text;
          },
        },
        {
          type: "edge-tooltip",
          formatText(edge) {
            return (edge?.label as string) || "";
          },
        },
      ],
    },
    nodeStateStyles: {
      hover: {
        fill: "lightsteelblue",
      },
      click: {
        stroke: "pink",
        lineWidth: 3,
      },
    },
    edgeStateStyles: {
      click: {
        stroke: "steelblue",
      },
    },
  });
  graph.data(sopNodeData);
  graph.render();

  // 监听鼠标进入节点
  graph.on("node:mouseenter", (e) => {
    const nodeItem = e.item as Item; // 获取鼠标进入的节点元素对象
    graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
  });
  // 监听鼠标离开节点
  graph.on("node:mouseleave", (e) => {
    const nodeItem = e.item as Item; // 获取鼠标离开的节点元素对象
    graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
  });
  // 点击节点
  graph.on("node:click", (e) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState("node", "click");
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, "click", false);
    });
    const nodeItem = e.item as Item; // 获取被点击的节点元素对象
    graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
  });

  // 点击边
  graph.on("edge:click", (e) => {
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graph.findAllByState("edge", "click");
    clickEdges.forEach((ce) => {
      graph.setItemState(ce, "click", false);
    });
    const edgeItem = e.item as Item; // 获取被点击的边元素对象
    graph.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
  });
};
</script>

<style lang="scss" scoped>
/* 提示框的样式 */
.g6-page {
  :deep(#container) {
    .g6-tooltip {
      border: 1px solid #e2e2e2;
      border-radius: 4px;
      font-size: 12px;
      color: #545454;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px 8px;
      box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    }
  }
}
</style>
