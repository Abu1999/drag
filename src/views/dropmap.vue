<template>
  <div class="w-full h-full ">
    <div @drop="handleDrop" @dragover="e => e.preventDefault()" class="w-full h-full border overflow-hidden relative"
      @click="activeId = ''">
      <template v-for="(item, index) in  componentStyle" :key="index">
        <Shape v-if="item && Object.keys(item).length" class="absolute" :index="index"
          :active="activeId == item.data.id ? true : false" @click="(e: any) => clickShape(e, item)" :isDrag="isDrag">

          <component class="cursor-move" :is="dom[item?.component]" :id="item.data.id" :data-id="item.data.id"
            :state="item?.data.state" :style="item?.data.style" @mousedown="(e: any) => { showSetting(e, item) }"
            :draggable="false" />

        </Shape>
      </template>
      <Line :key="key" :lineStatus="lineStatus"></Line>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, shallowReactive } from 'vue';
import { Test } from "@/components/page"
import { ElementStyle } from '@/components/type'
import { componentStore } from '@/stores'
import Shape from '@/components/Shape.vue'

import Line from '@/components/line.vue'


// 解决刷新组件数据不渲染问题
const dom: any = shallowReactive({ Test })
const componentStyle = computed(() => componentStore().getStyle)


let activeId: any = ref('')

const isDrag = ref(false)

let startX: any,
  startY: any // 初始位置记录

// 拖拽结束
const handleDrop = (e: any) => {
  e.stopPropagation()
  e.preventDefault()
  const type = e.dataTransfer.getData('component')

  isDrag.value = false
  // 拖动组件直接返回
  if (!type) return
  // 添加组件赋予id
  const comId = type + '_' + componentStore().getData.length
  let data = new ElementStyle({ id: comId })

  data.style.left = e.offsetX
  data.style.top = e.offsetY

  console.log(data);

  // 添加元素
  componentStore().pushData({ component: "Test", data, type })

  console.log(componentStore().getStyle);
}

// 组件点选
const clickShape = (e: any, item: any) => {
  e.stopPropagation();
  e.preventDefault();
  activeId.value = item.data.id
}


// 拖拽开始
const showSetting = (e: any, item: any) => {
  isDrag.value = true

  activeId.value = item.data.id

  // 记录鼠标的起始位置
  startX = e.clientX
  startY = e.clientY

  document.addEventListener('mousemove', elDrag)
  document.addEventListener('mouseup', () => {
    isDrag.value = false
    lineStatus = { xt: false, xc: false, xb: false, yl: false, yc: false, yr: false, }
    document.removeEventListener('mousemove', elDrag)
  })

}



let lineStatus: any = reactive({})
let key: any = ref(0)

let lineLeft = ref(0)
let lineTop = ref(0)
let is: string[] = reactive([])

const getNum = (str: string) => {
  return Number(str.replace(/px/, ''))
}

// 辅助线显示
const showLines = (e: any) => {
  componentStore().getData.forEach((list: any) => {
    const { left, width, top, height } = list.data.style

    const ylnum = getNum(e.target.style.left) - left
    const yrnum = getNum(e.target.style.left) - left - width
    const xtnum = getNum(e.target.style.top) - top
    const xbnum = getNum(e.target.style.top) - top - height

    if (Math.abs(e.clientX - startX) < 4 && Math.abs(e.clientY - startY) < 4) {
      if (activeId.value != list.data.id && Math.abs(ylnum) < 4) {
        is.push('yl')
        left.value = left
      }
      if (activeId.value != list.data.id && Math.abs(yrnum) < 4) {
        is.push('yr')
        lineLeft.value = left + width
      }
      if (activeId.value != list.data.id && Math.abs(xtnum) < 4) {
        is.push('xt')
        lineTop.value = top
      }
      if (activeId.value != list.data.id && Math.abs(xbnum) < 4) {
        is.push('xb')
        lineTop.value = top + height
      }
    }

  });
}

// 元素被拖拽
const elDrag = (e: any) => {

  isDrag.value = true

  e.stopPropagation()
  e.preventDefault()
  is = []

  showLines(e)

  componentStore().getData.map((list: any) => {
    if (activeId.value == list.data.id) {
      // 判断位置显示辅助线
      if (is.length) {
        is.forEach((e: string) => {
          if (e.includes('y')) {
            lineStatus[e] = {}
            lineStatus[e] = { left: lineLeft.value + 'px' }
            list.data.style.left = lineLeft.value
          }

          if (e.includes('x')) {
            lineStatus[e] = {}
            lineStatus[e] = { top: lineTop.value + 'px' }
            list.data.style.top = lineTop.value
          }

        })
        key++
      } else {
        lineStatus = { xt: false, xc: false, xb: false, yl: false, yc: false, yr: false, }
        // 移动对应元素
        list.data.style.left = e.clientX - startX + list.data.style.left
        list.data.style.top = e.clientY - startY + list.data.style.top
        startX = e.clientX
        startY = e.clientY
      }

      return list
    }

  })


}


</script>

<style lang="scss" scoped></style>../components/type