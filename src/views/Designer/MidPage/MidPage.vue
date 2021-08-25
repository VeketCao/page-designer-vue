<template>
  <div id="mid-page-container" @dragover="allowDrop">
    <a-form :form="form">
      <grid-layout ref="gridlayout" :layout.sync="data.items"
                   :col-num="colNum"
                   :row-height="20"
                   :is-draggable="true"
                   :is-resizable="true"
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
          <div class="item-context" :class="{active:(curSelect&&curSelect.key==item.key)}" @mousedown.stop="mouseDown(index)">
            <template v-if="item.scope=='page'">
              <node-item :data="item"></node-item>
            </template>
            <template v-if="item.scope=='form'">
              <div class="form-item-context">
                <form-item :data="item" :formConfig="data"></form-item>
              </div>
            </template>
            <a-icon type="delete" class="remove" @click="removeItem(index)"/>
          </div>
        </grid-item>
      </grid-layout>
    </a-form>

  </div>
</template>

<script>
  import {GridLayout, GridItem} from "vue-grid-layout";
  import NodeItem from "./NodeItem";
  import FormItem from './FormItem';

  let mouseXY = {"x": null, "y": null};
  let DragPos = {"x": null, "y": null, "w": 1, "h": 1, "i": null};

  export default {
    name: "MidPage",
    props:['data','select'],
    components:{
      GridLayout,
      GridItem,
      NodeItem,
      FormItem
    },
    data(){
      return{
        colNum:24,
        curSelect: this.select,
        form: this.$form.createForm(this),
      }
    },
    created(){
      Bus.$on('dragendEvent',this.dragendEventHandle)
      Bus.$on('dragEvent',this.dragEventHandle)
      Bus.$on('addClickEvent',this.addEventHandle)
      document.addEventListener("dragover", function (e) {
        mouseXY.x = e.clientX;
        mouseXY.y = e.clientY;
      }, false);
    },
    methods:{
      allowDrop(e){
        e.preventDefault();
      },
      mouseDown(index){
        this.curSelect = this.data.items[index];
      },
      addItem(it,x,y,i){
        it = JSON.parse(JSON.stringify(it));
        let num = Math.ceil(Math.random() * 99999);
        let key = Date.parse(new Date()) + '_' + num;
        it.key = key;
        it.model = it.type + key
        it.label = it.label + num
        it.x = x;
        it.y = y;
        it.i = i;
        this.data.items.push(it);
        console.log('add',it)
      },
      addEventHandle(it){
        this.addItem(it,
          (this.data.items.length * it.w) % (this.colNum || 12),
          this.data.items.length + (this.colNum || 12),
          this.data.items.length
        )
        this.curSelect = this.data.items[this.data.items.length-1];
      },
      dragEventHandle(it){
        let parentRect = document.getElementById('mid-page-container').getBoundingClientRect();
        let mouseInGrid = false;
        if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
          mouseInGrid = true;
        }
        if (mouseInGrid === true && (this.data.items.findIndex(item => item.i === 'drop')) === -1) {
          this.addItem(it,
            (this.data.items.length * it.w) % (this.colNum || 12),
            this.data.items.length + (this.colNum || 12),
            'drop'
          )
        }
        let index = this.data.items.findIndex(item => item.i === 'drop');
        if (index !== -1) {
          try {
            this.$refs.gridlayout.$children[this.data.items.length].$refs.item.style.display = "none";
          }catch (e) {
          }

          let el = this.$refs.gridlayout.$children[index];
          el.dragging = {"top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left};
          let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);
          if (mouseInGrid === true) {
            this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
            DragPos.i = String(index);
            DragPos.x = this.data.items[index].x;
            DragPos.y = this.data.items[index].y;
          }
          if (mouseInGrid === false) {
            this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
            this.data.items = this.data.items.filter(obj => obj.i !== 'drop');
          }
        }
      },
      dragendEventHandle(it){
        let parentRect = document.getElementById('mid-page-container').getBoundingClientRect();
        let mouseInGrid = false;
        if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
          mouseInGrid = true;
        }
        if(mouseInGrid){
          this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
          this.data.items = this.data.items.filter(obj => obj.i !== 'drop');
          this.addItem(it,DragPos.x,DragPos.y,DragPos.i)
          this.curSelect = this.data.items[this.data.items.length-1];
          //this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x,DragPos.y,1,1);
          try {
            this.$refs.gridLayout.$children[this.data.items.length].$refs.item.style.display="block";
          }catch (e) {
          }
        }
      },
      removeItem(index){
        this.data.items.splice(index, 1);
        this.curSelect = null
      }
    },
    watch: {
      select (val) {
        this.curSelect = val
      },
      curSelect: {
        handler (val) {
          this.$emit('update:select', val)
        },
        deep: true
      }
    },
    beforeDestroy() {
      Bus.$off('dragendEvent',this.dragendEventHandle)
      Bus.$off('dragEvent',this.dragEventHandle)
    },
  }
</script>
<style scoped lang="scss" >
#mid-page-container{
  .remove {
    position: absolute;
    right: 1px;
    top: 1px;
    cursor: pointer;
  }
  .item-context{
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*.form-item-context{
      padding:15px 0px;
    }*/
    &.active{
      border: 2px solid #409eff;
    }
  }
  .vue-grid-layout {
    //background: #eee;
    //height: calc(100% - 10px)!important;
    min-height: 660px;
  }
  .vue-grid-item:not(.vue-grid-placeholder) {
    background: #F4F6FC;
    border: 1px solid #409eff;
  }
  .vue-grid-item .resizing {
    opacity: 0.9;
  }
  .vue-grid-item .static {
    background: #F4F6FC;
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
