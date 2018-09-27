<script>
/**
 * @file         上传文件组件
 * @autor        chuntyang
 * Aug 02 2018
 * url           上传网址
 * uploadSuccess 上传成功的回调
 * type          上传文件的类型 eg：  .csv
 * tip           上传类型提示
 * cover         是否覆盖上一个上传的文件
 * cookie        是否携带cookie
 * multiple      是否支持多文件上传
 * limit         限制上传文件的个数
 */
export default {
    created() {
    },
    props: {
        url: {
            type: String,
            required: true
        },
        dataUpload: {
            type: Object,
            default: () => null
        },
        uploadSuccess: {
            type: Function
        },
        type: {
            type: String,
            default: () => ''
        },
        tip: {
            type: String,
            default: () => ''
        },
        cover: {
            type: Boolean,
            default: () => false
        },
        cookie: {
            type: Boolean,
            default: () => false
        },
        multiple: {
            type: Boolean,
            default: () => false
        },
        limit: {
            type: Number,
            default: () => null
        }
    },
    data() {
        return {
            fileList: [],
            fullscreenLoading: false
        };
    },
    methods: {
        submitUpload() {
            this.fullscreenLoading = true;
            this.$refs.upload.submit();
        },
        handleChange(file, fileList) {
            if (this.cover) {
                this.fileList = fileList.slice(-1);
            }
        },
        success(response, files) {
            this.fullscreenLoading = false;
            switch (response.status) {
                case 0:
                    if (this.uploadSuccess) {
                        this.uploadSuccess(response, files);
                    }
                    break;
                default:
                    this.$message.error(response.statusInfo);
            }
            this.$refs.upload.clearFiles();
        },
        error(err, file, filelist) {
            this.fullscreenLoading = false;
            this.$message.error('文件上传错误');
        },
        clearFiles() {
            this.$refs.upload.clearFiles();
        }
    }
};
</script>
<template>
<div class="task-manager"
 v-loading.fullscreen.lock="fullscreenLoading"
 element-loading-background="rgba(0, 0, 0, 0.5)"
 element-loading-text="文件上传中请稍等">
    <el-upload
      class="upload-demo"
      ref="upload"
      :data="dataUpload"
      :action="url"
      :accept="type"
      :multiple="multiple"
      :file-list="fileList"
      :with-credentials="cookie"
      :on-change="handleChange"
      :on-success="success"
      :on-error="error"
      :limit="limit"
      :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip">{{tip}}</div>
    </el-upload>
</div>
</template>
<style rel="stylesheet/less" lang="less" slot-scope>

</style>