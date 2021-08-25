<template>
  <div class="page-opts">
    <div v-if="data">
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
        <a-form-model-item label="页面类型" prop="title" v-if="data.hasOwnProperty('type')">
          <a-select placeholder="请选择" v-model="data.type" >
            <a-select-option value="page" >页面</a-select-option>
            <a-select-option value="form" >表单</a-select-option>
          </a-select>
        </a-form-model-item>

      </a-form-model>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PageOpts",
    props:['data'],
    data(){
      return{
        formRules:{},
        modalCol: {
          labelCol: { span: 6 },
          wrapperCol: { span: 16 },
        },
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.ant-form  {
    .ant-form-item {
      margin-bottom: 0px;
    }
    label{
      font-size: 12px;
    }
  }
  .page-opts{
    padding-top: 10px;
    width: 100%;
    min-height: 100px;
  }
</style>
