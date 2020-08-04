import Vue from "vue";
import Vuex from "vuex";
import api from "../http/api";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // name:'jack'
        badges: 0,
    },
    mutations: {
        // setName(state, data) {
        //     state.name = data
        // }
        // setbadges(state, data) {
        //     state.badges = data
        // },
        // //查询获取购物车数据(get)
        getgetCard(state) {
            api
                .getgetCardData()
                .then((res) => {
                    if (res.code === 200) {
                        state.badges = res.shopList.length;
                        // window.console.log(state.badges);
                    } else {
                        state.badges = 0
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    actions: {},
    modules: {},
});