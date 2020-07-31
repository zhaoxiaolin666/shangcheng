<template>
  <div>
    <div class="settlement">
      <div style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee">
        <div>全部订单</div>
      </div>
      <div class="setup">
        <van-icon name="arrow-left" color="skyblue" @click="$router.go(-1)" />
      </div>
    </div>
    <div>
      <van-tabs v-model="active" swipe-threshold="5">
        <van-tab title="全部"></van-tab>
        <van-tab title="待支付"></van-tab>
        <van-tab title="待发货"></van-tab>
        <van-tab title="待收货"></van-tab>
        <van-tab title="已完成"></van-tab>
      </van-tabs>
    </div>
    <div
      style="display:flex;justify-content:center;background:#F2F2F2;width:100%;"
      v-for="(item,index) in list"
      :key="index"
    >
      <div style="width:95%;background:#fff;margin:10px 0;border-radius:10px;">
        <div style="display:flex;align-items:center;">
          <div style="margin:5px;">订单编号：{{item.order_id}}</div>
          <div style="color:#DE9C00;margin:10px;">交易完成</div>
        </div>
        <div v-for="(item,index) in item.order_list" :key="index" style="display:flex;">
          <div>
            <img
              :src="item.image_path"
              :alt="item.name"
              style="width:80px;height:80px;border:1px solid #eee;border-radius:10px;margin-left:5px;"
            />
          </div>
          <div style="width:200px;">{{item.name}}</div>
          <div style="text-align:right;width:50px;">
              <div>￥{{item.present_price}}</div>
              <div style="color:#ccc;">x{{item.count}}</div>
          </div>
        </div>
        <div style="text-align:right;padding:0 5px 10px 0;">
          <div>创建时间:{{item.add_time}}</div>
          <div>收货地址:{{item.address}}</div>
          <div>共{{item.order_list.length}}件商品 合计:{{item.mallPrice}}</div>
        </div>
      </div>
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
      active: 1,
      list: [],
    };
  },
  //事件方法执行
  methods: {
    getmyOrder() {
      this.$api
        .getmyOrderData()
        .then((res) => {
          if (res.code === 200) {
            this.list = res.list;
          }
        //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //页面初始化方法
  mounted() {
    this.getmyOrder();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.settlement {
  position: relative;
}
.setup {
  position: absolute;
  top: 15px;
  left: 10px;
}
</style>