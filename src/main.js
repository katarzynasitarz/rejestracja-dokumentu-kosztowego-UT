// eslint-disable-next-line no-undef
__webpack_public_path__ = window.appZipUrl || "";

import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
// import { evaluate } from "mathjs";

Vue.config.productionTip = false;
Vue.config.devtools = true;

import { sendAjaxWithParams } from "@/utils/bpmAjaxPost.js";
Vue.prototype.sendAjaxWithParams = sendAjaxWithParams;
Vue.prototype.appUrls = window.appUrls;

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
