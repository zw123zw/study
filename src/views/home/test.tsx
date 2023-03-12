import { defineComponent, ref, computed, reactive } from 'vue'
import type { PropType } from 'vue'
import { useModel } from './utils'

export default defineComponent({
  emits: [],
  props: {
    name: {
      type: String as PropType<String>,
    },
    age: {
      type: Number as PropType<Number>,
    },
    tableData: {
      type: Array as PropType<Array<any>>,
      default: () => [],
    },
  },
  setup(props, { emit, slots }) {
    const name = ref<string>('tsx组件')

    const defaultSlots = <div>默认插槽内容</div>
    const footerSlots = <div>默认底部插槽内容</div>
    const headerSlots = <div>默认头部插槽内容</div>

    const textValue = reactive({
      name: computed(() => props.name),
      age: computed(() => props.age),
    })

    const tableDataValue = useModel<any>(props, emit, 'tableData', value => {
      return value
    })
    setTimeout(() => {
      tableDataValue.value = [
        {
          name: '123xxx',
          data: 111777,
        },
        {
          name: '123111zzz',
          data: 111222123,
        },
        {
          name: '999xssad',
          data: 11122265665,
        },
      ]
    }, 1000)

    return () => (
      <>
        {slots.header ? slots.header() : headerSlots}
        <div>{name.value}</div>
        {slots.default ? slots.default() : defaultSlots}
        <div>111222</div>
        {slots.footer ? slots.footer() : footerSlots}
        <div>{textValue.name}</div>
        <div>{textValue.age}</div>
        {tableDataValue.value.map(item => {
          return (
            <div>
              <span>name:{item.name} </span>
              <span>data:{item.data}</span>
            </div>
          )
        })}
      </>
    )
  },
})
