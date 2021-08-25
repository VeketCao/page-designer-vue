/**设计器内部组件**/
import MTest from "./MTest/MTest";
import ImageShow from "./ImageShow/ImageShow";

export default (Vue) => {
  Vue.component("MTest", MTest)
  Vue.component("ImageShow", ImageShow)
}
