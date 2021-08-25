<template>
    <div class="build-code">
      <codemirror ref="myCm"
                  :value="code"
                  :options="cmOptions"
                  @ready="onCmReady"
                  @focus="onCmFocus"
                  @input="onCmCodeChange">
      </codemirror>
      <a-row style="text-align: center;margin-top: 10px">
        <a-button  type="primary" @click="copyHandle">复制</a-button>
      </a-row>
    </div>
</template>

<script>
   import {codemirror} from 'vue-codemirror'
   import 'codemirror/lib/codemirror.css'
   import 'codemirror/theme/mdn-like.css'
   import 'codemirror/mode/htmlmixed/htmlmixed'
   import 'codemirror/mode/javascript/javascript.js'
   import 'codemirror/mode/css/css.js'
   import 'codemirror/mode/xml/xml.js'
   import 'codemirror/mode/clike/clike.js'
   import 'codemirror/mode/vue/vue.js'

   import generateCode from './generateCode.js'
    export default {
      name: "BuildCode",
      props:['pageConfig'],
      components:{
          codemirror
      },
      data(){
        return{
          code:'const a = 10 ',
          cmOptions: {
            tabSize: 4,
            theme: 'mdn-like',
            lineNumbers: true,
            line: true,
            mode: {name:'javascript',json:true}
          }
        }
      },
      methods:{
        onCmReady(cm) {
          console.log('the editor is readied!', cm)
        },
        onCmFocus(cm) {
          console.log('the editor is focus!', cm)
        },
        onCmCodeChange(newCode) {
          console.log('this is new code', newCode)
          this.code = newCode
        },
        copyHandle(){
          var oInput = document.createElement('textarea');
          oInput.value = this.code;
          document.body.appendChild(oInput);
          oInput.select(); // 选择对象
          document.execCommand("Copy"); // 执行浏览器复制命令
          oInput.style.display='none';
          this.$message.success('复制成功',0.5);
        }
      },
      mounted() {
        this.code = generateCode(this.pageConfig)
      }

    }
</script>

<style lang="scss" scoped>
 /deep/ .CodeMirror{
    border: 1px solid #eee;
    height: 660px;
    font-size: 16px;
    line-height: 130%;
  }

.build-code{
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
