import Vue from 'vue'
import vuex from 'vuex'
import state from './state.js'
import * as getters from './getters.js'
import mutations from './mutations.js'
import * as actions from './actions.js'

Vue.use(vuex);

export default new vuex.Store({
    state,
    getters,
    mutations,
    actions
})