<template>
  <div class="image-show" v-if="options">
    <img :src="options.url" style="width: 100%;height: 100%">
  </div>
</template>

<!--  https://cdn2.thecatapi.com/images/MTgwNjg2MQ.jpg -->

<script>
    export default {
      name: "ImageShow",
      props:['options'],
    }
</script>

<style lang="scss" scoped>
.image-show{

}
</style>
