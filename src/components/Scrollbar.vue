<template>
    <el-scrollbar
        class="default-scrollbar"
        wrap-class="default-scrollbar__wrap"
        view-class="default-scrollbar__view"
        v-bind="$attrs"
    >
        <slot></slot>
    </el-scrollbar>
</template>

<script>
import { Scrollbar } from "element-ui";
export default {
    name: "scrollbar",
    components: {
        "el-scrollbar": Scrollbar
    }
};
</script>

<style lang="scss">
.el-main {
    width: 100%;
    height: 100%;
    padding: 0;
}
.el-main.default {
    height: auto;
    padding: 20px;
}
// 撑满父容器
.default-scrollbar {
    width: 100%;
    height: 100%;
}
.flex-scrollbar {
    width: auto;
    height: auto;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}
// 消除横向进度条
.el-scrollbar__wrap.default-scrollbar__wrap {
    overflow-x: hidden;
}

// 使进度条紧贴右边
.el-scrollbar__view.p20-scrollbar__view {
    padding: 20px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
}
</style>


