<template>
  <div>
    <AppAlert>components测试</AppAlert>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const description = ref("My amazing site.");

useHead({
  titleTemplate: (productCategory) => {
    return productCategory ? `${productCategory} - Site Title` : "Site Title";
  },
  meta: [{ name: "description", content: description }],
});
</script>
