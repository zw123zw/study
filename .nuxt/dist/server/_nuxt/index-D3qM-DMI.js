import { _ as __nuxt_component_0 } from "./nuxt-link-DkQ-huSb.js";
import { withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ufo";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
const _imports_0 = "" + __buildAssetsURL("bac8.Ct8584Zw.png");
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_nuxt_link = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(_attrs)}><h1>Hello world!</h1><img${ssrRenderAttr("src", _imports_0)} alt="Discover Nuxt 3"><h1 class="animate__animated animate__bounce animate__repeat-2"> An animated element </h1><div>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/test" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`test`);
      } else {
        return [
          createTextVNode("test")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div>`);
  _push(ssrRenderComponent(_component_nuxt_link, { to: "/test1" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`test1`);
      } else {
        return [
          createTextVNode("test1")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-D3qM-DMI.js.map
