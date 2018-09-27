<script>
import {resetObject, setObject} from '../../../common/util';
export default {
  created() {
  },
  props: {
      title: {
          type: String,
          required: true
      },
      dialogWidth: {
          type: String,
          default: () => '50%'
      },
      codeEvent: {
         type: Function
      },
      searchEvent: {
          type: Function
      },
      codeDetail: {
          type: Object
      }
  },
  data() {
      return {
          modelVisible: false,
          codeQuery: {
              name: '',
              code: '',
              shortCode: ''
          }
      }
  },
  methods: {
      modelStatus(val) {
          this.modelVisible = val;
      },
      async submit() {
        const params = this.codeDetail ? {...this.codeQuery, id: this.codeDetail.id} : this.codeQuery;
        const {status} = await this.codeEvent(params);
        console.log(status);
        if (Object.is(status, 0)) {
            this.searchEvent();
            this.$message.success(`${this.title}成功`);
        }
        this.modelVisible = false;
        resetObject(this.codeQuery);
      }
  },
  mounted() {
  },
  computed: {
  },
  watch: {
      codeDetail(val) {
          setObject(this.codeQuery, val);
      }
  }
}
</script>
<template>
<div class="edit">
  <el-dialog
    :title="title"
    :width="dialogWidth"
    :visible.sync="modelVisible"
    :modal-append-to-body="false"
    :close-on-click-modal="false">
    <el-form :model="codeQuery" ref="information">
      <el-form-item label="字段代号" label-width="100px">
          <el-input v-model="codeQuery.code"></el-input>
      </el-form-item>
      <el-form-item label="字段简写" label-width="100px">
          <el-input v-model="codeQuery.shortCode"></el-input>
      </el-form-item>
      <el-form-item label="字段名称" label-width="100px">
          <el-input v-model="codeQuery.name"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
          <el-button @click="modelVisible = false" size="small">取消</el-button>
          <el-button type="success"
            @click="submit" size="small">提交</el-button>
    </div>
</el-dialog>
</div>
</template>
<style scoped lang="stylus">
.el-input
    width 90%

</style>