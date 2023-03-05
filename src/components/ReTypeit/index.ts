import { h, defineComponent } from 'vue'
import TypeIt from 'typeit'
import { defaultDocument } from '@vueuse/core'

// 打字机效果组件
export default defineComponent({
  name: 'TypeIt',
  props: {
    speed: {
      type: Number,
      default: 200,
    },
    values: {
      type: Array,
      defalut: [],
    },
    className: {
      type: String,
      default: 'type-it',
    },
    cursor: {
      type: Boolean,
      default: true,
    },
  },
  render() {
    return h('span', { class: this.className }, { default: () => [] })
  },
  mounted() {
    new TypeIt(`.${this.className}`, {
      strings: this.values,
      speed: this.speed,
      cursor: this.cursor,
    }).go()
  },
})
