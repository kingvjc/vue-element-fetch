<script>
/**
 * @file table组件
 * @author chuntyang
 * July 15, 2018
 * columns           列
 * data              表格数据
 * isPage            是否分页 默认为true 分页
 * height            表格高度，只有当fullScreenHeight为false时才有效
 * selectEvent       多选事件
 * pageOptions       页码相关
 * searchEvent       表格搜索事件
 * fullScreenHeight  是否铺满整个屏幕
 */
import {fixTableHeight} from './dom';
export default {
    created() {
        this.windowResize();
    },
    data() {
        return {
            tableHeight: null
        };
    },
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        event: {
            type: Function
        },
        selectEvent: {
            type: Function
        },
        pageOptions: {
            type: Object,
            // 添加pagenation默认值
            default: () => {
                return {
                    total: 0,
                    pageSize: 20,
                    currentPage: 1,
                    pageSizeList: [20, 40, 60]
                };
            }
        },
        searchEvent: {
            type: Function
        },
        fullScreenHeight: {
            type: Boolean,
            default: () => true
        },
        height: {
            type: String
        },
        isPage: {
            type: Boolean,
            default: () => true
        }
    },
    methods: {
        handleCurrentChange(currentPage) {
            this.pageOptions.currentPage = currentPage;
            this.searchEvent();
        },
        pageSize(pageSize) {
            this.pageOptions.pageSize = pageSize;
            this.pageOptions.currentPage = 1;
            this.searchEvent();
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.tableRef.toggleRowSelection(row);
                });
            } else {
                this.$refs.tableRef.clearSelection();
            }
        },
        windowResize() {
            const self = this;
            window.onresize = function () {
                self.initTableHeight();
            };
        },
        initTableHeight() {
            if (this.fullScreenHeight) {
                const pageHeight = this.isPage ? 60 : 15;
                this.tableHeight = fixTableHeight(this.$refs.tableRef.$el, pageHeight);
            } else if (this.height) {
                this.tableHeight = this.height;
            }
        }
    },
    computed: {
        handleSelectEvent() {
            return this.selectEvent ? this.selectEvent : false;
        }
    },
    mounted() {
        this.initTableHeight();
    }
};
</script>

<template>
<div class="my-table">
<el-table :data="data" :height="tableHeight" border ref="tableRef" @selection-change="handleSelectEvent">
    <el-table-column fixed type="selection" width="55" align="center" solt="selectId" v-if="selectEvent"></el-table-column>
    <template v-for="column in columns">
        <slot v-if="column.slot" :name="column.slot"></slot>
        <el-table-column v-else-if="!column.hidden"
         :key="column.name"
         :type="column.type"
         :property="column.prop"
         :label="column.label"
         :width="column.width"
         :formatter="column.formatter"
         :show-overflow-tooltip="true"
         :sortable="column.sort"
         align="center">
        </el-table-column>
    </template>
</el-table>
<br>

<footer class="footer-pagination" v-if="pageOptions.total">
    <el-pagination
        @size-change="pageSize"
        @current-change="handleCurrentChange"
        :current-page="pageOptions.currentPage"
        :page-sizes="pageOptions.pageSizeList"
        :page-size="pageOptions.pageSize"
        layout="total, sizes, prev, pager, next"
        :total="pageOptions.total"
        style="text-align:right"
    ></el-pagination>
</footer>
</div>
</template>
<style scoped lang="stylus">
.my-table {
    margin-top: 20px;
    table th {
        padding: 6px 0;
    }
}
</style>
