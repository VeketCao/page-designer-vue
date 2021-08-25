var routesInfo = [
  {
    name: '首页',
    href: "/Index",
  },
  {
    name: '菜单一',
    href: '',
    children: [
      {
        name: '模块一',
        href: '/menu1/m1'
      },
    ]
  },
  {
    name: '样例DEMO',
    href: '',
    children: [
      {
        name: '异步加载',
        href: '/sample/async_load'
      },
    ]
  },
];
export default routesInfo;
