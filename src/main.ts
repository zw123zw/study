import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import less from 'less'

Vue.use(less)

Vue.config.productionTip = false;
// console.log(Vue.config);
Vue.config.errorHandler = (err, vm, info) => {
  console.warn('捕获到项目错误', err);
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");