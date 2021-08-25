import elementResizeDetectorMaker from 'element-resize-detector'
/**
 * 注入全局指令
 */

let directive = {
  initDirective(Vue){
    Vue.directive('resize', {
      bind(el, relevant, vNode) {
        if (relevant.modifiers.number) {
          const erd = elementResizeDetectorMaker()
          erd.listenTo(el, (element) => {
            const formatter = element.offsetHeight - (Number(relevant.arg) || 0)
            vNode.context[relevant.expression] = formatter < 0 ? 0 : formatter
          })
        }
      }
    });

    ///点击下拉框外的其它区域时关闭下拉框
    Vue.directive('clickoutside',{
      bind(el, binding, vnode) {
        function documentHandler(e) {
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)
          }
        }
        function KeyUp(e) {
          if (e.keyCode === 27) {
            if (binding.expression) {
              binding.value(e)
            }
          }
        }
        el.__vueClickOutSize__ = documentHandler
        el.__vueKeyup__ = KeyUp
        document.addEventListener('keyup', KeyUp)
        document.addEventListener('click', documentHandler)
      },
      unbind(el, binding) {
        document.removeEventListener('click', el.__vueClickOutSize__)
        delete el.__vueClickOutSize__
        document.removeEventListener('keyup', el.__vueKeyup__)
        delete el.__vueKeyup__
      }
    })


  }
}
export default directive
