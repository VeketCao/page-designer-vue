<template>
  <div class="left-cate">
    <div class="cate-list">
      <a-collapse v-model="activeKey">
        <a-collapse-panel key="1" header="基础组件">
          <ul>
            <li class="cate-item" v-for="(item,index) in basicComponents" :key="index" >
              <a @drag="drag($event,item)" @dragend="dragend($event,item)"  draggable="true"
                 unselectable="on" @dragover="allowDrop" @click="clickAddHandle(item)">
                <span>{{item.label}}</span>
              </a>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="Ant表单组件">
          <ul>
            <li class="cate-item" v-for="(item,index) in antComponents" :key="index" >
              <a @drag="drag($event,item)" @dragend="dragend($event,item)"  draggable="true"
                 unselectable="on" @dragover="allowDrop" @click="clickAddHandle(item)">
                <span>{{item.label}}</span>
              </a>
            </li>
          </ul>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="高级组件">
          <ul>
            <li class="cate-item" v-for="(item,index) in advanceComponents" :key="index" >
              <a @drag="drag($event,item)" @dragend="dragend($event,item)"  draggable="true"
                 unselectable="on" @dragover="allowDrop" @click="clickAddHandle(item)">
                <span>{{item.label}}</span>
              </a>
            </li>
          </ul>
        </a-collapse-panel>
        <!--<a-collapse-panel key="1" header="基础组件">
          <draggable tag="ul" :list="antComponents"
                     v-bind="{group:{ name:'g', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                     @start="handledragStart"
                     @end="handledragEnd"
                     :move="allowMove"
                     :forceFallback="true">
            <li class="cate-item" v-for="(item,index) in basicComponents" :key="index" >
              <a @mousedown="mouseDownHandle($event,item)">
                <span>{{item.label}}</span>
              </a>
            </li>
          </draggable>
        </a-collapse-panel>-->
        <!--<a-collapse-panel key="2" header="Ant表单组件">
          <draggable tag="ul" :list="antComponents"
                     v-bind="{group:{ name:'g', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                     @start="handledragStart"
                     @end="handledragEnd"
                     :move="allowMove"
                     :forceFallback="true">
            <li class="cate-item" v-for="(item,index) in antComponents" :key="index" :type="item.type">
              <a><span>{{item.label}}</span></a>
            </li>
          </draggable>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="高级组件" >
          <draggable tag="ul" :list="advanceComponents"
                     v-bind="{group:{ name:'g', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
                     @start="handledragStart"
                     @end="handledragEnd"
                     :move="allowMove"
                     :forceFallback="true">
            <li class="cate-item" v-for="(item,index) in advanceComponents" :key="index" :type="item.type">
              <a><span>{{item.label}}</span></a>
            </li>
          </draggable>
        </a-collapse-panel>-->
      </a-collapse>
    </div>
  </div>
</template>

<script>
  import api from '../DefineConf'
  export default {
    name: "LeftCate",
    components:{
    },
    data(){
      return{
        activeKey:['1'],
        basicComponents:api.getBasicComponents(),
        antComponents:api.getAntFormComponents(),
        advanceComponents:api.getAdvanceComponents(),
        selItem:null,
      }
    },
    methods:{
      drag(e,v){
        e.dataTransfer.setData("text", e.target.id);
        Bus.$emit('dragEvent',v)
      },
      dragend(e,v){
        Bus.$emit('dragendEvent',v)
      },
      allowDrop(e){
        e.preventDefault();
      },
      clickAddHandle(v){
        Bus.$emit('addClickEvent',v)
      }
    },
  }
</script>

<style scoped lang="scss">
  /deep/ .ant-collapse{
    border: unset;
    line-height: 0.8;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
    .ant-collapse-content > .ant-collapse-content-box{
      padding: 0px;
    }
    .ant-collapse-item > .ant-collapse-header {
      line-height:15px;
    }
    .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
      left: unset;
      right: 10px;
    }

  }
  .left-cate{
    position: fixed;
    top: 44px;
    bottom: 0;
    left: 0;
    width: 250px;
    background-color: #fff;
    border-right: 1px solid #d9d9d9;
    .cate-list{
      padding: 5px 0px;
      width: 100%;
      height: 100%;
      position: relative;
      .title{
        font-size: 14px;
        line-height: 20px;
        margin: 12px 12px 5px 12px;
      }
      ul{
        position: relative;
        overflow: hidden;
        padding: 5px 10px 5px;
        margin: 0;
      }
      .cate-item{
        position: relative;
        width: 48%;
        margin: 1%;
        line-height: 26px;
        border: 1px solid #f4f6fc;
        border-radius: 2px;
        background-color: #f4f6fc;
        cursor: move;
        transition: background ease-in-out 0.15s;
        float:left;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
        font-size: 12px;
        &:hover{
          color: #409EFF;
          border: 1px dashed #409EFF;
        }

        &>a{
          display: block;
          cursor: move;
          background: #F4F6FC;
          border: 1px solid #F4F6FC;

          span{
            display: inline-block;
            vertical-align: middle;
            padding-left: 18px;
          }
        }

      }
      .cate-item-wd{
        position: relative;
        width: 100%;
        margin: 1%;
        line-height: 26px;
        border-radius: 2px;
        margin-top: 5px;
      }
    }
  }
</style>
