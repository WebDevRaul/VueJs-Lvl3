import { createStore } from 'vuex';

export default createStore({
  state: {
    modal: false,
    isAuth: false
  },
  getters: {},
  actions: {
    async login({ commit }, payload) {
      console.log(payload);
      // await func here w/ payload

      commit('toggleAuth');
    }
  
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.modal = !state.modal;
    },
    toggleAuth: (state) => {
      state.isAuth = !state.isAuth;
    }
  },
  modules: {
  }
});