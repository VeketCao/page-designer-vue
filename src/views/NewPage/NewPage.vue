<template>
    <div id="new_page">
      <router-view :key="activeKey"/>
    </div>
</template>

<script>
  import water from '../../utils/water'
  import moment from 'moment'
    export default {
      name: "NewPage",
      computed: {
        activeKey() {
          return this.$store.state.Vx_routerViewKey;
        }
      },
      mounted(){
        //拿到登陆人后添加水印
        var wtObj = $("#waterMark").val();
        if (wtObj == undefined || wtObj == null) {
          water.watermark({
            watermark_contents: ['test置业', moment().format('YYYY-MM-DD HH:mm:ss')]
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "src/assets/scss/content.scss";
  #new_page {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #f0f0f0;;
    .ant-layout-content {
      height: 100%;
      background-color: $layout-back-color;
      padding: $layout-content-padding;
      flex: 1;
    }
  }
</style>
