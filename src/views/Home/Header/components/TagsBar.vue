<template>
    <div id="tags_bar_index">
      <scroll-pane ref="scrollPane" class="tags-view-wrapper" >
        <template v-for="(item,index) in tagItems">
          <template v-if="item.href=='/Index'">
            <a-tag class="tag_view_n"   ref="tag" :key="item.href" :class="{'active':curUri==item.href}"><a class="tag_a" @click="updateRouter(item.href)">{{item.name}}</a></a-tag>
          </template>
          <template v-else>
            <a-tag class="tag_view"  ref="tag" :key="item.href" :class="{'active':curUri==item.href}" closable @close="closeHandle($event,index,item.href)"><a class="tag_a" @click="updateRouter(item.href)">{{item.name}}</a></a-tag>
          </template>
        </template>
      </scroll-pane>

    </div>
</template>

<script>
  import routesInfo from "@/router/routesInfo.js";
  import {mapActions, mapGetters, mapState} from "vuex";
  export default {
    name: "TagsBar",
    data(){
        return{
          routerMap: AppUtil.getRoutesUrlMap(routesInfo, []),
          tagItems:[{href:'/Index',name:'首页'}],
          curUri:'/Index'
        }
    },
    computed: {
      ...mapState([]),
      ...mapGetters([])
    },
    methods:{
      ...mapActions(['VXFNAcachedViews','VXFNADelcachedViews']),
      closeHandle(e,index,uri){
        e.preventDefault();
        this.tagItems.splice(index, 1);
        this.VXFNADelcachedViews(index);
        if(this.curUri == uri){
          this.curUri = this.tagItems[index-1].href
          this.updateRouter(this.curUri)
        }
      },
      isExist(uri){
        let rtn = false
        this.tagItems.forEach((it)=>{
          if(it.href == uri) rtn = true
        })
        return rtn
      },
      addItems(item){
        if(!this.isExist(item.href)){
          this.tagItems.push(item)
          this.VXFNAcachedViews(item.href)
        }
      },
      buildTagItems(){
        var fullPath = this.$route.path;
        var breadcrumbList = [];
        this.curUri = fullPath;
        if (fullPath) {
          breadcrumbList = this.routerMap[fullPath] || [];
        }
        if(breadcrumbList.length>0){
          this.addItems(breadcrumbList[breadcrumbList.length-1]);
        }
        this.moveToCurrentTag()
      },
      updateRouter(path) {
        this.curUri = path;
        let fullPath = this.$route.path;
        if (fullPath === path) {
          this.$store.commit("VXRouterViewKey", new Date().getTime());
        } else {
          this.$router.push({
            path: path,
            query: {
              ...this.$route.query,
            }
          });
        }
      },
      moveToCurrentTag() {//移动滚动条到对应的标签位置
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.$vnode.data.key === this.$route.path) {
              this.$refs.scrollPane.moveToTarget(tag)
              break
            }
          }
        })
      }
    },
    mounted() {
      this.buildTagItems();
    },
    watch: {
      $route() {
        this.buildTagItems();
      }
    }
  }
</script>

<style lang="scss" scoped>
#tags_bar_index{
  width: 100%;
  height: 32px;
  padding: 1px 5px;
  margin: 0px;
  line-height: 32px;
  .tag_view_n{
    margin: 0px 5px;
    padding: 3px 4px;
    .tag_a{
      width: 55px;
      text-align: center;
    }
  }
  .tag_view{
    margin: 0px 5px;
    padding: 3px 5px;
    .tag_a{
      padding: 5px 0px 5px 5px;
    }
  }
  /deep/ .active{
     background: #1890ff;
     border: 1px solid #1890ff;
    a,i{
      color: #fff!important;
    }
  }
}
</style>
