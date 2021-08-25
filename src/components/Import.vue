<template>
    <a-modal
        :title="title"
        v-model="visibled"
        :keyboard="false"
        @ok="handleOk"
        cancelText="取消"
        okText="确定"
    >
        <a-upload-dragger name="file" :multiple="true" :action="action" @change="handleChange">
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">点击或将文件拖拽到这里上传</p>
            <p class="ant-upload-hint">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</p>
        </a-upload-dragger>
    </a-modal>
</template>

<script>
export default {
    name: 'ProcImport',
    props: ['title','action'],
    data(){
        return {
            visibled: false
        }
    },
    methods: {
        handleChange(info) {
            const status = info.file.status;
            if (status !== 'uploading') {
                //console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                this.$message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                this.$message.error(`${info.file.name} file upload failed.`);
            }
        },
        handleOk( parameter ){
            this.visibled = false;
            this.$emit('handleOk',parameter)
        }
    },
}
</script>

<style lang="scss" scope>
@import 'src/assets/scss/content.scss';
</style>
