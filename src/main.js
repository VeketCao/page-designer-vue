import App from './App'
import router from './router'
import store from './store'
import Plugins from './plugins/main'
Plugins.initPlugins(Vue);
import Directive from './utils/directive'
Directive.initDirective(Vue);
import '@/assets/css/base.css';
import httpClient from "./utils/httpClient";
import AppUtil from "./utils/main"
window.http = httpClient
window.AppUtil = AppUtil

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})



