<script>
export default {
    created() {
        this.breadList = this.$route.matched;
    },
    computed: {
    },
    data() {
        return {
            breadList: []
        };
    },
    watch: {
        ['$route.matched']: function (val) {
            this.breadList = val;
        }
    }

};
</script> 
<template>
<div class="bread">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item v-for="bread in breadList"
          :key="bread.name"
          :to="{path: bread.path}"
        >{{bread.meta.label}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>
    
<style lang="stylus" scoped>
.bread {
    padding: 15px 10px;
}
</style>
