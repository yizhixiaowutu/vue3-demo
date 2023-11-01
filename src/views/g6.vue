<template>
  <div class="g6-page">
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
// import G6, { Graph } from "@antv/g6";
import type { ModelConfig, EdgeConfig, IG6GraphEvent, Item } from "@antv/g6";
import { onMounted, reactive, ref } from "vue";
import { sop1, sop3, demoJson } from "./sop.js";

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

let graphRef = reactive({} as Graph);
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
  initG6();
  // createGraph();
  // sopNodeData.edges = handleSopNodeList(sop1).edges;
  // sopNodeData.nodes = handleSopNodeList(sop1).nodes;
  // sopNodeData.edges = handleSopNodeList(sop3).edges;
  // sopNodeData.nodes = handleSopNodeList(sop3).nodes;
  // handleNodesAndEdges();
  // renderGraph();
  // console.log("ss", sopNodeData);
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
    // node.style.lineWidth = 5;
    node.style.stroke = "RGBA(180, 216, 252, 1.00)";
    node.type = "rect";
    node.size = [maxWeight, 50];
    switch (node.class) {
      case "c0": {
        node.type = "circle";
        node.size = 30;
        break;
      }
      case "c1": {
        node.type = "rect";
        node.size = [35, 20];
        break;
      }
      case "c2": {
        node.type = "ellipse";
        node.size = [35, 20];
        break;
      }
    }
    // node.size = maxWeight;
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
  graphRef = new G6.Graph({
    container: "container",
    width: 800,
    height: 600,
    // 节点默认配置
    defaultNode: {
      labelCfg: {
        style: {
          fill: "#fff",
        },
      },
    },
    // 边默认配置
    defaultEdge: {
      labelCfg: {
        autoRotate: true,
      },
    },
    // 节点在各状态下的样式
    nodeStateStyles: {
      // hover 状态为 true 时的样式
      hover: {
        fill: "lightsteelblue",
      },
      // click 状态为 true 时的样式
      click: {
        stroke: "#000",
        lineWidth: 3,
      },
    },
    // 边在各状态下的样式
    edgeStateStyles: {
      // click 状态为 true 时的样式
      click: {
        stroke: "steelblue",
      },
    },
    // 布局
    layout: {
      type: "force",
      linkDistance: 100,
      preventOverlap: true,
      nodeStrength: -30,
      edgeStrength: 0.1,
    },
    // 内置交互
    modes: {
      default: ["drag-canvas", "zoom-canvas", "drag-node"],
    },
  });
  // graphRef = new G6.Graph({
  //   container: "container",
  //   plugins: [grid],
  //   width: 800,
  //   height: 600,
  //   animate: true,
  //   fitView: true,
  //   defaultNode: {
  //     // type: "ellipse",
  //     // size: [100, 40],
  //     labelCfg: {
  //       style: {
  //         fill: "RGBA(66, 158, 250, 1.00)",
  //         fontSize: 20,
  //       },
  //     },
  //   },
  //   defaultEdge: {
  //     type: "quadratic",
  //     labelCfg: {
  //       autoRotate: true,
  //       fontSize: 16,
  //     },
  //     style: {
  //       // endArrow: true,
  //       endArrow: {
  //         path: G6.Arrow.triangle(10, 20, 25),
  //         d: 25,
  //         fill: "RGBA(111, 180, 225, 1.00)",
  //       },
  //     },
  //   },
  //   layout: {
  //     type: "dagre",
  //     nodesep: 100,
  //   },
  //   modes: {
  //     default: [
  //       "drag-canvas",
  //       "zoom-canvas",
  //       "drag-node",
  //       {
  //         type: "tooltip",
  //         formatText(node: any) {
  //           let text = "";
  //           text = "环节: " + node.label + "<br/>";
  //           if (node.triggerList?.length > 0) {
  //             text += "触发器列表:<br/>";
  //             text += (node?.triggerList as TriggerNode[])
  //               ?.map((trigger, index) => {
  //                 return `${index + 1}: ${trigger.triggerName}<br/>`;
  //               })
  //               .join("");
  //           }
  //           return text;
  //         },
  //       },
  //       {
  //         type: "edge-tooltip",
  //         formatText(edge) {
  //           return (edge?.label as string) || "";
  //         },
  //       },
  //     ],
  //   },
  //   nodeStateStyles: {
  //     hover: {
  //       fill: "lightsteelblue",
  //     },
  //     click: {
  //       stroke: "pink",
  //       lineWidth: 3,
  //     },
  //   },
  //   edgeStateStyles: {
  //     click: {
  //       stroke: "steelblue",
  //     },
  //   },
  // });
};

