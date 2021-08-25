<template>
    <div class="system_bar_index">
      <div class="systeminfo " :class="{ hidesys: isHide }">
        <a class="changebtn">切换系统</a>
        <div class="sysbox cl">
          <div class="link">
            <a target="_blank" :href="zc_url">招采系统</a>
            <a target="_blank" :href="qx_url">权限系统</a>
          </div>
          <a class="arrowbtn" @click="changeHandle()"></a>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "SystemBar",
      data(){
          return{
            isHide:false,
            zc_url:'',
            qx_url:''
          }
      },
      methods:{
        changeHandle(){
          this.isHide = !this.isHide
        }
      },
      mounted() {
          if(process.env.EVN_CONFIG=='prod'){
            this.zc_url = 'http://mdzymtp.midea.com/'
            this.qx_url = 'http://10.18.68.245/orgn-midea/frame/index.do'
          }else{
            this.zc_url = 'http://sp-uat.mideazy.com/zhaocai/'
            this.qx_url = 'http://10.18.69.181/orgn-uat-co/frame/index.do'
          }
      }
    }
</script>

<style lang="scss" scoped>
.system_bar_index{
 float: left;
  width: 350px;
  /*切换系统*/
   .systeminfo {
    height: 27px;
    font-size: 13px;
    position: relative;
    top: 12px;
    border-radius: 4px;
    overflow: hidden;
  }

   .systeminfo .changebtn {
    display: block;
    height: 27px;
    line-height: 27px;
    border-radius: 4px;
    color: #fff;
    text-align: center;
    background: #0092d7;
    width: 72px;
    position: absolute;
    z-index: 2;
  }

  .systeminfo .changebtn:hover {
    text-decoration: none;
  }

  .systeminfo .sysbox {
    position: absolute;
    height: 27px;
    top: 0px;
    left: 67px;
    padding: 6px 40px 0px 5px;
    border: 1px solid #0092d7;
    border-radius: 4px;
    box-sizing: border-box;
    z-index: 1;
    transition: left .3s linear;
    -webkit-transition: left .3s linear;
    -moz-transition: left .3s linear;
    -ms-transition: left .3s linear;
  }

  .systeminfo .sysbox .link a {
    display: block;
    float: left;
    line-height: 13px;
    padding: 0px 20px;

    border-right: 1px solid #dcdcdc;
  }

  .systeminfo .sysbox .link a:last-child {
    border-right: 0px;
  }

  .systeminfo .sysbox .arrowbtn {
    display: block;
    position: absolute;
    width: 35px;
    background: #0092d7 url(../../../../assets/images/sys-arrow.png) center center no-repeat;
    height: 27px;
    border-radius: 4px;
    right: -3px;
    top: -1px;
    box-sizing: border-box;
  }

  .systeminfo.hidesys .sysbox {
    left: -136px;
  }

  .systeminfo.hidesys .sysbox .arrowbtn {
    transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    -moz-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
  }
}
</style>
