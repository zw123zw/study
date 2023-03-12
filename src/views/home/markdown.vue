<template>
  <div>
    <MdEditor v-model="text" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const text = ref("# 3.9.6 (2022-12-19)\r\n\r\n### 🎫 Chores\r\n\r\n- 升级 `vite4` 版本\r\n\r\n### 🐞 Bug fixes\r\n\r\n- 修复 `tailwind.css` 错误的引入方式导致 `vite` 的 `hmr` 慢的问题\r\n\r\n### 🍏 Perf\r\n\r\n- 更新 [@pureadmin/theme](https://github.com/pure-admin/pure-admin-theme) 至最新版，带来更友好的类型提示\r\n- 优化 [PureTableBar](https://github.com/xiaoxian521/vue-pure-admin/tree/main/src/components/RePureTableBar) 组件\r\n- 优化系统管理页面业务代码，带来更好的代码参考")
</script>

<style lang="scss" scoped></style>
