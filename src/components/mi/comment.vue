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
      <div style="display:flex;">
        <div>
          <img :src="comment.image_path" alt style="width:100px;padding:10px;" />
        </div>
        <div style="padding-top:20px;">
          <div>商品评分</div>
          <div style="padding-top:20px;">
            <van-rate v-model="value" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <van-field v-model="message" rows="5" autosize placeholder="说说你的购买感受吧~~" type="textarea" style="background:#eee;"/>
      <van-uploader :after-read="afterRead" v-model="upload111"/>
    </div>
    <div style="padding:20px;">
      <van-checkbox v-model="checked">匿名评价</van-checkbox>
    </div>
    <div style="width:100%;display:flex;justify-content: center;">
      <div style="width:90%;">
        <van-button type="primary" size="large" @click="comments111">提交</van-button>
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
      comment: [],
      value: 1,
      message: "",
      checked: false,
      upload111:[],
      upload222:[],
    };
  },
  //事件方法执行
  methods: {
    //提交
    comments111() {
      this.$api
        .getgoodsOneData({
          id: this.comment.cid,
          rate:this.value,
          content:this.message,
          anonymous:this.checked,
          _id:this.comment._id,
          order_id:this.comment.order_id,
          image:this.upload222,
        })
        .then((res) => {
            if(res.code===200){
                Toast(res.msg);
                this.$router.go(-1)
            }
        //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  },
  //页面初始化方法
  mounted() {
    this.comment = this.$route.query.comment;
    // console.log(this.comment);
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