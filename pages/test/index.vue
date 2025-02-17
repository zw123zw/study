<template>
  <div>
    <div>test页面</div>
    <nuxt-link to="/">home</nuxt-link>
    <div @click="addTodo">addTodo</div>
  </div>
</template>

<script setup lang="ts">
const { data } = await useFetch("/api/data");
console.log(data.value);

const headers = useRequestHeaders(["cookie"]);
console.log(headers.value);

async function addTodo() {
  const todo = await $fetch("/api/todos", {
    method: "POST",
    body: {
      // My todo data
    },
  });
}
const { data: discounts, status } = await useAsyncData('cart-discount', async () => {
  const [coupons, offers] = await Promise.all([
    $fetch('/cart/coupons'),
    $fetch('/cart/offers')
  ])
  return { coupons, offers }
})
console.log(discounts.value);
console.log(status.value);

</script>
