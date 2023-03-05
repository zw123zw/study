<template>
  <section class="login-container">
    <img class="wave" src="@/assets/bg.png" alt="" />
    <div class="login-container-header flex justify-center items-center">
      <el-switch
        v-model="dataTheme"
        @change="dataThemeChange"
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        inline-prompt
      />
      <el-dropdown trigger="click">
        <globalization
          class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300"
        ></globalization>
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'zh')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'zh')]"
              @click="translationCh"
            >
              <IconifyIconOffline
                class="check-zh"
                v-show="locale === 'zh'"
                :icon="Check"
              />
              简体中文
            </el-dropdown-item>
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'en')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]"
              @click="translationEn"
            >
              <span class="check-en" v-show="locale === 'en'">
                <IconifyIconOffline :icon="Check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="login-container-wrap flex items-center justify-between">
      <component :is="illustration"></component>
      <div class="login-form">
        <component class="avatar" :is="avatar"></component>
        <Motion>
          <h2 class="outline-none">
            <TypeIt :values="[title]" :cursor="false" :speed="150" />
          </h2>
        </Motion>

        <el-form
          v-if="currentPage === 0"
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="loginRules"
          size="large"
        >
          <Motion :delay="100">
            <el-form-item
              :rules="[
                {
                  required: true,
                  message: '请输入账号',
                  trigger: 'blur',
                },
              ]"
              prop="username"
            >
              <el-input
                clearable
                v-model="ruleForm.username"
                placeholder="账号"
                :prefix-icon="useRenderIcon(User)"
              />
            </el-form-item>
          </Motion>

          <Motion :delay="150">
            <el-form-item prop="password">
              <el-input
                clearable
                show-password
                v-model="ruleForm.password"
                placeholder="密码"
                :prefix-icon="useRenderIcon(Lock)"
              />
            </el-form-item>
          </Motion>

          <Motion :delay="200">
            <el-form-item prop="verifyCode">
              <el-input
                clearable
                v-model="ruleForm.verifyCode"
                placeholder="验证码"
                :prefix-icon="useRenderIcon('ri:shield-keyhole-line')"
              >
                <template v-slot:append>
                  <ReImageVerify v-model:code="imgCode" />
                </template>
              </el-input>
            </el-form-item>
          </Motion>

          <Motion :delay="250">
            <el-form-item>
              <div class="w-full h-[20px] flex justify-between items-center">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
                <el-button link type="primary">忘记密码?</el-button>
              </div>
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                @click="onLogin(ruleFormRef)"
              >
                登录
              </el-button>
            </el-form-item>
          </Motion>

          <Motion :delay="300">
            <el-form-item>
              <div class="w-full h-[20px] flex justify-between items-center">
                <el-button
                  v-for="(item, index) in operates"
                  :key="index"
                  class="w-full mt-4"
                  size="default"
                  @click="changeOperates(index + 1)"
                >
                  {{ item.title }}
                </el-button>
              </div>
            </el-form-item>
          </Motion>
        </el-form>

        <Motion v-if="currentPage === 0" :delay="350">
          <el-form-item>
            <el-divider>
              <p class="text-gray-500 text-xs">第三方登录</p>
            </el-divider>
            <div class="w-full flex justify-evenly">
              <span
                v-for="(item, index) in thirdParty"
                :key="index"
                :title="item.title"
              >
                <IconifyIconOnline
                  :icon="`ri:${item.icon}-fill`"
                  width="20"
                  class="cursor-pointer text-gray-500 hover:text-blue-400"
                />
              </span>
            </div>
          </el-form-item>
        </Motion>

        <!-- 手机号登录 -->
        <phone v-if="currentPage === 1" @onBack="changeOperates" />

        <!-- 二维码登录 -->
        <qrCode v-if="currentPage === 2" @onBack="changeOperates" />

        <!-- 注册 -->
        <regist v-if="currentPage === 3" @onBack="changeOperates" />

        <!-- 忘记密码 -->
        <update v-if="currentPage === 4" @onBack="changeOperates" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useDataThemeChange } from '@/hooks/useDataThemeChange.ts'
