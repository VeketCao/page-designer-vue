<template>
    <div class="render-page">
      <a-form :form="form">
        <grid-layout ref="gridlayout" :layout.sync="data.items"
                     :col-num="colNum"
                     :row-height="20"
                     :is-draggable="false"
                     :is-resizable="false"
                     :vertical-compact="true"
                     :use-css-transforms="true"
        >

          <grid-item :key="item.i" v-for="(item,index) in data.items"
                     :x="item.x"
                     :y="item.y"
                     :w="item.w"
                     :h="item.h"
                     :i="item.i"
          >
            <div class="item-context">
              <template v-if="item.scope=='page'">
                <node-item :data="item"></node-item>
              </template>
              <template v-if="item.scope=='form'">
                <div class="form-item-context">
                  <form-item :data="item" :formConfig="data"></form-item>
                </div>
              </template>
            </div>
          </grid-item>
        </grid-layout>
      </a-form>
      <a-row style="text-align: center" v-if="data.type == 'form'">
        <a-button  type="primary" @click="handleSubmit">提交</a-button>
      </a-row>
    </div>
</template>

<script>
  import {GridLayout, GridItem} from "vue-grid-layout";
  import NodeItem from "../MidPage/NodeItem";
  import FormItem from '../MidPage/FormItem';
  export default {
    name: "RenderPage",
    props:['data'],
    components:{
      GridLayout,
      GridItem,
      NodeItem,
      FormItem
    },
    data(){
      return{
        colNum:24,
        form: this.$form.createForm(this),
        showSubmitBtn:false
      }
    },
    methods:{
      handleSubmit(e) {
        this.getData().then((rtn)=>{
          alert(JSON.stringify(rtn))
        })
      },
      getData() {
        return new Promise((resolve,reject)=>{
          try {
            this.form.validateFields((err,values)=>{
              if (err) {
                reject(err);
              }else {
                resolve(values);
              }
            })
          }catch (err) {
            console.error(err);
            reject(err);
          }
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
.render-page{
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  .item-context{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .vue-grid-layout {
    min-height: 660px;
  }
  .vue-grid-item:not(.vue-grid-placeholder) {
    background: #fff;
  }
  .vue-grid-item .resizing {
    opacity: 0.9;
  }
  .vue-grid-item .static {
    background: #fff;
  }
  .vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
  }
  .vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
  }
  .vue-grid-item .minMax {
    font-size: 12px;
  }
  .vue-grid-item .add {
    cursor: pointer;
  }
}
</style>
