<template>
  <div class="m-selector">
    <!--默认显示搜索框-->
    <div :class="{'focus':focusverification}" class="app-divs" v-if="!configuration">
      <div class="app-div1">
        <div class="app-cotda clearfix app-overflow">
          <div class="app-udu" v-for="(item,index) in backfill" :key='item.id' :class="{clearpadding:pdisabled}">
            <span>{{item.name}}</span>
            <i class="app-item iconfont icon-m-selector-guanbi1"  @click.stop="getDelete(index)" v-if="!pdisabled"></i>
          </div>
          <div class="app-dfide" v-show="!pdisabled">
            <div v-if="!radios" style="display: flex;">
              <input @focus="getFocus()" type="text" :placeholder="displayprompt"  @input="getInputSimple()" v-model="inputmodel" @blur="getBlur" autocomplete="off" >
            </div>
            <div v-if="radios" style="display: flex;">
              <input @focus="getFocus()" type="text" ref="inputFocus" :placeholder="displayprompt"  @input="getInputSimple()" v-model="inputmodel" @blur="getBlur" v-show="backfill<1" autocomplete="off" >
            </div>
          </div>
        </div>
      </div>
      <span v-show="!pdisabled" class="clearfix appt-pooers">
        <div class="icon-box">
          <span class="app-post iconfont icon-m-selector-user" @click.stop="getPopUps"></span>
        </div>
      </span>

    </div>
  </div>
</template>

<script>
  export default {
    name: "MSelector",
    data(){
      return{
        configuration: false, //切换控件形态
        focusverification:false,//聚焦
        pdisabled: false,//禁用
        backfill: [{name:'曹涛'},{name:'爱新觉罗'}],//输入框回填数据
        maxwidths: '',
        radios: false,
        displayprompt:'请输入关键字',
        inputmodel:'',
        popup: false,//弹窗
        fuzzySearch:[],//下拉搜索结果
      }
    },
    methods:{
      getDelete(index){

      },
      getFocus() {
        this.focusverification = true;
      },
      getInputSimple() {

      },
      getBlur() {
        this.inputmodel = "";
        this.focusverification = false;
      },
      getPopUps(){
        this.popup = !this.popup;
      },
    }

  }
</script>

<style lang="scss" scoped>
/*字体图标*/
@font-face {
  font-family: "iconfont";
  src: url('./iconfont.eot?t=1498466410444');
  src: url('./iconfont.eot?t=1498466410444#iefix') format('embedded-opentype'), url('./iconfont.woff?t=1498466410444') format('woff'), url('./iconfont.ttf?t=1498466410444') format('truetype'), url('./iconfont.svg?t=1498466410444#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-m-selector-guanbi1:before { content: "\e730"; }
.icon-m-selector-guanbi1:before { content: "\e731"; }
.icon-m-selector-user:before { content: "\e710"; }

.m-selector{
  min-width: 200px !important;
  white-space: normal;
  line-height: 0 !important;
  .app-divs {
    position: relative;
    display: inline-block;
    width: 100%;
    max-height: 90px;
    box-sizing: border-box;
    border: 1px solid #cbced8;
    background-color: #fff;
    border-radius: 3px;
    padding-right: 30px;
    cursor: text;
    .app-div1 {
      position: relative;
      width: 100%;
      max-height: 90px;
      min-height: 28px;
      box-sizing: border-box;
      overflow: hidden;
      cursor: text;
      border-right: 1px solid #e8e8e8;
      .app-overflow {
        width: calc(100% + 17px);
        max-height: 88px;
        min-height: 28px;
        overflow: auto;
      }
    }
  }
  .app-divs:hover{ border: 1px solid #767C93 ; }
  .focus{ border: 1px solid #20a0ff !important;}
  ::-moz-placeholder { color: #97a8be !important; }
  ::-webkit-input-placeholder { color: #97a8be !important;  }
  :-ms-input-placeholder { color: #97a8be !important;  }
  .app-divs .app-quete {
    display: inline-block;
    height: 100%;
    padding: 0 5px;
  }
  .app-divs .app-udu {
    position: relative;
    float: left;
    display: inline-block;
    height: 22px;
    line-height: 22px;
    border-radius: 12px;
    margin:3px 3px;
    background: #148ef5;
    border: 1px solid #148ef5;
    box-sizing: border-box ;
    color: #fff;
    padding: 0 25px 0 10px;
  }
  .app-divs .app-udu>span {
    white-space: nowrap;
  }
  .app-divs .app-udu>.span-sele {
    display: inline-block !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .app-divs .app-udu .app-item {
    position: absolute;
    right:7px;
    top: 2px !important;
    display: inline-block;
    width: 12px;
    height: 12px;
    font-size: 12px;
    cursor: pointer;
    transform: scale(0.7) !important;
    -ms-transform: scale(0.7) !important;	/* IE 9 */
    -moz-transform: scale(0.7) !important;	/* Firefox */
    -webkit-transform: scale(0.7) !important;/* Safari 和 Chrome */
    -o-transform: scale(0.7) !important;	/* Opera */
    color: #fff;
  }
  .app-divs .app-dfide {
    float: left;
    display: inline-block;
    height: 100%;
    font-size: 0px;
    margin-bottom: 4px;
  }
  .app-divs .app-dfide input {
    display: inline-flex;
    box-sizing: border-box;
    width: 165px;
    height: 24px;
    outline: none;
    font-size: 12px !important;
    padding-top:5px;
    padding-left: 10px;
    line-height: normal;
  }
  .app-divs .app-dfide input::-ms-clear {
    display: none;
  }
  .app-divs .app-dfide input::-ms-reveal {
    display: none;
  }
  .app-divs .app-post {
    font-size: 16px;
    position: absolute;
    top:50% ;
    left: 20%;
    margin: -25% 0;
  }
  .clearpadding {
    padding: 0 10px 0 10px !important
  }
  .clearfix:after {
    content: " ";
    display: block;
    clear: both;
    height: 0;
  }
  .appt-pooers{
    position: absolute;
    display: inline-block;
    top: 0;
    right: 0;
    color: #6b728b;
    cursor: pointer;
    width: 30px;
    height: 100%;
    line-height: 17px;
    font-size: 18px;
    margin-top: 0;
    .icon-box{
      position: relative;
      width: 100%;
      height: 100%
    }
  }
  .appt-pooers .icon-m-selector-user:before {
    color: #6a707b !important;
    font-size: 18px;
  }

}
</style>
