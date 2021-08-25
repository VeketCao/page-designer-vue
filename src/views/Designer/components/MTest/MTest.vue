<template>
    <div v-if="options" class="m-test">
      <a-card size="small" :title="options.title" class="card-self">
        <a slot="extra" href="#">more</a>
        <span>{{options.text}}</span>
      </a-card>
    </div>
</template>

<script>
  export default {
    name: "MTest",
    props:['options'],
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" scoped>
.m-test{
  width: 100%;
  height: 100%;
  .card-self{
    width: 100%;
    height: 100%;
  }
}
</style>
