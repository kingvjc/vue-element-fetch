<script>
export default {
    created() {
        this.init();
    },
    props: {
        mainLeft: {
            type: String,
            required: true
        }
    },
    computed: {
    },
    data() {
        return{
            isCollapse: false,
            routers: []
        };
    }, 
    methods: {
        init() {
            const router = this.$router.options.routes;
            this.routes = router.slice(2, router.length);
        },
        toggle() {
            this.isCollapse = !this.isCollapse;
            this.$emit('update:mainLeft', this.isCollapse ? '65px' : '200px');
        }
    }
}
</script>
<template>
<div class="nav-bar">
<aside>
    <el-menu
      mode="vertical"
      :unique-opened="true"
      default-active="/name-rules/center"
      class="el-menu-vertical-demo"
      :collapse="isCollapse">
        <template v-for="item in routes">
            <el-submenu :index="item.name" :key="item.name">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.meta.label}}</span>
                </template>
                <template v-for="child in item.children">
                    <router-link :key="child.name" :to="item.path + '/' + child.path">
                        <el-menu-item :index="item.path+'/'+child.path">
                            {{child.meta.label}}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </el-menu>
    <div class="toggle-bar" @click="toggle">
        <i class="el-icon-d-arrow-right" v-if="isCollapse"></i>
        <i class="el-icon-d-arrow-left" v-else></i>
    </div>
</aside>
</div>
</template>
<style scoped lang="stylus">
.nav-bar
    position absolute
    top 50px
    bottom 0
    color #fff
    aside
        height 100%
        text-direction none
        ul
            height 100%
            a
                text-decoration none
        .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 200px;
        }
    .toggle-bar
        position absolute
        bottom 10px
        right 10px
        z-index 99
        cursor pointer
        color red

</style>
