import Home from '@/views/Home/Home'
import Index from '@/views/Index/Index'
import NewPage from "@/views/NewPage/NewPage"

const routes = [
{
  path: "/",
  name: "home",
  component: Home,
  redirect: '/Index',
  children: [{
      path: '/Index',
      name: 'Index',
      component: Index
    },
    {
      path: '/menu1/m1',
      name: '/menu1/m1',
      component: (resolve)=>{require(['../views/Menu1/M1/M1'],resolve)}
    },
    {
      path: '/sample/async_load',
      name: '/sample/async_load',
      component: (resolve)=>{require(['../views/Sample/AsyncLoadDemo/AsyncLoadDemo'],resolve)}
    },
  ]
},
{
  path: "/n",
  name: "/n",
  component: NewPage,
  children:[
    {
      path: '/n/designer',
      name: '/n/designer',
      component: (resolve)=>{require(['../views/Designer/Main'],resolve)}
    },
    {
      path: '/n/preview',
      name: '/n/preview',
      component: (resolve)=>{require(['../views/Designer/RenderPage/Preview'],resolve)}
    },
  ]
}
]

export default routes
