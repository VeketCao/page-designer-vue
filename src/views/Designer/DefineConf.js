
/**定义接口**/
export default {
  /**
   * 获取左侧栏基础组件配置
   */
  getBasicComponents(){
    return [
      {
        type:'MTest',
        label:'文本显示',
        scope:'page',
        options:{
          title:'MTest',
          text:'HelloWorld'
        },
        w: 4,
        h: 6
      },
      {
        type:'ImageShow',
        label:'图片显示',
        scope:'page',
        options:{
          url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190122%2F9903e7691c5b43869f01fdb621afb927.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632367917&t=03c7bbd80f12ffd315ca8d86305515cf',
          width:200,
          height:200
        },
        w: 4,
        h: 6
      },
    ]
  },
  getAntFormComponents(){
    return [
      {
        type: "input", // 表单类型
        label: "输入框", // 标题文字
        scope:'form',
        options: {
          dataType: "string",
          width: "100%", // 宽度
          defaultValue: "", // 默认值
          placeholder: "请输入", // 没有输入时，提示文字
          clearable: false,
          maxLength: null,
          addonBefore: "",
          addonAfter: "",
          hidden: false, // 是否隐藏，false显示，true隐藏
          disabled: false // 是否禁用，false不禁用，true禁用
        },
        w: 24, // 数据字段
        h: 2,
        rules: [
          //验证规则
          {
            'required': false, // 必须填写
            'message': '必填项'
          }
        ]
      },
      {
        type: "textarea", // 表单类型
        label: "文本框", // 标题文字
        scope:'form',
        options: {
          width: "100%", // 宽度
          minRows: 3,
          maxRows: 6,
          maxLength: null,
          defaultValue: "",
          clearable: false,
          hidden: false, // 是否隐藏，false显示，true隐藏
          disabled: false,
          placeholder: "请输入"
        },
        w: 24, // 数据字段
        h: 4,
        rules: [
          {
            'required': false,
            'message': '必填项'
          }
        ]
      },
    ]
  },
  getAdvanceComponents(){//高级组件
    return[
      {
        type:'AsyncComponent',
        label:'异步加载',
        scope:'page',
        options:{
          url:'http://supd-admin-dev.mideazy.com/pkg/TestA/TestA.min.js',
        },
        w: 24,
        h:3
      }
    ]
  }

}