import dayIcon from '@/assets/svg/day.svg?component'
import darkIcon from '@/assets/svg/dark.svg?component'
import illustration from '@/assets/svg/illustration.svg?component'
import globalization from '@/assets/svg/globalization.svg?component'
import avatar from '@/assets/svg/avatar.svg?component'
import { useNav } from '@/hooks/useNav.ts'
import Motion from '@/utils/motion.ts'
import TypeIt from '@/components/ReTypeit'
import { loginRules } from '@/utils/rule'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import Lock from '@iconify-icons/ri/lock-fill'
import Check from '@iconify-icons/ep/check'
import User from '@iconify-icons/ri/user-3-fill'
import { ReImageVerify } from '@/components/ReImageVerify'
import type { FormInstance } from 'element-plus'
import phone from './components/phone.vue'
import qrCode from './components/qrCode.vue'
import regist from './components/regist.vue'
import update from './components/update.vue'

const { dataTheme, dataThemeChange } = useDataThemeChange()
const { getDropdownItemStyle, getDropdownItemClass, title } = useNav()
const locale = ref('zh')

const translationCh = () => {
  locale.value = 'zh'
}
const translationEn = () => {
  locale.value = 'en'
}

const ruleForm = reactive({
  username: 'admin',
  password: 'admin123',
  verifyCode: '',
})

// 图形验证码
const imgCode = ref<string>('')
watch(imgCode, value => {
  useUserStore().SET_VERIFYCODE(value)
})

// 记住密码
const checked = ref<boolean>(false)

// 登录
const loading = ref<boolean>(false)
const onLogin = async (formEl: FormInstance | undefined) => {
  // loading.value = true;
  // if (!formEl) return;
  // await formEl.validate((valid, fields) => {
  //   if (valid) {
  //     useUserStoreHook()
  //       .loginByUsername({ username: ruleForm.username, password: "admin123" })
  //       .then(res => {
  //         if (res.success) {
  //           // 获取后端路由
  //           initRouter().then(() => {
  //             router.push("/");
  //             message("登录成功", { type: "success" });
  //           });
  //         }
  //       });
  //   } else {
  //     loading.value = false;
  //     return fields;
  //   }
  // });
}

// 登录方式
const currentPage = ref<number>(4)
interface Operate {
  title: string
}
const operates = ref<Array<Operate>>([
  {
    title: '手机登录',
  },
  {
    title: '二维码登录',
  },
  {
    title: '注册',
  },
])
const changeOperates = index => {
  currentPage.value = index
}

// 第三方登录
interface ThirdPartys extends Operate {
  icon: string
}
const thirdParty = ref<Array<ThirdPartys>>([
  {
    title: '微信登录',
    icon: 'wechat',
  },
  {
    title: '支付宝登录',
    icon: 'alipay',
  },
  {
    title: 'QQ登录',
    icon: 'qq',
  },
  {
    title: '微博登录',
    icon: 'weibo',
  },
])
</script>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  position: relative;
  ::v-deep .el-dropdown-menu__item {
    padding: 5px 40px;
  }
  .check-zh,
  .check-en {
    position: absolute;
    left: 20px;
  }
}

.login-container {
  .wave {
    position: fixed;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
  }
  &-header {
    position: absolute;
    top: 20px;
    right: 20px;
    .el-switch {
      margin-right: 5px;
    }
  }
  &-wrap {
    width: 100vw;
    height: 100vh;
    padding: 0 200px;
    .login-form {
      width: 360px;
      text-align: center;
      .avatar {
        width: 350px;
        height: 80px;
      }
      h2 {
        text-transform: uppercase;
        margin: 15px 0;
        color: #999;
        font: bold 200% Consolas, Monaco, monospace;
      }
    }
  }
}
</style>
