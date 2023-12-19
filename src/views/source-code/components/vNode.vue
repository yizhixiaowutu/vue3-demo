<template>
  <div class="vNode">
    <h1>vNode</h1>
    <div class="container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const myComponent = {
  render() {
    return {
      tag: 'div',
      props: {
        onClick: () => {
          console.log('这是 onClick 函数')
        },
      },
      children: [
        {
          tag: 'span',
          children: '这是 span 标签',
        },
        {
          tag: 'a',
          props: {
            onClick: () => {
              console.log('这是 a 标签的 onClick 函数')
            },
          },
          children: '这是 a 标签',
        },
      ],
    }
  },
}

function renderer(vNode, container) {
  if (typeof vNode.tag === 'string') {
    mountElement(vNode, container)
  } else if (typeof vNode.tag === 'object') {
    mountComponent(vNode, container)
  }
}

function mountElement(vNode, container) {
  const el = document.createElement(vNode.tag)

  for (const key in vNode.props) {
    // 以 on 开头的属性添加事件监听
    if (/^on/.test(key)) {
      el.addEventListener(key.slice(2).toLowerCase(), vNode.props[key])
    }
  }
  if (typeof vNode.children === 'string') {
    el.appendChild(document.createTextNode(vNode.children))
  } else if (Array.isArray(vNode.children)) {
    vNode.children.forEach((v) => {
      renderer(v, el)
    })
  }
  container.appendChild(el)
}

function mountComponent(vNode, container) {
  const subtree = vNode.tag.render()
  renderer(subtree, container)
}

onMounted(() => {
  const vNode = {
    tag: myComponent,
  }
  renderer(vNode, document.querySelector('.container'))
})
</script>

<style scoped></style>
