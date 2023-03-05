<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="phoneRules" size="large">
    <Motion>
      <el-form-item prop="phone">
        <el-input
          clearable
          v-model="ruleForm.phone"
          placeholder="手机号码"
          :prefix-icon="useRenderIcon(Iphone)"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="100">
      <el-form-item prop="verifyCode">
        <div class="w-full flex justify-between">
          <el-input
            clearable
            v-model="ruleForm.verifyCode"
            placeholder="短信验证码"
            :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
          />
          <el-button :disabled="isDisabled" class="ml-2">
            {{ text.length > 0 ? text + '秒后重新获取' : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item>
        <el-button
          class="w-full"
          size="default"
          type="primary"
          :loading="loading"
        >
          登录
        </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="200">
      <el-form-item>
        <el-button class="w-full" size="default" @click="onBack">
          返回
        </el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits } from 'vue'
import { phoneRules } from '@/utils/rule'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Iphone from '@iconify-icons/ep/iphone'

const emit = defineEmits(['onBack'])

const ruleFormRef = ref(null)

const ruleForm = reactive({
  phone: '',
  verifyCode: '',
})

const onBack = () => {
  emit('onBack', 0)
}

const isDisabled = ref<boolean>(false)
const text = ref<string>('')
</script>

<style lang="scss" scoped></style>
