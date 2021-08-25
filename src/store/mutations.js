const mutations = {
  VXFNMcollapsed(state, FormalzParameter) {
    state.VX_collapsed = FormalzParameter;
  },
  VXFNMdrawer(state, boolean) {
    state.VX_drawer = boolean;
  },
  VXFNMdataSystem(state, data) {
    state.VX_dataSystem = data;
  },
  VXFNMsaveKeyword(state, val) {
    state.VX_keyword = val;
  },
  VXFNMisSearch(state, val) {
    state.VX_isSearch = val;
  },
  VXFNMclassId(state, val) {
    state.VX_everyClickId = val;
  },
  VXFNMtreeNodeTrigger(state, val) {
    state.VX_treeNodeTrigger = val;
  },
  VXFNMupdateBusiness(state, val) {
    state.VX_updateTreeInit = val;
  },
  VXFNMInitializer(state, val) {
    state.VX_Initializer = val;
  },
  VXFNMVindicateRowData(state, val) {
    state.VX_VindicateRowData = val;
  },
  VXFNMvisibleEdit(state, val) {
    state.VX_prefixEdit = val;
  },
  VXFNMchangeDatas(state, val) {
    state.VX_changeDatas = val;
  },
  VXFNMhomeTitle(state, val) {
    state.VX_homeTitle = val;
  },
  VXFNMuserInformation(state, val) {
    state.VX_userInformation = val;
  },
  VXRouterViewKey(state, val) {
    state.Vx_routerViewKey = val;
  },
  VXFNMcachedViews(state, val) {
    state.VX_cachedViews.push(val);
  }
}
export default mutations;
