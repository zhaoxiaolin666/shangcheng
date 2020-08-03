<template>
  <div>
    <div class="mine">
      <div class="setup" v-if="this.flag===true">
        <van-icon name="setting" color="#eee" @click="setup111" />
      </div>
      <div
        style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee;font-weight:500"
      >
        <div>会员中心</div>
      </div>
      <div style="background:#E30C7B">
        <div>
          <div style="display:flex;justify-content: center;padding:20px 0">
            <img
              src="../assets/timg.png"
              style="width:100px;height:100px;border-radius: 50%;"
              v-if="this.flag===false"
            />
            <img
              src="../assets/timg1.png"
              style="width:100px;height:100px;border-radius: 50%;"
              v-if="this.flag===true"
            />
          </div>
          <div
            style="display:flex;justify-content: center;padding:0 0 50px 0;font-size:20px;color:#eee"
            @click="gologin"
            v-if="this.flag===false"
          >登录/注册</div>
          <div
            style="display:flex;justify-content: center;font-size:20px;color:#eee"
            v-if="this.flag===true"
          >欢迎您：{{this.user.nickname}}</div>
          <div
            style="display:flex;justify-content: center;padding:0 0 50px 0;font-size:14px;color:#eee"
            v-if="this.flag===true"
            @click="gologin111"
          >退出登录</div>
        </div>
      </div>
      <div>
        <van-grid :column-num="5">
          <van-grid-item icon="after-sale" text="带付款" @click="Allorders" />
          <van-grid-item icon="underway-o" text="待发货" @click="Allorders" />
          <van-grid-item icon="logistics" text="待发货" @click="Allorders" />
          <van-grid-item icon="orders-o" text="评价" @click="evaluate"/>
          <van-grid-item icon="points" text="已完成" @click="Allorders" />
        </van-grid>
      </div>
      <div>
        <div>
          <van-cell is-link icon="cart-circle-o">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span class="custom-title"  @click="Allorders">全部订单</span>
            </template>
          </van-cell>
        </div>
        <div>
          <van-cell is-link icon="points">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span class="custom-title"  @click="Collection">收藏商品</span>
            </template>
          </van-cell>
        </div>
        <div>
          <van-cell is-link icon="aim" >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span class="custom-title" @click="goaddress">地址管理</span>
            </template>
          </van-cell>
        </div>
        <div>
          <van-cell is-link icon="credit-pay">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span class="custom-title"  @click="browsing">最近浏览</span>
            </template>
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { config } from 'vue/types/umd';
// import { Toast } from "vant";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      flag: false,
      user: {},
    };
  },
  //事件方法执行
  methods: {
    Allorders111() {
      this.$router.push("/Allorders");
    },
    Allorders() {
      this.$utils.checkLogin(this.Allorders111(), () => {
        this.$router.push("/login");
      });
    },
    evaluate111() {
      this.$router.push("/evaluate");
    },
    evaluate() {
      this.$utils.checkLogin(this.evaluate111(), () => {
        this.$router.push("/login");
      });
    },
    gologin() {
      this.$router.push("/login");
    },
    gologin111() {
      this.$api
        .getloginOutData()
        .then((res) => {
          if (res.code === 0) {
            localStorage.clear();
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      //   this.$router.go(0);
      this.flag = false;
    },
    setup111() {
      this.$router.push("/setup");
    },
    Collection111() {
      this.$router.push("/Collection");
    },
    Collection() {
      this.$utils.checkLogin(this.Collection111(), () => {
        this.$router.push("/login");
      });
    },
    goaddress111() {
      this.$router.push("/goaddress");
    },
    goaddress() {
      this.$utils.checkLogin(this.goaddress111(), () => {
        this.$router.push("/login");
      });
    },
    browsing111() {
      this.$router.push("/browsing");
    },
    browsing() {
      this.$utils.checkLogin(this.browsing111(), () => {
        this.$router.push("/login");
      });
    },
  },
  //页面初始化方法
  mounted() {
    if (JSON.parse(localStorage.getItem("user"))) {
      this.user = JSON.parse(localStorage.getItem("user"));
      //   console.log(this.user.nickname);
      this.flag = true;
    }
    // console.log(id)
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.mine {
  position: relative;
}
.setup {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 60px;
}
</style>