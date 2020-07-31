import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // name:'jack'
        // aid: "",
        badges: null,
    },
    mutations: {
        // setName(state, data) {
        //     state.name = data
        // }
        setbadges(state, badges111) {
            state.badges = badges111
        }


    },
    actions: {},
    modules: {}
})