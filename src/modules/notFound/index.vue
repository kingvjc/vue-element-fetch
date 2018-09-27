<script>
export default {
    created() {
        // console.debug('router object', this.$router);
        // 一期先不做根据权限来跳转
        // this.$router.replace({path: 'name-rules'});
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
<div class="page-404">
	<h1>404. Not Found</h1>
	<p>没有找到你要的页面</p>
	<pre class="page-404">
          .----.
       _.'__    `.
   .--($)($$)---/#\
 .' @          /###\
 :         ,   #####
  `-..__.-' _.-\###/
        `;_:    `"'
      .'"""""`.
     /,  ya ,\\
    //  404!  \\
    `-._______.-'
    ___`. | .'___
   (______|______)
    </pre>
</div>
</template>
<style scoped lang="stylus">
.page-404
    margin-top 50px
    display flex
    flex-direction column
    text-align center
    h1
        font-size 45px
    p
        font-size 18px
</style>