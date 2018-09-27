<script>
/**
 * @file 首页,该页主要是根据权限做路由跳转
 *
 * @author chuntyang
 * June 26, 2018
 */

export default {
    created() {
        // console.debug('router object', this.$router);
        // 一期先不做根据权限来跳转
        this.$router.replace({path: 'name-rules'});
    },
    computed: {
    },
    watch: {
    },
    components: {
    }
};
</script>

<template>
<div class="home">
</div>
</template>