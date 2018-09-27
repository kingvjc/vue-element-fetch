<script>
/**
 * @file select组件---封装全选的功能
 * @author chuntyang
 * sep 8, 2018
 * data      数据
 * val       option绑定值的字段,支持数组和字符串
 * label     要显示的字段
 * collapse  数据是否合并
 */
export default {
    created() {
    },
    data() {
        return {
            checked: false,
            selectValue: []
        };
    },
    props: {
        value: {
        },
        data: {
            type: Array,
            required: false
        },
        collapse: {
            type: Boolean,
            default: () => true
        },
        filterable: {
            type: Boolean,
            default: () => false
        },
        val: {
            type: String,
            required: false
        },
        label: {
            required: true
        }
    },
    methods: {
        handleSelect(val) {
            this.$emit('input', val);
            const isAllSelect = val.length === this.data.length;
            this.checked = isAllSelect;
        },
        allCheckedChange(isChecked) {
            switch (isChecked) {
                case true:
                    const val = this.data.reduce((total, current) => {
                        total.push(current[this.val]);
                        return total;
                    }, []);
                    this.selectValue = val;
                    this.$emit('input', val);
                    break;
                default:
                    this.selectValue = [];
                    this.$emit('input', []);
            }
        }
    },
    mounted() {
    },
    watch: {
        value(val) {
            this.selectValue = val;
            this.handleSelect(val);
        }
    }
};
</script>

<template>
<div class="multiple-select">
<el-select multiple
  v-model="selectValue"
  :filterable="filterable"
  :collapse-tags="collapse"
  @change="handleSelect($event)">
    <span class="item-checked">&nbsp;&nbsp;&nbsp;&nbsp;
        <el-checkbox v-model="checked"
          @change="allCheckedChange($event)"
        >全选</el-checkbox>
    </span>
    <el-option v-for="(item, index) in data"
      :key="index"
      :label="typeof label !== 'string' ? item[label[0]] + item[label[1]] : item[label]"
      :value="item[val]"
    ></el-option>
</el-select>
</div>
</template>
<style rel="stylesheet/less" lang="less" scoped>
</style>