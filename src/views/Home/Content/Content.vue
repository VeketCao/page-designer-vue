<template>
  <div id="proc_content">
    <!--<proc-breadcrumb></proc-breadcrumb>-->
    <a-layout-content>
      <keep-alive >
        <router-view  v-if="hasCachedViews" :key="key"/>
      </keep-alive>
      <router-view v-if="!hasCachedViews" :key="activeKey"/>
    </a-layout-content>
  </div>
</template>

<script>
//import ProcBreadcrumb from "@/views/Home/Content/components/breadcrumb.vue";
export default {
  name: "ProcContent",
  computed: {
    hasCachedViews() {
      //console.log('cachedViews',this.$store.state.VX_cachedViews)
      let cacheStr = this.$store.state.VX_cachedViews.toString();
      if(cacheStr.indexOf(this.$route.path)!=-1){
        return true
      }else return false;
    },
    activeKey() {
      return this.$store.state.Vx_routerViewKey;
    },
    key() {
      return this.$route.path
    }
  },
};
</script>

<style lang="scss" scope>
@import "src/assets/scss/content.scss";
#proc_content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .ant-layout-content {
    height: 100%;
    background-color: $layout-back-color;
    padding: $layout-content-padding;
    -webkit-transition: left 0.3s linear;
    flex: 1;
  }
}
</style>
