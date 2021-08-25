<template>
    <a-modal id="linkage"
        title="新增管理员"
        v-model="visible" @ok="handleOk"
        okText="确定" cancelText="取消"
        centered width="90%"
        :bodyStyle="{ height: `${windowHeight}px`, overflow: 'hidden' }"
    >
        <div class="linkageContent">
            <div class="linkageTreeNode">
                <a-tree
                    v-if="visible"
                    :loadData="onLoadData"
                    :treeData="treeData"
                    @select="treeNodeSelect"
                >
                </a-tree>
            </div>
            <div class="linkageTableNode">
                <a-input-search
                    placeholder="搜索用户"
                    @search="onSearch" class="search"
                    v-model="valueSearch"
                />
                <span class="old">已选择 {{selectedRowOld.length}} 人</span>
                <span class="new">已选择 {{selectedRowKeysNew.length}} 人</span>
                <a-table
                    :rowClassName="(record, index)=>index%2==0?'baseRow':'evenRow'"
                    :rowSelection="rowSelection"
                    style="width:49%;float:left;"
                    :columns="columns"
                    :dataSource="dataSource"
                    :scroll="{y: windowHeight - 208 }"
                    :loading="loading"
                    :pagination="{
                        showTotal: (total, range) =>`共${total}人`,
                        pageSize: pageSize,
                        total: total||0,
                        current: current,
                        showSizeChanger: true,
                        pageSizeOptions: ['5', '10', '30', '50']
                    }"
                    rowKey="uid"
                    @change="handleChange"
                ></a-table>
                <a-table
                    :rowClassName="(record, index)=>index%2==0?'baseRow':'evenRow'"
                    :rowSelection="{
                        selectedRowKeys:selectedRowKeysNew,
                        onChange:onSelectChange
                    }"
                    style="width: 49%;float: right;"
                    :columns="columnsNew"
                    :dataSource="dataNew"
                    :scroll="{y: windowHeight - 208 }"
                    :pagination="{
                        showTotal: (total, range) =>`共${total}人`
                    }"
                    rowKey="uid"
                ></a-table>
                <!--
                    第一种类型: 以对象为rowSelection的参数
                    第二种类型: 以方法为rowSelection的参数
                 -->
            </div>
        </div>
    </a-modal>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

const columns = [{
        title: '账号',
        dataIndex: 'uid',
        width: '25%'
    }, {
        title: '姓名',
        dataIndex: 'username',
        width: '25%'
    }, {
        title: '所属部门',
        dataIndex: 'shortDepartmentName',
        width: '50%'
    }];
const columnsNew = [{
        title: '姓名',
        dataIndex: 'username',
        width: '25%'
    }, {
        title: '所属部门',
        dataIndex: 'shortDepartmentName',
        // positionName
        width: '50%'
    }];;
