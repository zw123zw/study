import { computed } from 'vue'

// 封装v-model
export function useModel<T>(
  props: any,
  emit: Function,
  name = 'modelValue',
  translater?: Function
) {
  return computed<T>({
    get() {
      return props[name]
    },
    set(value) {
      emit(`update:${name}`, translater ? translater(value) : value)
    },
  })
}
