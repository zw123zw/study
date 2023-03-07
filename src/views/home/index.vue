<template>
  <div>
    <p>首页</p>
    <test>
      <template v-slot:header>header</template>
      <template v-slot:default>default</template>
      <template v-slot:footer>footer</template>
    </test>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import mitt from 'mitt'
import type { Emitter } from 'mitt'
import test from './test.tsx'

type Events = {
  foo: string
  bar?: number
  resize: {
    detail: {
      width: number
      height: number
    }
  }
}

const emitter: Emitter<Events> = mitt<Events>()
console.log(emitter)

emitter.on('foo', e => console.log('foo', e))
emitter.on('bar', e => console.log('bar', e))
emitter.on('resize', e => console.log('resize', e))
setTimeout(() => {
  emitter.emit('foo', '213')
  emitter.emit('bar', 111)
  emitter.all.clear()
}, 2000)
</script>

<style lang="scss" scoped></style>
