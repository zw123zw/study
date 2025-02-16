<template>
  <div>动态路由</div>
</template>
<script setup lang="ts">
useHead({
  title: "My App 动态路由",
  meta: [{ name: "description", content: "My amazing site." }],
  bodyAttrs: {
    class: "test",
  },
  script: [{ innerHTML: "console.log('Hello world')" }],
});
</script>
