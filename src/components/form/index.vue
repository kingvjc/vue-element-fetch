<script>
/**
 * @file form组件
 * @author chuntyang
 * July 15, 2018
 * columns      列
 * width        label宽度
 * model        绑定数据
 * selectOption option配置
 * validSuccess 验证通过回调
 * resetEvent   重置事件回调
 */
export default {
    created() {
    },
    data() {
        return {
        };
    },
    props: {
        width: {
            type: String,
            default: () => '80px'
        },
        columns: {
            type: Array,
            required: true
        },
        model: {
            type: Object,
            required: true
        },
        selectOption: {
            type: Object
        },
        validSuccess: {
            type: Function,
            required: true
        },
        resetEvent: {
            type: Function
        }
    },
    methods: {
        submitForm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$refs.ruleForm.clearValidate();
                    this.validSuccess();
                }
            });
        },
        resetForm() {
            this.resetEvent();
            this.$refs.ruleForm.clearValidate();
        }
    },
    computed: {
    },
    mounted() {
    }
};
</script>

<template>
<div class="my-form">
<el-form :model="model" ref="ruleForm" :label-width="width">
    <template v-for="item in columns">
        <slot :name="item.slot" v-if="item.slot"></slot>
        <el-form-item v-else-if="item.type==='select'"
          :key="item.label"
          :label="item.label"
          :prop="item.prop"
          :rules="item.rules"
        >
            <el-select v-model="model[item.prop]" clearable :disabled="item.disabled" :placeholder="item.placeholder">
                <el-option :key="option.value" :label="option.label" :value="option.value" v-for="option in selectOption[item.prop]"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-else
          :key="item.label"
          :label="item.label"
          :prop="item.prop"
          :rules="item.rules">
            <el-input v-model="model[item.prop]"
              :type="item.type"
              :disabled="item.disabled"
              :maxlength="item.maxlength"
              :placeholder="item.placeholder"
            ></el-input>
        </el-form-item>
    </template>
</el-form>
<div class="footer">
    <el-button @click="resetForm">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
</div>
</div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
.my-form {
    .el-input,
    .el-select {
        width: 100%;
    }
    .footer {
        text-align: right
    }
}
</style>