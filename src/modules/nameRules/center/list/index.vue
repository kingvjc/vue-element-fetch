<script>
import codeTable from '../../../common/table';
import edit from './codeEdit';
import topBar from './topbar';
import columnsConfig from '../../../common/columns';
import {mapActions, mapMutations, mapGetters} from 'vuex';
export default {
	created() {
		this.getCodeList();
	},
	data() {
		return {
			codeDetail: null
		}
	},
	methods: {
		async handleDelete(row){
			const id = row.id;
			const {status} = await this.deleteCode({id});
			if (Object.is(status, 0)) {
				this.$message.success('删除成功');
				this.getCodeList();
			}
		},
		handleEdit(row) {
			this.codeDetail = row;
			this.$nextTick(()=> {
				this.$refs.edit.modelStatus(true);
			});
		},
		...mapActions('nameRules',['getCodeList', 'deleteCode', 'editCode']),
		...mapMutations('nameRules', {
			initCodePage: 'INIT_CODE_PAGE'
		})
	},
	computed: {
		...mapGetters('nameRules', ['codeOption']),
		columns() {
			return columnsConfig;
		}
	},
	components: {
		codeTable, topBar, edit
	}
}
</script>
<template>
<div class="rule-list">
	<top-bar :handlerCodeSearch="getCodeList"></top-bar>
    <code-table
     :data="codeOption.codeList"
     :columns="columns.codeColumns"
     :searchEvent="getCodeList"
     :initPageOptions="initCodePage"
     :pageOptions="codeOption.pageQuery"
    >
        <el-table-column label="操作" align="center" width="150" slot="operate">
            <template slot-scope="scope">
	            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
	        	<el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
	        </template>
        </el-table-column>
    </code-table>
    <edit ref="edit"
	  title="字段编辑"
	  dialogWidth="40%"
	  :codeEvent="editCode"
	  :searchEvent="getCodeList"
	  :codeDetail="codeDetail"
	></edit>
</div>
</template>
<style scoped lang="stylus">
.rule-list
    padding 0 5px
</style>
