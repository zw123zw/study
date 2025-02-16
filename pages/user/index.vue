<template>
  <nuxt-link to="/">首页</nuxt-link>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Meet Nuxt',
  description: 'The Intuitive Vue Framework.'
})
definePageMeta({
  layout: "blog",
});

const route = useRoute();

const runtimeConfig = useRuntimeConfig();
console.log(runtimeConfig);
</script>
