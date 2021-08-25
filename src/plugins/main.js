/*
//主要以element为主
import './antdesign'
import './element'
*/

//主要以ant为主
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import components from "./components";
import designerComponents from '@/views/Designer/components/main'

export default {
  initPlugins(Vue){
    window.Bus = new Vue()
    Vue.use(Antd)
    Vue.use(components)
    Vue.use(designerComponents)
  }
}
