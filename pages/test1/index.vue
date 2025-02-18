<template>
  <div>
    <div>test111页面</div>
    <nuxt-link to="/">home</nuxt-link>
    <p>Current color: {{ color }}</p>
  </div>
</template>

<script setup lang="ts">
const useColor = () => useState<string>('color', () => 'pink')
// ---cut-end---
const color = useColor() // Same as useState('color')

</script>
