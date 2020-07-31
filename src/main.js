import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./http/api";
import Vant from "vant";
import "vant/lib/index.css";
import { Lazyload } from "vant";
import { Tabbar, TabbarItem } from "vant";
import utils from "./utils";

Vue.use(Tabbar);
Vue.use(TabbarItem);

Vue.use(Lazyload);

Vue.use(Vant);
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
Vue.prototype.$Todetails = (id) => {
    router.push({ path: "/details", query: { id: id } });
};
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");