export default {
    name: 'Linkage',
    props: ['defaultActiveKey'],
    data(){
        return {
            visible: false,
            dataSource: [],
            columns,
            dataNew:[],
            columnsNew,
            selectedRowKeysNew:[],
            tableHeight: 200,
            treeData: [],
            loading: false,
            dataSum: [],
            dataSumKey: [],
            pageSize: 10,
            current: 1,
            total: null,
            isSearch: false,
            dataParameter: null,
            nodeParameter: null,
            valueSearch: '',
            selectedRowOld: [],
            windowHeight: $(document).height()*0.7
        }
    },
    methods:{
        onSelectChange(selectedRowKeys){
            this.getArrDifference([...selectedRowKeys],[...this.selectedRowKeysNew])
            this.selectedRowKeysNew = [...selectedRowKeys];
        },
        getArrDifference(arrFirst, arrLast) {
            return arrFirst.concat(arrLast).filter((item, i, arr) => {
                return arr.indexOf(item) === arr.lastIndexOf(item)
            })
        },
        handleChange (pagination, filters, sorter) {
            this.current = pagination.current;
            this.pageSize = pagination.pageSize;

            if(this.isSearch) this.onSearch(this.valueSearch, null, true)
            else this.treeNodeSelect(this.dataParameter,this.nodeParameter, true)
        },
        onLoadData (treeNode) {
            return new Promise((resolve) => {
                if (treeNode.dataRef.children) {
                    resolve()
                    return
                }
                http.post('/department/get_internal',{o: treeNode.dataRef.key}).then(( result )=>{
                    const treeNodeList = result.data.departments;
                    let childrenNode = []
                    for( let i in treeNodeList ){
                        childrenNode.push(
                            { title: treeNodeList[i].name, name: treeNodeList[i].o, key: treeNodeList[i].o }
                        )
                    }
                    treeNode.dataRef.children = childrenNode
                    this.treeData = [...this.treeData]
                    resolve()
                })
            })
        },
        treeNodeSelect( data, node, boolean ){
            this.dataParameter = data
            this.nodeParameter = node
            this.selectedRowOld = new Array;
            if( !boolean ) {this.current = 1;this.total = null;}
            if(this.isSearch){ this.current = 1;this.pageSize = 10;this.valueSearch = ''}
            this.isSearch = false;this.loading = true;
            http.post('/department/get_internal',{o: data[0], withAccount: true,
                pageNum: this.current,pageSize: this.pageSize, pageAccount: true,total: this.total
            }).then(( result )=>{
                this.total = result.data.accounts.total;
                if( result.data ){
                    this.dataSource = result.data.accounts.list;
                }
                this.loading = false;
            })
        },
        handleOk(){
            const accounts = new Array
            for( let i in this.selectedRowKeysNew ){
                for( let k in this.dataNew ){
                    if( this.selectedRowKeysNew[i] == this.dataNew[k].uid ){
                        accounts.push({uid: this.dataNew[k].uid,username: this.dataNew[k].username})
                    }
                }
            }
            var url = ''
            if( this.defaultActiveKey == 'business' ){
                url = '/role/members/add_business'
            }else if( this.defaultActiveKey == 'it' ){
                url = '/role/members/add_it'
            }
            http.post(url,{businessTypeId: this.VX_everyClickId, accounts: accounts}).then(( result )=>{
                if( result.returnCode != AppUtil.SUCCESS_CODE ){
                    this.$message.error(result.returnMsg);
                }else{
                    this.visible = false;
                    this.$emit( 'updated' )
                }
                this.loading = false;
            })
        },
        onSearch( value, KeyboardEvent, boolean ){
            if( value == '' ) return
            this.valueSearch = value;
            if( !boolean ) {this.current = 1;this.total = null;}
            if(!this.isSearch){ this.current = 1;this.pageSize = 10;}
            this.isSearch = true;this.loading = true;
            http.post('/account/search',{
                total: this.total,
                param: value,
                pageNum: this.current,
                pageSize: this.pageSize
            }).then(( result )=>{
                if( result.data ){
                    this.total = result.data.total;
                    if(result.data.list.length === 0) this.$message.info('未找到相关数据!')
                    this.dataSource = result.data.list;
                }else if(result.returnCode != AppUtil.SUCCESS_CODE) this.$message.error(result.returnMsg);
                this.loading = false;
            });
        },
        MergeArrayObj(arr1,arr2){
            var _arr = new Array();
            for(var i=0;i<arr1.length;i++){
                _arr.push(arr1[i]);
            }
            for(var i=0;i<arr2.length;i++){
                var flag = true;
                for(var j=0;j<arr1.length;j++){
                    if(arr2[i].uid==arr1[j].uid){
                        flag=false;
                        break;
                    }
                }
                if(flag){
                    _arr.push(arr2[i]);
                }
            }
            return this.removeDuplicatedItem(_arr);
        },
        MergeArray(arr1,arr2){
            var _arr = new Array();
            for(var i=0;i<arr1.length;i++){
                _arr.push(arr1[i]);
            }
            for(var i=0;i<arr2.length;i++){
                var flag = true;
                for(var j=0;j<arr1.length;j++){
                    if(arr2[i]==arr1[j]){
                        flag=false;
                        break;
                    }
                }
                if(flag){
                    _arr.push(arr2[i]);
                }
            }
            return this.removeDuplicatedItem(_arr);
        },
        removeDuplicatedItem(arr) {
            for(var i = 0; i < arr.length-1; i++){
                for(var j = i+1; j < arr.length; j++){
                    if(arr[i]==arr[j]){
                        arr.splice(j,1);
                        j--;
                    }
                }
            }
            return arr;
        },
        windowSize(){
            this.windowHeight = $(document).height()*0.7
        },
        getTreeInit(){
            http.post('/department/get_internal',{
                pageAccount: true,
                pageNum: this.current,
                pageSize: this.pageSize
            }).then(( result )=>{
                if( result.data ){
                    const treeNode = result.data.departments;
                    this.treeData = new Array;
                    for( let i in treeNode ){
                        this.treeData.push(
                            { title: treeNode[i].name, name: treeNode[i].o, key: treeNode[i].o }
                        )
                    }
                }
            });
        }
    },
    computed: {
        ...mapGetters(['VX_everyClickId']),
        rowSelection() {
            const { selectedRowKeys } = this;
            return {
                selectedRowKeys: this.selectedRowKeysNew,   // 第一种双向联动方式
                onChange: (selectedRowKeys, selectedRows) => {
                    this.selectedRowOld = selectedRows;
                    this.selectedRowKeysNew = [...selectedRowKeys]
                    this.dataSum = [...selectedRows]
                    this.dataSumKey = [...selectedRowKeys]
                    this.dataNew = this.MergeArrayObj(this.dataNew,this.dataSum)
                    this.selectedRowKeysNew = this.MergeArray(this.selectedRowKeysNew,this.dataSumKey)
                }
            }
        },
    },
    watch: {
        visible(){
            if( this.visible ){
                this.selectedRowKeysNew = new Array
                this.dataSource = new Array
                this.dataNew = new Array
                this.getTreeInit()
            }
        }
    },
    mounted(){
        window.onresize = () => this.windowSize()
    }
}
</script>

<style lang="scss" scope>
@import 'src/assets/scss/content.scss';
.linkageContent{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .linkageTreeNode{
        min-width: 200px;
        overflow-y: auto;
        height: 100%;
    }
    .linkageTableNode{
        flex: 1;
        .search{
            width: 25%;
            float: left;
            margin-bottom: 10px;
        }
        .old,.new{
            line-height: 32.5px;
            margin-bottom: 10px;
        }
        .old{
            float:left;width:24%;text-align:right;
        }
        .new{
            float: right;
        }
    }
}
</style>
