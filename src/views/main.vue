<template>
  <div class="h-[100vh]">
    <!-- {{ componentData }} -->
    <div class="flex w-full h-full">
      <div class="w-[200px] h-full flex flex-col justify-between">
        <div>
          <el-button data-component="测试" @dragstart="handleDragStart" :draggable="true">测试</el-button>
        </div>
        <div class="h-[40vh] space-y-1">
          <template v-for="(item, index) in componentData" :key="index">
            <div>
              {{ item.type + item.data.style.left }}
            </div>
          </template>
        </div>
      </div>
      <div class="flex-1">
        <DropMap></DropMap>
      </div>
      <div class="w-[200px]">
        <div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import ScreenMap from '@/components/ScreenMap.vue'
import { reactive } from 'vue';
import DropMap from './dropmap.vue'
import { componentStore } from '@/stores'


const componentData = reactive(componentStore().getData)

// 拖拽开始
const handleDragStart = (e: any) => {
  e.dataTransfer.setData('component', e.target.dataset.component)
}



</script>

<style scoped ></style>