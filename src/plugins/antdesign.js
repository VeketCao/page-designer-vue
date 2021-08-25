/* eslint-disable no-unused-vars */
import Vue from 'vue'
// 转移模块
import {
  Layout,
  Breadcrumb,
	/*Form,
	AutoComplete,
	Input,
	DatePicker,
	Button,
	Table,
	Modal,
	Select,*/
	Icon,
	Spin,
  ConfigProvider,
  TreeSelect,
  Menu,
} from 'ant-design-vue'

import '@/assets/style/antdesign.scss'
/*
Spin.setDefaultIndicator({
	indicator: (h) => {
		return <a-icon type='loading' style='font-size: 36px;' />
	},
})*/
import 'ant-design-vue/lib/layout/style/css'
import 'ant-design-vue/lib/breadcrumb/style/css'
/*import 'ant-design-vue/lib/form/style/css'
import 'ant-design-vue/lib/auto-complete/style/css'
import 'ant-design-vue/lib/input/style/css'
import 'ant-design-vue/lib/date-picker/style/css'
import 'ant-design-vue/lib/button/style/css'
import 'ant-design-vue/lib/table/style/css'
import 'ant-design-vue/lib/modal/style/css'
import 'ant-design-vue/lib/select/style/css'*/
import 'ant-design-vue/lib/icon/style/css'
import 'ant-design-vue/lib/spin/style/css'
import 'ant-design-vue/lib/config-provider/style/css'
import 'ant-design-vue/lib/tree-select/style/css'
import 'ant-design-vue/lib/menu/style/css'

Vue.use(Layout)
Vue.use(Breadcrumb)
Vue.use(ConfigProvider)
/*Vue.use(Form)
Vue.use(AutoComplete)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(Table)
Vue.use(Modal)
Vue.use(Select)*/
Vue.use(Icon)
Vue.use(Spin)
Vue.use(TreeSelect)
Vue.use(Menu)
