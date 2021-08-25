<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import {mapActions, mapGetters, mapState} from "vuex";
export default {
  name: "App",
  data() {
    return {
      locale: zhCN
    };
  },
  mounted() {
  }
};
</script>

<style>
@charset "UTF-8";
html,
body,
#app {
  height: 100%;
  font-size: 12px;
}
</style>
