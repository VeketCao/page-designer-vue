<template>
  <component
    :is="mode"
    v-bind="$attrs"
    v-on="$listeners">
  </component>
</template>

<script>
  import Axios from 'axios';

  export default {
    name: 'AsyncComponent',
    props:['options'],
    inheritAttrs: true,
    data() {
      return {
        resData: '',
        mode: ''
      };
    },
    watch: {
      'options.url': {
        immediate: true,
        async handler(val, oldVal) {
          if (!this.options.url) return;
          // Cache 缓存 根据 url 参数
          if (!window.SyncComponentCache) {
            window.SyncComponentCache = {};
          }
          try{
            let res;
            if (!window.SyncComponentCache[this.options.url]) {
              window.SyncComponentCache[this.options.url] = Axios.get(this.options.url);
              res = await window.SyncComponentCache[this.options.url];
            } else {
              res = await window.SyncComponentCache[this.options.url];
            }
            let Fn = Function;
            this.mode = new Fn(`return ${res.data}`)();
          }catch (e) {
          }
        }
      }
    }
  };
</script>
