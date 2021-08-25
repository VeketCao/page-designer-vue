<template>
    <div id="proc_menu">
        <a-menu
            :defaultSelectedKeys="['Index']" @openChange="onOpenChange"
            mode="inline" theme="dark" :inlineCollapsed="VX_collapsed"
            :openKeys="openKeys" @click="handleClick"
            :selectedKeys="[this.$route.name]"
        >
            <a-menu-item key="Index">
               <!-- <common-icon type="iconshouye-xuanzhong" />-->
                <a-icon type="home" />
                <span>首页</span>
            </a-menu-item>
            <template v-for="i in subMenus">
                <a-sub-menu :key="i.uri" v-if="i.children.length!=0">
                    <span slot="title"><a-icon :type="i.icon" /><span>{{i.description}}</span></span>
                    <template v-for="j in i.children">
                      <template v-if="j.hasOwnProperty('children') && j.children.length!=0">
                        <a-sub-menu :key="j.uri">
                          <span slot="title"><span>{{j.description}}</span></span>
                          <a-menu-item :key="k.uri" v-for="k in j.children">{{k.description}}</a-menu-item>
                        </a-sub-menu>
                      </template>
                      <template v-else>
                        <a-menu-item :key="j.uri" >{{j.description}}</a-menu-item>
                      </template>
                    </template>
                </a-sub-menu>
                <a-menu-item :key="i.uri" v-else>
                    <a-icon :type="i.icon" />
                    <span>{{i.description}}</span>
                </a-menu-item>
            </template>
        </a-menu>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import menuInfo from "../../../../router/menuInfo";
export default {
    name: 'ProcMenu',
    data () {
        return {
            openKeys: ['Index'],
            rootSubmenuKeys: [],
            subMenus: []
        }
    },
    computed:{
        ...mapState(["VX_collapsed"])
    },
    methods:{
        onOpenChange (openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) this.openKeys = openKeys
            else this.openKeys = latestOpenKey ? [latestOpenKey] : []
        },
        handleClick( data ){
            this.$router.push({name:data.key,params:{id: 123}})
        },
    },
    mounted(){

        this.subMenus = menuInfo;

        //展开当前左侧菜单
        var tp = this.$route.path.split('/')
        if(tp.length>=1) this.openKeys = ['/'+ tp[1]]
    }
}
</script>

<style lang="scss" scope>
#proc_menu{
  width: 100%;
  height: 100%;
  background: #001f3c;
  padding-top: 25px;
  .ant-menu{
      background: #001f3c;
  }
}
</style>
