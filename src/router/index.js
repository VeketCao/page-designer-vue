import Vue from 'vue'
import Router from 'vue-router'
import routes from './route.config.js'

Vue.use(Router)

/**解决重复路由报错问题**/
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  routes
})

router.beforeEach((to,from,next)=>{
  next();
})

export default router
