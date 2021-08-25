<template>
   <div class="item-opts">
     <div v-if="this.data">
       <a-form-model
         ref="modalForm"
         class="form"
         type="flex"
         justify="space-between"
         :model="data"
         :rules="formRules"
         :labelCol="modalCol.labelCol"
         :wrapperCol="modalCol.wrapperCol"
       >
         <a-form-model-item label="KEY" prop="key">
           <span>{{data.key}}</span>
         </a-form-model-item>

         <template v-if="data.scope=='form'">
           <a-form-model-item label="字段名称" prop="label" v-if="data.hasOwnProperty('label')">
             <a-input  v-model="data.label"></a-input>
           </a-form-model-item>
           <a-form-model-item label="字段标识" prop="model" v-if="data.hasOwnProperty('model')">
             <a-input  v-model="data.model"></a-input>
           </a-form-model-item>
         </template>

         <template v-if="data.hasOwnProperty('options')">
           <a-form-model-item label="标题" prop="title" v-if="data.options.hasOwnProperty('title')">
             <a-input  v-model="data.options.title"></a-input>
           </a-form-model-item>
           <a-form-model-item label="URL" prop="title" v-if="data.options.hasOwnProperty('url')">
             <a-input v-model="data.options.url"></a-input>
           </a-form-model-item>

           <template v-if="data.scope=='form'">
             <a-form-model-item label="输入类型" v-if="data.options.hasOwnProperty('dataType')">
               <a-select placeholder="请选择" :allowClear="false" v-model="data.options.dataType">
                 <a-select-option value="string" >字符串</a-select-option>
                 <a-select-option value="number" >数字</a-select-option>
               </a-select>
             </a-form-model-item>
             <a-form-model-item label="宽度" prop="title" v-if="data.options.hasOwnProperty('width')">
               <a-input  v-model="data.options.width"></a-input>
             </a-form-model-item>
           </template>
         </template>

         <template v-if="data.hasOwnProperty('rules') && data.rules.length>0">
           <a-form-model-item label="必填" prop="title" v-if="data.rules[0].hasOwnProperty('required')">
             <a-checkbox v-model="data.rules[0].required" > </a-checkbox>
           </a-form-model-item>
         </template>

       </a-form-model>
     </div>
   </div>
</template>

<script>
  export default {
    name: "ItemOpts",
    props:['data'],
    data(){
      return{
        formRules:{},
        modalCol: {
          labelCol: { span: 6 },
          wrapperCol: { span: 16},
        },
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .ant-form  {
    label{
      font-size: 12px;
    }
    .ant-form-item {
      margin-bottom: 5px;
      font-size: 12px;
    }
  }

.item-opts{
  padding-top: 10px;
  width: 100%;
  min-height: 100px;
}
</style>
