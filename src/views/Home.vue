<template>
  <div>
    <div>
      <router-view></router-view>
    </div>
    <div>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="wap-home-o" to="/homepage">商城</van-tabbar-item>
        <van-tabbar-item icon="orders-o" to="/classification">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" badge="0" to="/ShoppingCart">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
        active:0,
    };
  },
  //事件方法执行
  methods: {
  },
  //页面初始化方法
  mounted() {
    //   this.$store.commit("getgetCard");
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    //    badges() {
    //   return this.$store.state.badges;
    // }
  }
};
</script>

<style scoped lang='scss'>
</style>