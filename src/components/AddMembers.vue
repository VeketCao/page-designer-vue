<template>
    <div id="proc_addmembers">
        <a-modal
            :title="title"
            :visible="visible"
            :confirmLoading="confirmLoading"
            :bodyStyle="{height: '440px',overflow: 'hidden',padding: '10px 20px 0'}"
            :okButtonProps="{ props: {disabled: selectedRowKeysRight.length == 0} }"
            okText="确认"
            cancelText="取消"
            @ok="handleOk"
            @cancel="handleCancel"
            width="85%"
            class="proc_addmembers"
        >
            <div class="addmembers_left">
                <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" />
                <a-tree
                    :treeData="treeData"
                    @select="this.onSelect"
                    showLine
                    defaultExpandAll
                >   
                    <!-- <span slot="title0010" style="color: #1890ff">sss</span> -->
                </a-tree>
            </div>
            <div class="addmembers_center">
                <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onSearchCenter" />
                <a-table :dataSource="centerData" :columns="centerColumns" :pagination="{ pageSize: 5 }"
                    :rowSelection="{selectedRowKeys: selectedRowKeysCenter, onChange: onSelectChangeCenter, 
                    onSelect: onSelectCenter, onSelectAll: onSelectAllCenter}">
                </a-table>
            </div>
            <div class="addmembers-right">
                <a-table :columns="rightColumns" :dataSource="rightData" :pagination="{ pageSize: 5 }"
                    :rowSelection="{selectedRowKeys: selectedRowKeysRight, onChange: onSelectChangeRight}">
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                </a-table>
            </div>
        </a-modal>
    </div>
</template>

<script>
export default {
    name: 'ProcAddMembers',
    props: ['title'],
    data () {
        return {
            visible: false,
            confirmLoading: false,
            // -----left-----
            treeData: [{
                title: 'parent 1',
                key: '0-0',
                children: [{
                    title: 'parent 1-0',
                    key: '0-0-0',
                    // disabled: true,
                    children: [
                        { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
                        { 
                            title: 'leaf', 
                            key: '0-0-0-1',
                            children: [{
                                title: 'leafabc', 
                                key: 'A083354',
                            }]
                        },
                    ],
                }, {
                    title: 'parent 1-1',
                    key: '0-0-1',
                    children: [
                        { key: '0-0-1-0', slots: { title: 'title0010' }},
                    ],
                }],
            }],
            // -----center-----
            centerColumns: [{
                title: 'Name',
                key: 'name',
                dataIndex: 'name'
            }, {
                title: 'Age',
                key: 'age',
                dataIndex: 'age'
            }],
            centerData: [{
                key: '1',
                name: 'John Brown',
                age: 31,
            }, {
                key: '2',
                name: 'Jim Green',
                age: 42,
            }, {
                key: '3',
                name: 'gdhfg',
                age: 32,
            }, {
                key: '4',
                name: 'kiull',
                age: 32
            }, {
                key: '5',
                name: '5656etr',
                age: 42
            }, {
                key: '6',
                name: 'rwer',
                age: 52
            }, {
                key: '7',
                name: 'Joe Black',
                age: 65
            }],
            selectedRowKeysCenter: [],
            // ----right------
            rightColumns: [{
                title: 'Name',
                dataIndex: 'name',
                scopedSlots: { customRender: 'name' }
            }, {
                title: 'Age',
                dataIndex: 'age'
            }],
            rightData: [],
            selectedRowKeysRight: [],
            checkedData: []
        }
    },
    methods: {
        // 显示弹窗函数
        showModal(_showModal) {
            this.visible = _showModal;
        },
        // 点确定按钮事件
        handleOk(e) {
            this.confirmLoading = true;
            setTimeout(() => {
                this.visible = false;
                //console.log('checkedData:',this.checkedData);
                this.confirmLoading = false;
            }, 2000);
        },
        // 点取消事件
        handleCancel(e) {
            this.visible = false
        },
        // left
        onChange (e) {
            const value = e.target.value;
            const expandedKeys = this.treeData.map((item) => {
                if (item.key.indexOf(value) > -1) {
                    return getParentKey(item.key, gData);
                }
                return null
            }).filter((item, i, self) => item && self.indexOf(item) === i)
            Object.assign(this, {
                expandedKeys,
                searchValue: value,
                autoExpandParent: true,
            })
        },
        onSelect (selectedKeys, info) {
            //console.log('selected', selectedKeys, info);
        },
        // center
        onSearchCenter () {

        },
        onSelectChangeCenter (selectedRowKeys, selectedRows) {
            //console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
            this.selectedRowKeysCenter = selectedRowKeys;
            this.rightData = selectedRows;
            this.selectedRowKeysRight = selectedRowKeys;
        },
        // 单选
        onSelectCenter (record, selected, selectedRows, nativeEvent) {
            // console.log('单选:',record, selected, selectedRows, nativeEvent);
            // console.log('单选:',selectedRows);
        },
        // 全选
        onSelectAllCenter (selected, selectedRows, changeRows) {
            // console.log('全选:',selected, selectedRows, changeRows);
            // console.log('全选:',selectedRows);
        },
        // right
        onSelectChangeRight (selectedRowKeys, selectedRows) {
            // console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
            this.selectedRowKeysRight = selectedRowKeys;
            this.checkedData = selectedRows;
        }
    }
}
</script>

<style lang="scss" scope>
    #proc_addmembers {
        height: 100%;
    }
</style>
<style lang="scss">
    .ant-modal.proc_addmembers {
        top: 50px;
        .ant-modal-content {
            .ant-modal-body {
                .addmembers_left {
                    width: 30%;
                    height: 100%;
                    float: left;
                    padding-right: 20px;
                    border-right: 1px solid #eee;
                    display: flex;
                    flex-direction: column;
                    .ant-input-search {
                        height: 32px;
                    }
                    .ant-tree {
                        flex: 1;
                        overflow-x: hidden;
                    }
                }
                .addmembers_center {
                    width: 40%;
                    height: 100%;
                    float: left;
                    padding: 0 10px;
                    border-right: 1px solid #eee;
                    .custom-filter-dropdown {
                        padding: 8px;
                        border-radius: 4px;
                        background: #fff;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
                    }
                    .highlight {
                        background-color: rgb(255, 192, 105);
                        padding: 0px;
                    }
                }
                .addmembers-right {
                    width: 30%;
                    height: 100%;
                    float: left;
                    padding: 0 10px;
                }
            }
        }
    }
</style>