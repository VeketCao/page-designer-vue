import Vue from 'vue'
import {
	Button,
	Select,
	Input,
	Loading,
	MessageBox,
	Message,
	Container,
	Header,
	Footer,
	Aside,
	Main,
	Tooltip,
	/*Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,*/
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Avatar,
	Notification,
	Collapse,
	CollapseItem,
	Form,
	FormItem,
	Row,
	Col,
	Table,
	TableColumn,
	DatePicker,
	TimeSelect,
	Option,
	OptionGroup,
	Checkbox,
    Radio,
	Pagination,
	Tag,
	Calendar,
	Dialog,
    Popover,
    Cascader,
    Tree,
    CheckboxButton,
    CheckboxGroup,
	RadioButton,
	RadioGroup,
    Tabs,
    TabPane,
	/*Breadcrumb,
	BreadcrumbItem,*/
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
// 全局Pagination样式
import '@/assets/style/element.scss'

// Element注册
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Button);
Vue.use(Select);
Vue.use(Input);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Container);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Tooltip);
/*Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);*/
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Avatar);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Pagination);
Vue.use(Tag);
Vue.use(Calendar);
Vue.use(Dialog);
Vue.use(Popover);
Vue.use(Cascader);
Vue.use(Tree);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(Tabs);
Vue.use(TabPane);
/*Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);*/

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
