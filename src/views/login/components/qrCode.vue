<template>
  <div>
    <Motion class="-mt-2 -mb-2"><ReQrcode text="模拟测试" /></Motion>
    <Motion :delay="100">
      <el-divider>
        <p class="text-gray-500 text-xs">扫码后点击"确认"，即可完成登录</p>
      </el-divider>
    </Motion>
    <Motion :delay="150">
      <el-button class="w-full mt-4" @click="onBack">返回</el-button>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import ReQrcode from '@/components/ReQrcode'

const emit = defineEmits(['onBack'])

const onBack = () => {
  emit('onBack', 0)
}
</script>

<style lang="scss" scoped></style>
