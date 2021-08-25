<template>
  <div id="proc_header">
    <a-layout-header>
      <div class="proc_logo" :class="{'small_width':VX_collapsed}">
        <img
          @click="$router.push({ name: 'Index' })"
          src="../../../assets/logo.png"
          alt="test"
        />
      </div>
      <div  class="header_container">
        <div class="header_l1" style="">
          <div class="proc_trigger" style="float: left">
            <a-icon
              :type="VX_collapsed ? 'menu-unfold' : 'menu-fold'"
              @click="() => VXFNAcollapsed(!VX_collapsed)"
            />
          </div>
          <div class="proc_header_title">
            <proc-breadcrumb></proc-breadcrumb>
          </div>
          <proc-toolbar></proc-toolbar>
        </div>
        <div class="header_l2">
          <TagsBar></TagsBar>
        </div>
      </div>
    </a-layout-header>

  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
  import ProcToolbar from "@/views/Home/Header/components/toolbar.vue";
  import ProcBreadcrumb from "@/views/Home/Content/components/breadcrumb.vue";
  import TagsBar from "./components/TagsBar";
  export default {
    computed: {
      ...mapState(["VX_collapsed", "VX_homeTitle"])
    },
    components: {
      ProcToolbar,
      ProcBreadcrumb,
      TagsBar
    },
    name: "ProcHeader",
    methods: {
      ...mapActions(["VXFNAcollapsed", "VXFNAhomeTitle"])
    },
    mounted() {
      this.VXFNAhomeTitle("欢迎使用供应商数据中台");
    }
  };
</script>

<style lang="scss" scope>
  #proc_header {
    height: 77px!important;
    overflow: hidden;
    position: relative;
    box-shadow: 1px 0 5px rgba(22,25,76,.3);
    -webkit-user-select:none;
    -moz-user-select:none;
    -o-user-select:none;
    user-select:none;
    .ant-layout-header {
      background-color: white;
      padding-right: 0px;
      padding-left: 0px;
      height: 100%;
      line-height: 45px!important;
      .proc_trigger {
        font-size: 18px;
        line-height: 45px;
        padding: 0px 20px;
        cursor: pointer;
        transition: color 0.3s;
      }
      .proc_header_title {
        margin: 0;
        display: inline-block;
      }
      .proc_trigger:hover {
        color: #1890ff;
      }
      .proc_logo {
        width: 210px;
        background: #001f3c;
        height: 77px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        float: left;
        transition: all 0.2s;
        img {
          width: 70%;
          height: 40px;
          vertical-align: middle;
          cursor: pointer;
          transform: translateY(-2px);
          transition: all 0.2s;
        }
      }
      .header_container{
        float:left;
        width: calc(100% - 210px);
        .header_l1{
          width: 100%;
          height: 45px;
          box-shadow: rgba(0, 21, 41, 0.08) 0px 1px 4px;
        }
        .header_l2{
          width: 100%;
          height: 32px;
        }
      }
      .small_width{
        width: 80px;
        img {
          width: 70%;
          height: 20px;
          vertical-align: middle;
          cursor: pointer;
          transform: translateY(-2px);
        }
      }
    }
  }
</style>

<style scope>
  .proc_input-search input {
    border: none;
    border-radius: 50px;
  }
  .proc_input-search .ant-input-search-icon {
    font-size: 20px;
  }
</style>
