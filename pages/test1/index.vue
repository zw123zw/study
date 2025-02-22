<template>
  <div>
    <div>test111页面</div>
    <nuxt-link to="/">home</nuxt-link>
    <p>Current color: {{ color }}</p>

    <div>
    <h1>Mountains</h1>
    <LazyBody v-if="show">LazyBody</LazyBody>
    <LazyTitle v-if="show">LazyTitle</LazyTitle>
    <button v-if="!show" @click="show = true">Show List</button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const useColor = () => useState<string>('color', () => 'pink')
// ---cut-end---
const color = useColor() // Same as useState('color')

const show = ref(false)

console.log(NuxtLink);

</script>
