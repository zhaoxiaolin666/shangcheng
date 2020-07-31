<template>
  <div>
    <div>
      <div class="settlement">
        <div
          style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee;"
        >
          <div>评价中心</div>
        </div>
        <div class="setup">
          <van-icon name="arrow-left" color="skyblue" @click="$router.go(-1)" />
        </div>
      </div>
    </div>
    <div>
      <div style="display:flex;justify-content: flex-end;align-items:center;padding:20px;">
        <div style="margin-right:30px;">
          <van-rate v-model="value" :size="20" color="#ffd21e" void-icon="star" void-color="#eee" />
        </div>
        <div>{{this.seeevaluate.comment_time}}</div>
      </div>
      <div style="height:200px;">{{this.seeevaluate.content}}</div>
      <div v-for="(item,index) in goods666" :key="index" style="display:flex;align-items:center;">
        <div>
          <img :src="item.image_path" alt style="width:50px;" />
        </div>
        <div
          style="width:280px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
        >名称：{{item.name}}</div>
        <div>
          <van-icon name="shopping-cart-o" @click="addCart"/>
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content:center;margin-top:30px;">
        <div style="width:90%;">
            <van-button type="primary"  size="large" @click="$router.go(-1)">返回</van-button>
        </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      seeevaluate: {},
      value: 0,
      goods666: [],
    };
  },
  //事件方法执行
  methods: {
    //查询单条评论(post)
    getevaluateOne() {
      this.$api
        .getevaluateOneData({
          id: this.seeevaluate.cid,
          _id: this.seeevaluate._id,
        })
        .then((res) => {
        //   console.log(res, 111);
        })
        .catch((err) => {
          console.log(err);
        });
    },
     //加入购物车
    addCart() {
      this.$api
        .getaddShopData(this.seeevaluate.cid)
        .then((res) => {
          if (res.code === 200) {
            Toast.success(res.msg);
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
    this.seeevaluate = this.$route.query.seeevaluate;
    this.goods666 = this.seeevaluate.goods;
    this.value = this.seeevaluate.rate;
    this.getevaluateOne();
    // console.log(this.seeevaluate);
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