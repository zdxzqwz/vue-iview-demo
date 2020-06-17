import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    role: {},
    menus: [],
    menuList: [],
    opts: [],
    datas: [],
    containerHeight: 0,
    notice: {}
  },
  mutations: {
    getUserInfo(state, userInfo) {
      state.userInfo = userInfo;
      state.role = { roleName: userInfo.roleName, roleId: userInfo.roleId, roleCode: userInfo.roleCode };
    },
    getMenus(state, menus) {
      state.menus = menus;
    },
    getContainerHeight(state, height) {
      state.containerHeight = height;
    },
    getOpts(state, opts) {
      state.opts = opts;
    },
    getDatas(state, datas) {
      state.datas = datas;
    }
  },
  actions: {
  },
  modules: {
  }
})
