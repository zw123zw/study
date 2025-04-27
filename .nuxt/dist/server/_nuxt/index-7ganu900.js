import { _ as __nuxt_component_0 } from "./nuxt-link-DkQ-huSb.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { a as useSeoMeta } from "./index-CmKavcyS.js";
import { b as useRoute, d as useRuntimeConfig } from "../server.mjs";
import "ufo";
import "@unhead/shared";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "vue-router";
import "radix3";
import "defu";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSeoMeta({
      title: "Meet Nuxt",
      description: "The Intuitive Vue Framework."
    });
    useRoute();
    const runtimeConfig = useRuntimeConfig();
    console.log(runtimeConfig);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0;
      _push(ssrRenderComponent(_component_nuxt_link, mergeProps({ to: "/" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`首页`);
          } else {
            return [
              createTextVNode("首页")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-7ganu900.js.map
