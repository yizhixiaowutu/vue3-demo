<template>
  <div class="g6-page">
    <div id="container"></div>
  </div>
</template>

<script setup lang="ts">
import G6, { Graph } from "@antv/g6";
import type { ModelConfig, EdgeConfig, IG6GraphEvent, Item } from "@antv/g6";
import { onMounted, reactive, ref } from "vue";
import demoJson from "./demo.json";
console.log("demoJson", demoJson);
// 传入数据
const originData = [
  {
    sopNodeCode: "SOPNODE20231019LHCBD7P8",
    processCode: "8a769500727d1cae01727d1caf270001",
    processType: 0,
    processName: "立单环节",
    nextNodeList: ["SOPNODE20231019TJUXRFYN"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE20231019LHCBD7P8",
        triggerCode: "TRIGGER20231019QK0AGEAF",
        triggerName: "跳转立单采集环节",
        nextNodeList: ["SOPNODE20231019TJUXRFYN"],
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE20231019JBTT9U2I",
    processCode: "8a769500727d1cae01727d1d617f0007",
    processType: 99,
    processName: "结束环节",
    nextNodeList: null,
    triggerList: [
      {
        sopNodeCode: "SOPNODE20231019JBTT9U2I",
        triggerCode: "TRIGGER202310190GNHGKN2",
        triggerName: "关单",
        nextNodeList: null,
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE20231019SGJUI0AJ",
    processCode: "8a769500727d1cae01727d1da238000d",
    processType: 999,
    processName: "全局环节",
    nextNodeList: null,
    triggerList: null,
  },
  {
    sopNodeCode: "SOPNODE20231019TJUXRFYN",
    processCode: "HJ202310191W2JYS0I",
    processType: 1,
    processName: "立单采集",
    nextNodeList: ["SOPNODE202310193QGYKQBY"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE20231019TJUXRFYN",
        triggerCode: "TRIGGER20231019MEOSGF2Y",
        triggerName: "111",
        nextNodeList: ["SOPNODE202310193QGYKQBY"],
      },
    ],
  },
  {
    sopNodeCode: "SOPNODE202310193QGYKQBY",
    processCode: "HJ20231019JXNJHGVO",
    processType: 10,
    processName: "自定义1",
    nextNodeList: ["SOPNODE20231019JBTT9U2I"],
    triggerList: [
      {
        sopNodeCode: "SOPNODE202310193QGYKQBY",
        triggerCode: "TRIGGER202310197ARNBAUY",
        triggerName: "999",
        nextNodeList: ["SOPNODE20231019JBTT9U2I"],
      },
    ],
  },
];

// <{ nodes: ModelConfig[]; edges: EdgeConfig[] }>
const sopNodeData = reactive<{ nodes: any[]; edges: any[] }>({
  nodes: [],
  edges: [],
});
sopNodeData.nodes = demoJson.nodes;
sopNodeData.edges = demoJson.edges;
// sopNodeData.nodes = originData.map((item, index) => {
//   return {
//     id: item.sopNodeCode,
//     label: item.processName,
//     // x: 150 * (index + 1),
//     // y: 150,
//   };
// });
// sopNodeData.edges = originData
//   .filter((i) => i.nextNodeList?.length)
//   .map((item) => {
//     return {
//       source: item.sopNodeCode,
//       target: item.nextNodeList?.[0],
//       label: item.triggerList?.[0].triggerName,
//       labelCfg: {
//         autoRotate: true,
//       },
//     };
//   });

const miniMap = new G6.Minimap({
  size: [100, 100],
  className: "minimap",
  type: "delegate",
});
const grid = new G6.Grid();
onMounted(() => {
  handleNodesAndEdges();
  createGraph();
});

const handleNodesAndEdges = () => {
  sopNodeData.nodes.forEach((node) => {
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
  sopNodeData.edges.forEach((edge) => {
    if (!edge.style) {
      edge.style = {};
    }
    edge.style.lineWidth = edge.weight;
    edge.style.opacity = 0.6;
    edge.style.stroke = "grey";
  });
};
// 实例化 Image Minimap 插件
const imageMinimap = new G6.ImageMinimap({
  width: 200,
  graphImg:
    "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ",
});
const createGraph = () => {
  const graph = new G6.Graph({
    container: "container",
    plugins: [
      // miniMap,
      imageMinimap,
      grid,
    ],
    width: 800,
    height: 600,
    animate: true,
    // fitView: true,
    defaultNode: {
      labelCfg: {
        style: {
          fill: "#fff",
        },
      },
    },
    defaultEdge: {
      labelCfg: {
        autoRotate: true,
      },
    },
    layout: {
      type: "force",
      linkDistance: 100,
      preventOverlap: true,
      nodeStrength: -30,
      edgeStrength: 0.1,
    },
    modes: {
      default: [
        "drag-canvas",
        "zoom-canvas",
        "drag-node",
        {
          type: "tooltip",
          formatText(model) {
            const text =
              "label: " + model.label + "<br/> class: " + model.class;
            return text;
          },
        },
        {
          type: "edge-tooltip",
          formatText(model) {
            // 边提示框文本内容
            const text =
              "source: " +
              model.source +
              "<br/> target: " +
              model.target +
              "<br/> weight: " +
              model.weight;
            return text;
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
    const nodeItem = e.item; // 获取鼠标进入的节点元素对象
    graph.setItemState(nodeItem, "hover", true); // 设置当前节点的 hover 状态为 true
  });
  // 监听鼠标离开节点
  graph.on("node:mouseleave", (e) => {
    const nodeItem = e.item; // 获取鼠标离开的节点元素对象
    graph.setItemState(nodeItem, "hover", false); // 设置当前节点的 hover 状态为 false
  });
  // 点击节点
  graph.on("node:click", (e) => {
    // 先将所有当前是 click 状态的节点置为非 click 状态
    const clickNodes = graph.findAllByState("node", "click");
    clickNodes.forEach((cn) => {
      graph.setItemState(cn, "click", false);
    });
    const nodeItem = e.item; // 获取被点击的节点元素对象
    graph.setItemState(nodeItem, "click", true); // 设置当前节点的 click 状态为 true
  });

  // 点击边
  graph.on("edge:click", (e) => {
    // 先将所有当前是 click 状态的边置为非 click 状态
    const clickEdges = graph.findAllByState("edge", "click");
    clickEdges.forEach((ce) => {
      graph.setItemState(ce, "click", false);
    });
    const edgeItem = e.item; // 获取被点击的边元素对象
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
