import { createStore } from 'vuex';

export default createStore({
  state: {
    modal: false
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.modal = !state.modal;
    }
  },
  getters: {

  },
  actions: {
  },
  modules: {
  }
});