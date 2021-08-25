<template>
  <div id="proc_toolbar">
    <div class="userinfo">
      <a href="https://bot.mideazy.com?syscode=mco" target="_blank" class="ai-content" style="float: left;"><span>智能客服</span></a>
      <span class="welcomeTxt">您好,{{VX_userInformation!=null?VX_userInformation.username:''}}</span>
      <a class="back" @click="showConfirm" style="cursor:pointer;">退出</a>
    </div>
  </div>
</template>

<script>

  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name: 'ProcToolbar',
    computed: {
      ...mapGetters(['VX_userInformation'])
    },
    data () {
      return {
        proc_news_visible: false,
        searchValue: ''
      }
    },
    methods: {
      proc_news_hide(){
        this.proc_news_visible = false;
      },
      onSearch( e ){
        if( e.keyCode === 13 ){
          this.onHandleSearch();
        }
      },
      onHandleSearch(){
        //console.log(this.searchValue)
      },
      showConfirm(){
        this.$confirm({
          title: '您确定注销当前登录吗?',
          onOk() {
            sessionStorage.clear()
            localStorage.clear()
            window.location.href = process.env.SSO + '/logout?service=' + process.env.LOGIN_HOME;
          }
        });
      }
    }
  }
</script>

<style lang="scss" scope>
  #proc_toolbar{
    float: right;
    .proc_toolbar{
      height: 100%;line-height: 55px;font-size: 18px;
      .proc_input-search{
        width: 41px;transition: all .4s;
        .searchIcon{
          font-size: 18px;transition: all .01s;transform: translateY(-1px)
        }
      }
      .proc_input-search:hover,.proc_input-search:focus-within{
        width: 190px;border: 1px solid #D9E9FD;border-radius: 50px;
      }
      .placeholder{
        width: 0;border-left: 1px solid #E8E8E8;margin-left: 16px
      }
      .ant-badge,.anticon-poweroff{font-size: 18px;cursor: pointer;}
      .ant-avatar{transform: translateY(-1px);margin: 0 13px 0 20px;width: 32px;height: 32px;cursor: pointer;}
      .userName{
        font-size: 13px;transform: translateY(-2px);display: inline-block;cursor: pointer;margin-right: 15px;
      }
    }
  }
</style>

<style lang="scss">
  #proc_toolbar{
    float: right;

    .userinfo {
      position: absolute;
      right: 18px;
      color: #333;
      /*bottom: 15px;*/
      line-height: 20px;
      top: 15px;
      font-size: 12px;
    }

    .userinfo a.ai-content {
      float: left;
      background: url(../../../../assets/images/aicust.png) left center no-repeat;
      background-size: 22%;
      padding-left: 30px;
      padding-right: 20px;
      height: 20px;
      line-height: 20px;
    }
    .userinfo a {
      color: #333;
    }
    .userinfo span.name {
      padding: 0px;
    }

    .userinfo .back {
      margin-left: 15px;
      background: url(../../../../assets/images/back.png) center no-repeat;
      height: 20px;
      width: 14px;
      display: block;
      float: right;
    }

    .userinfo span.welcomeTxt {
      float: left;
      height: 20px;
      line-height: 20px;
      background: url(../../../../assets/images/userPic.png) left center no-repeat;
      padding-left: 20px;
    }
    .userinfo .back {
      float: left;
      width: 55px;
      line-height: 20px;
      background-position-x: left;
      padding-left: 20px;
    }

    .userinfo .back {
      padding-left: 23px;
    }

  }
</style>

