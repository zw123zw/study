module.exports = {
  //指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
  env: {
    node: true,
    browser: true,
    commonjs: true,
    amd: true,
    es6: true, //自动启用es6语法，启用ES6全局变量
  },
  extends: 'eslint:recommended', // 可共享配置的名称、eslint:recommended 或 eslint:all,表示默认开启一些内置的规则，包含的，在 https://eslint.bootcss.com/docs/rules/ 中可以查看内置规则
  // 解析器选项配置
  parserOptions: {
    ecmaVersion: 'latest', // 指定你想要使用的 ECMAScript 版本，启用es6语法，但是不自动启用es6全局变量
    sourceType: 'module', //"script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
    //使用的额外的语言特性
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 支持使用第三方插件
  plugins: [],
  // 当访问当前源文件内未定义的变量时，no-undef 规则将发出警告，可以配置全局变量，"writable" 以允许重写变量，或 "readonly" 不允许重写变量
  globals: {
    AUTHOR: 'readonly',
    AGE: 'readonly',
    SEX: 'readonly',
  },
  // 启用的规则及其各自的错误级别。
  rules: {},
}
