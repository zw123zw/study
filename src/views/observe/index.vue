<template>
  <div>
    <form-input v-model="item.value" :options="options" v-for="(item, index) in fvalue" :key="index"></form-input>

    <button @click="submit">click</button>
  </div>
</template>

<script>
import FormInput from "./form-input";
export default {
  props: {},
  data() {
    return {
      fvalue: [
        {
          value: '123'
        },
        {
          value: '222'
        },
        {
          value: '333'
        },
      ],
    };
  },
  computed: {
    options: function () {
      return [];
    },
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.fvalue[0].value = '111111111111111'
    }, 2000);
  },
  watch: {},
  methods: {
    submit() {
      console.log(this.fvalue);
    },
  },
  components: { FormInput },
};
</script>

<style scoped lang="scss">
</style>
