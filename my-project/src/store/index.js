import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bookmarks: [],
  },
  mutations: {
    setBookmark(state, data) {
      state.bookmarks.unshift(data);
    },
    setSelectedBookmark(state, data) {
      const oldElemIdx = state.bookmarks.findIndex(
        item => item.id === data.id,
      );
      if (oldElemIdx !== -1) {
        Vue.set(state.bookmarks, oldElemIdx, data);
      }
    },
    deleteSelectedBookmark(state, data) {
      const oldElemIdx = state.bookmarks.findIndex(
        item => item.id === data.id,
      );
      if (oldElemIdx !== -1) {
        state.bookmarks.splice(oldElemIdx, 1);
      }
    },
  },
  actions: {
  },
  getters: {
    getBookmarks: state => state.bookmarks,
    getSelectedBookmark: state => state.selectedBookmark,
  },
  modules: {
  },
});