const renderGraph = () => {
  const nodes = demoJson.nodes;
  const edges = demoJson.edges;
  nodes.forEach((node) => {
    if (!node.style) {
      node.style = {};
    }
    node.style.lineWidth = 1;
    node.style.stroke = "#666";
    node.style.fill = "steelblue";
    switch (node.class) {
      case "c0": {
        node.type = "circle";
        node.size = 30;
        break;
      }
      case "c1": {
        node.type = "rect";
        node.size = [35, 20];
        break;
      }
      case "c2": {
        node.type = "ellipse";
        node.size = [35, 20];
        break;
      }
    }
  });
  edges.forEach((edge) => {
    if (!edge.style) {
      edge.style = {};
    }
    edge.style.lineWidth = edge.weight;
    edge.style.opacity = 0.6;
    edge.style.stroke = "grey";
  });
  console.log("demoJson", demoJson);
  graphRef.data(demoJson);

  setTimeout(() => {
    graphRef.render();
  }, 500);
  // 监听鼠标进入节点
  graphRef.on("node:mouseenter", (e) => {
    const nodeItem = e.item as Item; // 获取鼠标进入的节点元素对象
    graphRef.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
  });
  // 监听鼠标离开节点
  graphRef.on("node:mouseleave", (e) => {
    const nodeItem = e.item as Item; // 获取鼠标离开的节点元素对象
    graphRef.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
  });
  // 点击节点
  graphRef.on("node:click", (e) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graphRef.findAllByState("node", "click");
    clickNodes.forEach((cn) => {
      graphRef.setItemState(cn, "click", false);
    });
    const nodeItem = e.item as Item; // 获取被点击的节点元素对象
    graphRef.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
  });

  // 点击边
  graphRef.on("edge:click", (e) => {
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graphRef.findAllByState("edge", "click");
    clickEdges.forEach((ce) => {
      graphRef.setItemState(ce, "click", false);
    });
    const edgeItem = e.item as Item; // 获取被点击的边元素对象
    graphRef.setItemState(edgeItem, "click", true); // 设置当前边的 click 状态为 true
  });
};

const initG6 = () => {
  const data = {
    nodes: [
      {
        id: "node1",
        x: 100, //节点x轴位置
        y: 100, //节点y轴位置
        size: 60, //图形尺寸
        type: "circle", //节点的形状
        label: "circle圆形", //节点内的文本名称
      },
      {
        id: "node2",
        x: 220,
        y: 100,
        size: [90, 50], //节点的长宽值
        type: "rect",
        label: "rect矩形",
      },
      {
        id: "node3",
        x: 350,
        y: 100,
        size: [80, 40],
        type: "ellipse",
        label: "ellipse椭圆",
        labelCfg: {
          position: "bottom",
          offset: 5,
        },
        style: {
          fill: "#fa8c16",
          stroke: "#000",
          lineWidth: 2,
        },
      },
      {
        id: "node4",
        x: 460,
        y: 100,
        size: [100, 80],
        type: "diamond",
        label: "diamond菱形",
      },
      {
        id: "node5",
        x: 600,
        y: 100,
        type: "triangle",
        label: "triangle三角形",
        labelCfg: {
          position: "right",
          offset: 5,
        },
      },
      {
        id: "node6",
        x: 220,
        y: 210,
        size: 65,
        type: "star",
        label: "star五角星",
      },
      {
        id: "node7",
        x: 350,
        y: 220,
        size: 60,
        type: "image",
        img: "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
        label: "image自定义图片",
      },
      {
        id: "node8",
        x: 550,
        y: 220,
        description: "描述文本xxxxxxxxxxx",
        type: "modelRect",
        label: "modelRect文本描述",
      },
    ],
    edges: [
      {
        source: "node1",
        target: "node2",
      },
      {
        source: "node2",
        target: "node3",
      },
      {
        source: "node3",
        target: "node4",
      },
      {
        source: "node4",
        target: "node5",
      },
      {
        source: "node1",
        target: "node6",
      },
      {
        source: "node6",
        target: "node7",
      },
      {
        source: "node7",
        target: "node8",
      },
      {
        source: "node8",
        target: "node5",
      },
    ],
  };
  const graph = new G6.Graph({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight,
    modes: {
      default: ["drag-canvas", "zoom-canvas", "drag-node"], // 允许拖拽画布、放缩画布、拖拽节点
    },
    defaultEdge: {
      shape: "polyline",
      style: {
        endArrow: true,
        lineWidth: 2,
        stroke: "#666",
      },
    },
  });
  graph.data(data);
  graph.render();
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
