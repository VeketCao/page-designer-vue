<template>
  <div class="test-a-component">
    <h2 class="title">TestA</h2>
    <img src="./logo.png" width="100">
    <span class="title">{{msg}}</span>
  </div>
</template>

<script>
  export default {
    name: "TestA",
    data(){
      return{
        msg:''
      }
    },
    mounted() {
      Bus.$on('selfAEvent',(res)=>{
        this.msg = res
      })
    }
  }
</script>

<style lang="scss" scoped>
  .test-a-component {
    background:#001f3c;
    height: 100%;
    width: 100%;
    .title {
      line-height: 2;
      color: red;
    }
  }
</style>
