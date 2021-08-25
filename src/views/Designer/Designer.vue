<template>
  <div class="page-designer-index">
    <left-cate></left-cate>
    <div class="mid-container">
      <mid-page :data="pageConfig" :select.sync="curSelect"></mid-page>
    </div>
    <div class="right-cfg">
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="页面属性设置">
          <page-opts :data="pageConfig"></page-opts>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="组件属性设置">
          <item-opts :data="curSelect"></item-opts>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
import LeftCate from "./LeftCate/LeftCate";
import MidPage from "./MidPage/MidPage";
import ItemOpts from "./ItemOpts/ItemOpts";
import PageOpts from "./PageOpts/PageOpts";
export default {
  name: "Designer",
  components:{
    LeftCate,
    MidPage,
    ItemOpts,
    PageOpts
  },
  props:['pageConfig'],
  data(){
    return{
      curSelect:null,
      activeKey:['2'],
    }
  },
  methods:{
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .ant-collapse{
    border: unset;
    line-height: 0.8;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    .ant-collapse-content > .ant-collapse-content-box{
      padding: 0px;
    }
    .ant-collapse-item > .ant-collapse-header {
      line-height:15px;
    }
    .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
      left: unset;
      right: 10px;
    }

  }

.page-designer-index{
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 900px;
  background: #fff;
  .mid-container{
    position: absolute;
    margin-left: 250px;
    top:0;
    bottom:0;
    width: calc(100% - 550px);
    overflow-y: auto;
    height: calc(100% - 50px);
  }
  .right-cfg{
    position: absolute;
    top:0;
    bottom:0;
    right:0;
    width: 300px;
    border-left: 1px solid #dfdfdf;
    .tab-header{
      position: absolute;
      border-bottom: solid 2px #e4e7ed;
      padding: 0 5px;
      width: 100%;
      .cfg-tab{
        float: left;
        cursor: pointer;
        height: 44px;
        line-height: 44px;
        display: inline-block;
        width: 145px;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        position: relative;
        &.active{
          //border-bottom: solid 3px #409EFF;
        }
      }
    }
    .tab-content{
      position: absolute;
      top:45px;
    }

  }
}
</style>
