<template>
    <div class="contract_form_index">
       <div class="container-header">
          <div class="Wall">
            <div class="words">表单详情</div>
          </div>
       </div>

       <div class="popContent">
         表单内容
       </div>

       <div class="dialog-btns">
         <button class="btn btn_primary " type="button" >暂存</button>
         <button class="btn btn_primary " type="button" >发起审批</button>
         <button class="btn btn_primary " type="button" >直接审结</button>
         <button class="btn btn_primary " type="button" >废弃流程</button>
         <button class="btn btn_default isView isSpView" type="button" onclick="window.close();">关闭</button>
       </div>
    </div>
</template>

<script>
export default {
    name: "ContractForm",
}
</script>

<style lang="scss" scoped>
.contract_form_index{

}
</style>
