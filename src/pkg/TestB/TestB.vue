<template>
  <div class="test-b-component">
    <h2 class="title">TestB</h2>
    <a-button @click="btnClick()">抛事件</a-button>
  </div>
</template>

<script>
    export default {
      name: "TestB",
      data(){
          return{
          }
      },
      methods:{
        btnClick(){
          Bus.$emit('selfAEvent','消息来自TestB')
        }
      }
    }
</script>

<style lang="scss" scoped>
.test-b-component{
  background: #dcd0d0;
}
</style>
