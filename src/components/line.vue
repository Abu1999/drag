<template>
  <div class="w-full h-full">
    <template v-for="line in lines">
      <div v-if="props.lineStatus[line] || false" :style="props.lineStatus[line]" class="line"
        :class="line.includes('x') ? 'xline' : 'yline'">
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const lines: string[] = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr']

const props = withDefaults(defineProps<{
  lineStatus: any
}>(), {
  lineStatus: { xt: false, xc: false, xb: false, yl: false, yc: false, yr: false, }
})

</script>

<style>
.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
}

.xline {
  width: 100%;
  height: 1px;
}

.yline {
  width: 1px;
  height: 100%;
}
</style>