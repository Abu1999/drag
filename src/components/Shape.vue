<template>
  <div class="w-full h-full" :class="{ active: props.active }" :style="componentStore().getStyle[props.index].data.style">
    <div v-for="(item, index) in  (props.active ? pointList : []) " :key="item" :style="getPointStyle(item)"
      class="shape-point" @mousedown="(e) => changeEl(e, item)">
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { componentStore } from '@/stores'



const emit = defineEmits<{
  (e: 'changeStyle', data: any): void
}>()


const props = defineProps<{
  active: boolean,
  index: number
  isDrag: boolean
}>()


const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']
const cursorList = {
  lt: 'nw',
  t: 'n',
  rt: 'ne',
  r: 'e',
  rb: 'se',
  b: 's',
  lb: 'sw',
  l: 'w',
} as any


const getPointStyle = (point: string) => {
  let { width, height } = componentStore().getData[props.index].data.style
  const hasT = /t/.test(point)
  const hasB = /b/.test(point)
  const hasL = /l/.test(point)
  const hasR = /r/.test(point)
  let newLeft: number | string = 0
  let newTop: number | string = 0

  // 四个角的点
  if (point.length === 2) {
    newLeft = hasL ? 0 : width
    newTop = hasT ? 0 : height
  } else {
    // 上下两点的点，宽度居中
    if (hasT || hasB) {
      newLeft = Number(width) / 2
      newTop = hasT ? 0 : height
    }

    // 左右两边的点，高度居中
    if (hasL || hasR) {
      newLeft = hasL ? 0 : width
      newTop = Math.floor(Number(height) / 2)
    }
  }

  const style = {
    marginLeft: '-4px',
    marginTop: '-4px',
    left: `${newLeft}px`,
    top: `${newTop}px`,
    cursor: cursorList[point] + '-resize',
  }

  return style
}


let startX: any, startY: any,
  startW: any, startH: any,
  startT: any, startL: any;

// 改变元素
const changeEl = (e: any, point: string) => {
  let { width, height, top, left, border } = componentStore().getData[props.index].data.style

  if (props.isDrag) return

  startX = e.clientX
  startY = e.clientY
  startW = width
  startH = height
  startT = top
  startL = left

  const mousemove = (el: any) => {
    if (el.button === 0) { // 0 表示鼠标左键
      const hasT = /t/.test(point)
      const hasB = /b/.test(point)
      const hasL = /l/.test(point)
      const hasR = /r/.test(point)

      // 在这里添加你想要执行的代码
      const ay = el.clientY - startY
      const ax = el.clientX - startX

      if (hasL) {
        left = (startL + ax) < 0 ? 0 : (startL + ax)
        width = (startW - ax) < 0 ? 0 : (startW - ax)
      }
      if (hasR) {
        width = (startW + ax) < 0 ? 0 : (startW + ax)

      }

      if (hasT) {
        top = (startT + ay) < 0 ? 0 : (startT + ay)
        height = (startH - ay) < 0 ? 0 : (startH - ay)
      }
      if (hasB) {
        height = (startH + ay) < 0 ? 0 : (startH + ay)
      }

      componentStore().getData[props.index].data.style = { width, height, top, left, border }
      console.log(width, height);
    }
  }


  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', mousemove)
  })
}



</script>

<style scoped>
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}

.active {
  border: 1px solid #59c7f9;
}
</style>