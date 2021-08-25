<template>
    <div id="proc_container">
        <proc-header></proc-header>
        <a-layout>
            <proc-sider></proc-sider>
            <a-layout>
                <proc-content></proc-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
import ProcSider from "@/views/Home/Sider/Sider.vue"
import ProcHeader from "@/views/Home/Header/Header.vue"
import ProcContent from "@/views/Home/Content/Content.vue"
import water from '../../utils/water'
import moment from 'moment'
import {mapActions, mapGetters, mapState} from "vuex";
export default {
    name: 'Home',
    components: {
        ProcSider, ProcHeader, ProcContent
    },
    computed: {
      ...mapState([]),
      ...mapGetters([])
    },
    methods: {
      ...mapActions(['addactions','VXFNAuserInformation']),
    },
    mounted(){

      /**4a登陆成功后调接口获取登录用户信息**/
      /*http.login('/get_user').then((result) => {
        console.log('get_user',result)
        if (result.returnCode == AppUtil.SUCCESS_CODE) {
          this.VXFNAuserInformation(result.data)
          var history_url = localStorage.getItem('history_url') || ''
          if(history_url!=''){
            window.location.href = history_url
            localStorage.setItem('history_url','')
          }
        }else{
          localStorage.setItem('history_url',window.location.href)
          window.location.href = process.env.SSO + '/logout?service=' + process.env.LOGIN_HOME;
        }
      }).catch((e)=>{
        localStorage.setItem('history_url',window.location.href)
        window.location.href = process.env.SSO + '/logout?service=' + process.env.LOGIN_HOME;
      })*/


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
#proc_container{
    display: flex;flex-direction: column;height: 100%;
    #proc_container,.ant-layout{
        flex: 1;
      background: #f0f0f0;
    }
}
</style>
