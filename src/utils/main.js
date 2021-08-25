/**
 * 全局公共方法
 */
let s={};

/**接口返回正确编码**/
s.SUCCESS_CODE = '00000'

/**未登陆编码**/
s.UN_LOGIN_CODE = '10403'

/**
 * 删除非数字字符
 *@param string 字符串
 *@return number 数字
 */
s.toNumber=function(string){
    if(string){
      return string.replace(/[^0-9.]/ig,"")
    }else{
      return ''
    }

}

/**
 *星期
 */
s.weekOptions=[
  {label:'星期一',value:1},
  {label:'星期二',value:2},
  {label:'星期三',value:3},
  {label:'星期四',value:4},
  {label:'星期五',value:5},
  {label:'星期六',value:6},
  {label:'星期日',value:7},
]

/**
 * @param len
 * @param radix
 * @returns {string}
 */
s.getUUID = function (len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
    uuid = [], i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

/**
 * 判断系统，设置样式
 * @constructor
 */
s.OSnow=function(){
  var agent = navigator.userAgent.toLowerCase();
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
    // alert("这是windows32位系统");
  }
  if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
    // alert("这是windows64位系统");
    setTimeout(() => {
      $('#app .ant-menu').css('fontFamily','Microsoft YaHei');
      $('#app .ant-table').css('fontFamily','Microsoft YaHei');
    }, 20);
  }
  if(isMac){
    // alert("这是mac系统");
    setTimeout(() => {
      $('#app .ant-menu').css('fontFamily','PingFangSC-Regular');
      $('#app .ant-table').css('fontFamily','PingFangSC-Regular');
    }, 20);
  }
}


/**
   * json 数据转化成树状结构
   * @param data 数据源
   * @param pid 子节点关联父id key 名称
   * @param id 父节点关联id key 名称
   * @param value 父节点id value 值
   * @param keyValue 父节点 key名称 追加到 子节点（非必须）
   */
s.getJsonTree=function(data,pid,id,value,keyValue){
  var itemArr=[];
  data.forEach(item=>{
    if(item[pid]===value){
        var children = s.getJsonTree(data,pid,id,item[id],keyValue)
        var newNode = item
        if(keyValue){
          var parentData =  data.find(i=>i[id]===item[pid])
          if(parentData){
            for( parent in keyValue){
              newNode[parent] = parentData[keyValue[parent]]
            }
          }
        }
        if(children.length>0){
          newNode.children=children
        }
        itemArr.push(newNode)
    }
  })
  return itemArr;

}

/**
 * 千分位分割
 * @param num 输入数字
 */
s.thousandNum=function(num=0){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 金额控制
 * @param v
 * @returns {string}
 */
s.inputMoney=function(v){
  if(!v) return ''
  //如果输入非数字，则替换为''
  v= v.replace(/[^\d\.]/g, '');
  //必须保证第一个为数字而不是.
  v = v.replace(/^\./g,'');
  //保证只有出现一个.而没有多个.
  v = v.replace(/\.{2,}/g,'.');
  //保证.只出现一次，而不能出现两次以上
  v = v.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
  //只能输入四位小数
  v = v.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');
  return v
}

s.getRoutesUrlMap = (routes, lastUrlInfos) => {
  if (!routes) {
    return [];
  }
  var urlMap = {};
  routes.forEach(item => {
    var newLastUrlInfos = [
      ...lastUrlInfos,
      {
        name: item.name,
        href: item.href
      }
    ];
    if (item.href) {
      urlMap[item.href] = newLastUrlInfos;
    }
    if (item.children && item.children.length) {
      urlMap = {
        ...urlMap,
        ...s.getRoutesUrlMap(item.children, newLastUrlInfos)
      };
    }
  });

  return urlMap;
}


export default s
