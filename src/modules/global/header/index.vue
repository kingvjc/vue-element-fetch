<script>
import {mapGetters} from 'vuex';
export default{
    computed: {
        ...mapGetters({
            userInfo: 'userInfo'
        }),
        menu() {
            return menu;
        }
    },
    watch: {
    },
    components: {
    }

}
</script>
<template>
<div id="header">
<header class="header">
    <div class="brand">
        <h2>KM平台</h2>
    </div>
    <!-- todo 使用头部菜单 -->
    <!-- <ul class="header">
        <router-link tag="li" :to="item.path" v-for="item in menu" :key="item.path">{{item.name}}</router-link>
    </ul> -->
    <div class="user">
        {{userInfo.userName}}&nbsp; | 
        <el-button type="text">退出</el-button>
    </div>
</header>
</div>
</template>
<style scoped lang="stylus">
#header
    background #1B1E85
.header
    color white
    height 50px
    display flex
    flex-direction row
    justify-content space-between
    align-items center
    h2
        padding-left 20px
        padding-right 100px
    .user
        margin-right 20px
ul
    padding 0
    margin 0
    list-style none
    li
        padding 13px 20px
        cursor pointer
        &:hover
           background #2C2A73
.active
    background #242260
</style>