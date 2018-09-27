<script>
import {mapActions, mapMutations, mapGetters} from 'vuex';
import edit from './codeEdit';
import config from '../../common/config';
export default {
	created() {
	},
	props: {
		handlerCodeSearch: {
			type: Function,
			required: true
		}
	},
	data() {
        return {
        	searchQuery: {
        		id: '',
        		name: '',
        		code: ''
        	}
        }
    },
	methods: {
		addCodeModel() {
			this.$refs.edit.modelStatus(true);
		},
		beforeImportUpload(file) {
			const uploadType = config.uploadMessage.find(item => {
				return item.type === file.type;
			});
			if (!uploadType) {
				this.$message.warning('上传文件格式错误');
			}
			return uploadType ? true : false;
		},
		uploadSuccess() {
			this.$message.success('文件上传成功');
			this.handlerCodeSearch();
		},
		...mapActions('nameRules', ['addCode']),
		...mapMutations('nameRules', {
			changeCodeValue: 'CHANGE_CODE_VALUE'
		})
	},
	computed: {
		...mapGetters('nameRules', ['codeOption']),
		config() {
			return config;
		}
	},
	components: {
		edit
	}
}
</script>
<template>
<div class="name-search">
    <el-header>
    	<el-button type="success" size="small" icon="el-icon-plus" @click="addCodeModel">新增字段</el-button>
    	<!-- <el-upload
		  class="avatar-uploader"
		  action="http://localhost:3000/api/fileUpload"
		  :show-file-list="false"
		  :before-upload="beforeImportUpload"
		  :on-success="uploadSuccess">
		  <i class="el-icon-upload"></i>
		  导入文件
		</el-upload> -->
    </el-header>
	<el-row :gutter="20">
	    <el-col :span="4">
	  	    <el-input v-model ="searchQuery.id"
	  	      placeholder="请输入id"
	  	      size="small"
	  	      @change="changeCodeValue(searchQuery)"></el-input>
	    </el-col>
	    <el-col :span="4">
	        <el-input v-model="searchQuery.name"
	          placeholder="请输入名称"
	          size="small"
	          @change="changeCodeValue(searchQuery)"></el-input>
	    </el-col>
	    <el-col :span="4">
	        <el-input v-model="searchQuery.code"
	          placeholder="请输入字段"
	          size="small" 
	          @change="changeCodeValue(searchQuery)"></el-input>
	    </el-col>
	    <el-col :span="4">
	        <el-button type="success" size="small" @click="handlerCodeSearch">搜索</el-button>
	    </el-col>
	</el-row>
	<edit ref="edit" 
	  title="新增字段"
	  dialogWidth="40%"
	  :codeEvent="addCode"
	  :searchEvent="handlerCodeSearch"
	></edit>
</div>
</template>
<style scoped lang="stylus">
.el-header
    line-height 60px
    padding 0 10px
.avatar-uploader
    display inline-block
    margin-left 80%
</style>