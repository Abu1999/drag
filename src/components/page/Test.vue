<template>
  <div :style="props.style">
    {{ props.state.data }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  style?: {
    width?: string
    height?: string
    border?: string
  }
  state: { data?: string }
}

const props = withDefaults(defineProps<Props>(), {
  style: () => ({ width: '100px', height: '30px', border: '1px solid red' }),
  propValue: () => ({ text: '测试' })
})

</script>

<style scoped></style>