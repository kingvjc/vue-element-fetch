
<script>
import plHeader from 'modules/global/header';
import navBar from 'modules/global/navbar';
import breadCrumb from 'modules/global/breadcrumb';
import errMessage from './common/errorMessage';
import loading from './components/loading';
export default {
  created() {
    errMessage.$on('requestError', (mes) => {
        let error = mes || '后台接口崩溃了';
        this.$alert(mes, '', {
            type: 'error',
            confirmButtonText: '确定',
            confirmButtonClass: 'el-button--danger'
        });
    });
  },
  data() {
    return {
      mainLeft: '',
    }
  },
  components: {
      plHeader,
      navBar,
      breadCrumb,
      loading
  }
}
</script>
<template>
<div id="app">
    <pl-header></pl-header>
    <nav-bar :mainLeft.sync="mainLeft"></nav-bar>
    <div class="main" :style="{ marginLeft: mainLeft }">
          <bread-crumb></bread-crumb>
          <router-view></router-view>
    </div>
    <loading></loading>
</div>
</template>

<style scoped lang="stylus">
@import './common/global.styl';
#app
    padding 0px
    margin 0px
    font-size 13px
    .main
        margin-left 200px
        transition: all .3s ease-out;

</style>
