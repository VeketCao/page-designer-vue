<template>
  <div class="preview">
    <div class="panelWrapper">
      <RenderPage :data="pageConfig"></RenderPage>
    </div>
  </div>
</template>

<script>
    import RenderPage from "./RenderPage";
    export default {
      name: "Preview",
      components:{
        RenderPage
      },
      data(){
        return{
          pageConfig:null
        }
      },
      mounted() {
        this.pageConfig = JSON.parse(localStorage.getItem('pageConfig'))
        console.log('Preview',this.pageConfig)
      }
    }
</script>

<style lang="scss" scoped>
.preview{
  height: 100%;
  width: 100%;
  .panelWrapper {
    width: 1140px;
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    -webkit-box-shadow: 0 0 6px rgba(5,1,1,.1);
    box-shadow: 0 0 6px rgba(5,1,1,.1);
    height: 100%;
  }
}
</style>
