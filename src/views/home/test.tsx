import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: [],
  props: {},
  setup(props, { emit, slots }) {
    const name = ref<string>('tsx组件')

    const defaultSlots = <div>默认插槽内容</div>
    const footerSlots = <div>默认底部插槽内容</div>
    const headerSlots = <div>默认头部插槽内容</div>

    return () => (
      <>
        {slots.header ? slots.header() : headerSlots}
        <div>{name.value}</div>
        {slots.default ? slots.default() : defaultSlots}
        <div>111222</div>
        {slots.footer ? slots.footer() : footerSlots}
      </>
    )
  },
})
