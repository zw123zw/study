<template>
  <div>
    <p>首页</p>
    <test :name="name" :age="age" v-model:tableData="tableData">
      <template v-slot:header>header</template>
      <template v-slot:default>default</template>
      <template v-slot:footer>footer</template>
    </test>
    <div>{{ JSON.stringify(tableData) }}</div>
    <Markdown></Markdown>
    <div id="vs"></div>
    <Amap />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import mitt from 'mitt'
import type { Emitter } from 'mitt'
import test from './test'
import Markdown from './markdown.vue'
import Player from 'xgplayer'
import Amap from './Amap.tsx'

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

const name = ref<string>('测试')
const age = ref<number>(13)
setTimeout(() => {
  name.value = '测试123'
  age.value = 30
}, 2000)

const tableData = ref<Array<Record<string, any>>>([
  {
    name: '123',
    data: 111,
  },
  {
    name: '123111',
    data: 111222,
  },
])
setTimeout(() => {
  tableData.value = [
    {
      name: '123xxxfff',
      data: 111435,
    },
    {
      name: '123111zzzggg',
      data: 11122288,
    },
    {
      name: '12321zzggg',
      data: 111222345,
    },
    {
      name: '12321zzggg111',
      data: 111222777888,
    },
  ]
}, 2000)

onMounted(() => {
const player = new Player({
  id: 'vs',
  url: 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4',
})
})
</script>

<style lang="scss" scoped></style>
