/**
 * 转换成Vue表单页面
 * @param data
 */
let convertToFormVue = (data)=>{
  let AllItemTemp = '';

  data.items.forEach((item)=>{
    let itemTemp = '';
    if(item.type == 'input'){
      if(item.options.dataType == 'number'){
        itemTemp = `<a-input-number
                      :disabled="${item.options.disabled}"
                      :style="\`width:${item.options.width}\`"
                      v-decorator='[ \`${item.model}\`,{initialValue: \`${item.options.defaultValue}\`,rules: ${JSON.stringify(item.rules)} }]'
                    />`
      }else{
        itemTemp = `<a-input
                       :style="\`width:${item.options.width}\`"
                       :disabled="${item.options.disabled}"
                       placeholder="${item.options.placeholder}"
                       :allowClear="${item.options.clearable}"
                       v-decorator='[\`${item.model}\`,{initialValue: \`${item.options.defaultValue}\`,rules: ${JSON.stringify(item.rules)} }]'
                    />`
      }
    }
    if(item.type == 'textarea'){
      itemTemp = `<a-textarea
                  :style="\`width:${item.options.width}\`"
                  :autoSize="{
                    minRows: ${item.options.minRows},
                    maxRows: ${item.options.maxRows}
                  }"
                  :disabled="${item.options.disabled}"
                  placeholder="${item.options.placeholder}"
                  :allowClear="${item.options.clearable}"
                  :maxLength="${item.options.maxLength}"
                  :rows="3"
                  v-decorator='[\`${item.model}\`,{initialValue:\`${item.options.defaultValue}\`,rules: ${JSON.stringify(item.rules)} }]'
                />`
    }

    let itemFormTemp = `<a-col :span="${item.w}">
            <a-form-item :label-col="lw.labelCol"
                :wrapper-col="lw.wrapperCol">
              <span slot="label">
                <span v-text="\`${item.label}\`"></span>
              </span>
              ${itemTemp}
            </a-form-item>
          </a-col>`

    AllItemTemp+=itemFormTemp;

  });

  return `<template>
       <div class="contentPart">
          <a-form :form="form">
            <a-row>
                ${AllItemTemp}
            </a-row>
          </a-form>
          <a-row style="text-align: center">
            <a-button  type="primary" @click="handleSubmit">提交</a-button>
          </a-row>
        </div>
    </template>

<script>
  export default {
    data () {
      return {
        form:this.$form.createForm(this),
        lw:{
          labelCol: { span: 4 },
          wrapperCol: { span: 18 },
        }
      }
    },
    methods: {
      handleSubmit(e) {
        this.getData().then((rtn)=>{
          alert(JSON.stringify(rtn))
        })
      },
      reset() {
        // 重置表单
        this.form.resetFields();
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

    }
  }
</script>`


}
/**
 * 生产页面代码
 * @param data
 * @returns {string}
 */
let convertToPageVue=(data)=>{
  let AllItemTemp = `<grid-layout ref="gridlayout" :layout.sync="items"
                   :col-num="24"
                   :row-height="20"
                   :is-draggable="false"
                   :is-resizable="false"
                   :vertical-compact="true"
                   :use-css-transforms="true"
      >

        <grid-item :key="item.i" v-for="(item,index) in items"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
        >
        <div style="overflow: hidden;width: 100%;height: 100%">
            <component :is="item.type" :options="item.options"></component>
        </div>
        </grid-item>
      </grid-layout>`;


  return `<template>
        <div class="contentPart">
            ${AllItemTemp}
        </div>
    </template>

<script>
  import {GridLayout, GridItem} from "vue-grid-layout";
  export default {
    data () {
      return {
        items:${JSON.stringify(data.items)},
      }
    },
    components:{
      GridLayout,
      GridItem
    },
    methods: {

    },
    mounted(){

    }
  }
</script>`

}

export default function (data) {
  let rtn = ''
  if(data.items.length == 0)  rtn = '';

  if (data.type=='form' && data.items.length>0) {
    rtn = convertToFormVue(data)
  } else if(data.type=='page' && data.items.length>0){
    rtn =  convertToPageVue(data)
  }
  return rtn ;
}
