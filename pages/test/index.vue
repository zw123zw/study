<template>
  <div>
    <div>test页面</div>
    <nuxt-link to="/">home</nuxt-link>
    <div @click="addTodo">addTodo</div>
    Counter: {{ counter }}
    <button @click="counter++">+</button>
    <button @click="counter--">-</button>
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
const { data: discounts, status } = await useAsyncData(
  "cart-discount",
  async () => {
    const [coupons, offers] = await Promise.all([
      $fetch("/cart/coupons"),
      $fetch("/cart/offers"),
    ]);
    return { coupons, offers };
  }
);
console.log(discounts.value);
console.log(status.value);

const counter = useState("counter", () => Math.round(Math.random() * 1000));

const websiteConfig = useState("config");
await callOnce(async () => {
  console.log('callOncecallOncecallOncecallOncecallOncecallOncecallOncecallOncecallOncecallOncecallOncecallOnce');
  
  websiteConfig.value = await $fetch("https://my-cms.com/api/website-config");
});
</script>
