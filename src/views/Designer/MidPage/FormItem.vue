<template>
  <a-form-item
    :label-col="lw.labelCol"
    :wrapper-col="lw.wrapperCol"
  >
    <span slot="label">
      <span v-text="data.label"></span>
    </span>
    <template v-if="data.type == 'input' " >
      <a-input-number
        v-if=" data.options.dataType == 'number'"
        :disabled="data.options.disabled"
        :style="`width:${data.options.width}`"
        v-decorator="[ data.model,{initialValue: data.options.defaultValue,rules: data.rules }]"
      />
      <a-input  v-else
         :style="`width:${data.options.width}`"
         :disabled="data.options.disabled"
         :placeholder="data.options.placeholder"
         :allowClear="data.options.clearable"
         v-decorator="[ data.model,{initialValue: data.options.defaultValue,rules: data.rules }]"
      />
    </template>

    <a-textarea v-if="data.type === 'textarea'"
      :style="`width:${data.options.width}`"
      :autoSize="{
        minRows: data.options.minRows,
        maxRows: data.options.maxRows
      }"
      :disabled="data.options.disabled"
      :placeholder="data.options.placeholder"
      :allowClear="data.options.clearable"
      :maxLength="data.options.maxLength"
      :rows="3"
      @change="handleChange($event.target.value, data.model)"
      v-decorator="[ data.model,{initialValue: data.options.defaultValue,rules: data.rules }]"
    />

  </a-form-item>
</template>

<script>
  export default {
    name: "FormItem",
    props:['data','formConfig'],
    data(){
      return{
        lw:{
          labelCol: { span: 4 },
          wrapperCol: { span: 18 },
        }
      }
    },
    methods:{
      handleChange(e, key) {
        let value = e;
        if (e && e.target) {
          value = e.target.value;
        }
        this.$emit("change", value, key);
      }
    },
    mounted() {
      console.log('formConfig',this.formConfig)
      console.log('data',this.data)
    }
  }
</script>

<style scoped>

</style>
