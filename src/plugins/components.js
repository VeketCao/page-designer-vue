/**自定义组件**/
import LinkageTree from '@/components/LinkageTree'
import Import from "@/components/Import";
import Scrollbar from "@/components/Scrollbar";
import AsyncComponent from "@/components/AsyncComponent";
import ScrollPane from "@/components/ScrollPane";
/*
import { Icon } from 'ant-design-vue'
const CommonIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1154787_uin4qvctzlp.js'
})
*/
export default (Vue) => {
  Vue.component("LinkageTree", LinkageTree),
    Vue.component("Import", Import),
    Vue.component("CustomScrollbar", Scrollbar),
    Vue.component("ScrollPane", ScrollPane),
    Vue.component("AsyncComponent", AsyncComponent)
}
