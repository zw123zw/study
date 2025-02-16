<template>
  <div>
    <AppAlert>components测试</AppAlert>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  // or as a function
  titleTemplate: (productCategory) => {
    return productCategory ? `${productCategory} - Site Title` : "Site Title";
  },
});
</script>
