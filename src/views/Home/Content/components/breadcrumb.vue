// 导航位置
<template>
  <div id="proc_breadcrumb">
    <!--<div class="breadcrumb_i"><span class="location">当前位置:</span></div>-->
    <a-breadcrumb :routes="breadcrumbList" >
      <template slot="itemRender" slot-scope="{ route }">
        <span v-if="!route.href">{{ route.name }}</span>
        <a v-else @click="updateRouter(route.href)">{{ route.name }}</a>
      </template>
    </a-breadcrumb>
  </div>
</template>

<script>
  import routesInfo from "@/router/routesInfo.js";
  var getRoutesUrlMap = (routes, lastUrlInfos) => {
    if (!routes) {
      return [];
    }
    var urlMap = {};
    routes.forEach((item) => {
      var newLastUrlInfos = [
        ...lastUrlInfos,
        {
          name: item.name,
          href: item.href,
        },
      ];
      if (item.href) {
        urlMap[item.href] = newLastUrlInfos;
      }
      if (item.children && item.children.length) {
        urlMap = {
          ...urlMap,
          ...getRoutesUrlMap(item.children, newLastUrlInfos),
        };
      }
    });

    return urlMap;
  };

  var routersUrlMap = getRoutesUrlMap(routesInfo, []);
  export default {
    name: "ProcBreadcrumb",
    data() {
      return {
        routerMap: routersUrlMap,
        breadcrumbList: [],
      };
    },
    mounted() {
      this.getBreadcrumbList();
    },
    methods: {
      getBreadcrumbList() {
        var fullPath = this.$route.path;
        var breadcrumbList = [];
        if (fullPath) {
          breadcrumbList = this.routerMap[fullPath] || [];
        }
        breadcrumbList = breadcrumbList.map((item, index) => ({
          ...item,
          path: `item_${index}`,
        }));

        /*var extraItem = {
          name: "首页",
          href: "/Index",
          path: "/"
        };
        breadcrumbList.unshift(extraItem);*/

        this.breadcrumbList = breadcrumbList;
      },
      updateRouter(path) {
        //var fullPath = this.$route.fullPath;
        let fullPath = this.$route.path;
        if (fullPath === path) {
          this.$store.commit("VXRouterViewKey", new Date().getTime());
        } else {
          this.$router.push(path);
        }
      },
    },
    watch: {
      $route() {
        this.getBreadcrumbList();
      },
    },
  };
</script>

<style lang="scss" scope>
  #proc_breadcrumb {
    display: inline-block;
    .breadcrumb_i {
      position: absolute;
      float: left;
      height: 25px;
      margin-top: 8px;
      padding-left: 40px;
      box-sizing: border-box;
      background: url(../../../../assets/images/location.png) left 18px center
      no-repeat;
      font-weight: 400;
    }
    .location {
      float: left;
      margin-top: 4px;
      color: #333;
    }
    .ant-breadcrumb-link {
      a:link,
      a:hover,
      a:active,
      a:visited {
        text-decoration: none;
      }
    }
  }
</style>
