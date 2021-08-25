<template>
  <div class="node-item">
    <component :is="data.type" :options="data.options"></component>
  </div>
</template>

<script>
  export default {
    name: "NodeItem",
    props:['data'],
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
.node-item{
  width: 100%;
  height: 100%;
}
</style>
