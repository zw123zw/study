/** 获取环境变量 */
const loadEnv = (): ViteEnv => {
  return import.meta.env
}

export { loadEnv }
