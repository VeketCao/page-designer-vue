<template>
  <div id="async_load_demo" class="contentPart">
    <a-row>
      <a-button @click="loadHandle()" >异步加载组件</a-button>
      <span>
        http://supd-admin-dev.mideazy.com/pkg/TestA/TestA.min.js
      </span>
    </a-row>
    <a-row style="margin-top: 10px">
      <async-component :options="opt1" ></async-component>
    </a-row>
    <a-row style="margin-top: 10px">
      <async-component :options="opt2" ></async-component>
    </a-row>
    <!--<a-row style="margin-top: 10px">
      <MSelector></MSelector>
    </a-row>-->
  </div>
</template>

<script>
   import MSelector from "../../../pkg/MSelector/MSelector";
    export default {
      name: "AsyncLoadDemo",
      components:{
        MSelector
      },
      data(){
          return{
            opt1:{
              url:''
            },
            opt2:{
              url:''
            },
          }
      },
      methods:{
        loadHandle(){
          this.opt1.url = 'http://supd-admin-dev.mideazy.com/pkg/TestA/TestA.min.js';
          this.opt2.url = 'http://supd-admin-dev.mideazy.com/pkg/TestB/TestB.min.js';
        }
      },
    }
</script>

<style lang="scss" scoped>
#async_load_demo{
  padding: 20px 20px;
}
</style>
