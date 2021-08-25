<template>
  <div class="pd-main-index">
    <div class="designer-header">
      <img class="dh-logo" src="../../assets/logo.png">
      <div class="dh-title" >设计器</div>
      <ul class="dh-tab">
        <a @click="change('designer')">
          <li :class="{ active: current === 'designer' }">
            <a-icon type="desktop" />
            设计
          </li>
        </a>
        <a @click="change('code')">
          <li :class="{ active: current === 'code' }">
            <a-icon type="code" />
            代码
          </li>
        </a>
      </ul>
      <div class="dh-link">
        <a class="ad" @click="saveHandle()">保存</a>
        <a class="ad" @click="previewHandle()">预览</a>
        <a class="ad" @click="cleanHandle()">清空</a>
      </div>
    </div>
    <div class="designer-content">
      <Designer v-show="current === 'designer' " :pageConfig="pageConfig"></Designer>
      <BuildCode v-if="current === 'code' " :pageConfig="pageConfig"></BuildCode>
    </div>

  </div>
</template>

<script>
  import Designer from "./Designer";
  import BuildCode from "./BuildCode/BuildCode";
  export default {
    name: "PDMain",
    data(){
      return{
        current:'designer',
        pageConfig:{
          title:'',
          type:'page',
          items:[],
        }
      }
    },
    components:{
      Designer,
      BuildCode
    },
    methods:{
      change(v){
        this.current = v
      },
      cleanHandle(){
        this.pageConfig.items = []
      },
      saveHandle(){
        alert(JSON.stringify(this.pageConfig))
      },
      previewHandle(){
        localStorage.setItem('pageConfig',JSON.stringify(this.pageConfig))
        window.open('#/n/preview')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pd-main-index{
    height: 100%;
    width: 100%;
    .designer-header{
      position: relative;
      z-index: 103;
      height: 50px;
      background-color: #001f3c;
      .dh-logo{
        height: 26px;
        vertical-align: middle;
      }
      .dh-title{
        display: inline-block;
        line-height: 50px;
        vertical-align: middle;
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        opacity: 0.8;
        margin-left: 6px;
        cursor: pointer;
      }
      .dh-tab{
        position: absolute;
        top:0;
        left: 48%;
        background-color: #001f3c;
        list-style: none;
        margin: 0;
        padding: 0;
        color: rgb(191, 203, 217);
        overflow: hidden;
        font-size: 16px;
        font-weight: 500;
        a{
          float: left;
          cursor: pointer;
          width: 50px;
        }
        li {
          padding: 2px 5px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          height: 50px;

          &.active {
            color: rgb(64, 158, 255);
            background-color: #263445;
          }
        }
      }
      .dh-link{
        height: 50px;
        float: right;
        margin-right: 10px;
        a{
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          line-height: 50px;
          margin-left: 15px;

          &:hover{
            opacity: 0.8;
          }

          &.ad{
            color: #f5dab1;
            cursor: pointer;
          }
        }
      }
    }
    .designer-content{
      flex: 1;
      display: flex;
      position: relative;
      flex-direction: column;
      height: 100%;
    }
  }
</style>
