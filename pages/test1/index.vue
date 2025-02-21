<template>
  <div>
    <div>test111页面</div>
    <nuxt-link to="/">home</nuxt-link>
    <p>Current color: {{ color }}</p>

    <div>
    <h1>Mountains</h1>
    <LazyMountainsList v-if="show" />
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
  </div>
</template>

<script setup lang="ts">
const useColor = () => useState<string>('color', () => 'pink')
// ---cut-end---
const color = useColor() // Same as useState('color')

const show = ref(false)
</script>
