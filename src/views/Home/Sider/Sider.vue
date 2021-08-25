<template>
    <div id="proc_sider">
        <a-layout-sider width="210"
            v-model="VX_collapsed"
        >
            <div class="proc_sider_container">
                <div class="proc_sider">
                    <proc-menu></proc-menu>
                </div>
            </div>
        </a-layout-sider>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import ProcMenu from "@/views/Home/Sider/components/menu.vue"
export default {
    name: 'ProcSider',
    components: {
        ProcMenu
    },
    computed:{
        ...mapState(["VX_collapsed"])
    },
}
</script>

<style lang="scss" scope>
#proc_sider{
    box-shadow: 2px 0 6px rgba(0,0,0,.1);
    .ant-layout-sider{
        overflow: hidden;
        height: 100%;
        .proc_sider_container{
            width: 100%;height: 100%;
            .proc_sider{
                height: 100%;
                overflow: hidden;
            }
            .proc_sider:hover{
                overflow: auto;
            }
        }

    }
}
</style>
