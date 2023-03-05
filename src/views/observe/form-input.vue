<template>
  <div>
    <input type="text" :value="fdata" @input="change" />
  </div>
</template>

<script>
export default {
  props: {
    fdata: String,
    options: Array,
  },
  model: {
    prop: 'fdata',
    event: 'change',
  },
  data() {
    return {}
  },
  created() {},
  watch: {},
  methods: {
    change($event) {
      this.$emit('change', $event.target.value)
    },
  },
  components: {},
}
</script>

<style scoped lang="scss"></style>
