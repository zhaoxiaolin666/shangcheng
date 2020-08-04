<template>
  <div>
    <div class="autoplay" v-if="image111!==111">
      <div>
        <div class="play" @click="gotoclass">&lt;</div>
      </div>
      <div style="border-bottom:1px solid #eee" v-if="goods111.image">
        <van-swipe :autoplay="3000" indicator-color="orange">
          <van-swipe-item>
            <img :src="goods111.image" style="width:375px" @click="goodsimage" />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="goods111.image_path" style="width:375px" @click="goodsimage" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div style="margin:10px;border-bottom:1px solid #eee">
        <div>{{goods111.name}}</div>
        <div style="display:flex; margin:10px 0; align-items: flex-end;">
          <div style="margin-right:10px;color:red;font-weight:600">￥{{goods111.present_price}}</div>
          <div
            style="text-decoration: line-through; font-size:14px;margin-bottom:2px"
          >{{goods111.orl_price}}</div>
        </div>
      </div>
      <div
        style="display:flex;justify-content: space-around;border-bottom:1px solid #eee;magin:5px 0;color:#aaa"
      >
        <div style="margin-bottom:5px;width:125px;text-align:center">运费：{{goods111.__v}}</div>
        <div style="margin-bottom:5px;width:125px">剩余：{{goods111.amount}}</div>
        <div
          style="margin-bottom:5px;font-size:14px;text-align:center;width:125px"
          v-if="isCollection===1"
        >
          取消收藏：
          <van-icon name="like" color="red" @click="cancel" />
        </div>
        <div style="margin-bottom:5px;font-size:14px;text-align:center;width:125px" v-else>
          收藏：
          <van-icon name="like-o" @click="determine" />
        </div>
      </div>
      <div style="height:18px;border-bottom:1px solid #eee"></div>
      <div style="border-bottom:1px solid #eee">
        <van-cell value="进入店铺" is-link icon="shop-o">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">有赞的官方店</span>
            <van-tag type="danger">官方</van-tag>
          </template>
        </van-cell>
      </div>
      <div style="height:15px;border-bottom:1px solid #eee"></div>
      <div>
        <van-tabs v-model="active">
          <van-tab title="商品详情">
            <div v-html="goods111.detail" style="display:flex;flex-wrap:wrap"></div>
          </van-tab>
          <van-tab title="商品评论">
            <div
              v-for="(item,index) in comment"
              :key="index"
              style="padding:10px;border-bottom:1px solid #eee;"
            >
              <div style="display:flex;align-items:center;justify-content: space-around;">
                <div>
                  <img :src="item.comment_avatar" alt style="height:50px;" />
                </div>
                <div>
                  <div>{{item.comment_nickname}}</div>
                  <div>
                    <van-rate v-model="item.rate" />
                  </div>
                </div>
                <div>{{item.comment_time}}</div>
              </div>
              <div style="height:200px;padding:10px 70px;">{{item.content}}</div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon icon="cart-o" text="购物车"  @click="goCart" v-if="$store.state.badges===0"/>
          <van-goods-action-icon icon="cart-o" text="购物车"  @click="goCart" v-else :badge="$store.state.badges"/>
          <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
          <van-goods-action-button type="danger" text="立即购买" @click="immediately" />
        </van-goods-action>
      </div>
      <div>
        <div>
          <van-action-sheet v-model="show">
            <div class="content">
              <div style="width:375px;">
                <div style="display:flex;border-bottom:1px solid #ddd;">
                  <div>
                    <img :src="goods111.image" style="width:80px;border:1px solid #ddd;" />
                  </div>
                  <div style="margin:10px 0 0 0;">
                    <div>{{goods111.name}}</div>
                    <div style="color:red;margin-top:5px;">￥{{goods111.orl_price}}</div>
                  </div>
                </div>
              </div>
              <div
                style="display:flex; justify-content: space-around;font-size:14px;padding-top:10px; align-items: center;"
              >
                <div>
                  <div>购买数量:</div>
                  <div style="display:flex;padding-top:5px;">
                    <div style="color:#ccc;">剩余件数:{{goods111.amount}}</div>
                    <div style="color:red;">每人限购50件</div>
                  </div>
                </div>
                <div>
                  <van-stepper v-model="value" />
                </div>
              </div>
              <div class="danger">
                <van-button type="danger" size="large" @click="Buynow">立即购买</van-button>
              </div>
            </div>
          </van-action-sheet>
        </div>
      </div>
    </div>
    <div v-else>商品下架了</div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
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
      id: "", //单件商品id
      a: "",
      goods: [], //商品内容
      active: 0, //默认商品详情
      //   add: false,
      image111: 0,
      isCollection: 0,
      goods111: {},
      goods222: {},
      goods333: [],
      length: null,
      show: false,
      value: 1,
      comment: [],
      user: [],
      queryUser: "",
      length:0,
    };
  },
  //事件方法执行
  methods: {
    //购买
    immediately() {
      this.show = true;
    },
    //立即购买
    Buynow111() {
      this.$api
        .getgoodsData(this.id)
        .then((res) => {
          if (res.code === 200) {
            this.goods222 = this.goods.goodsOne;
            this.$set(this.goods222, "num", this.value);
            sessionStorage.setItem("list999", JSON.stringify(this.goods222));
            this.$router.push("/settlement");
          }
          //   console.log(this.goods222);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    Buynow() {
      this.$utils.checkLogin(this.Buynow111, () => {
        this.$router.push("/login");
      });
    },
    //单个商品请求
    goodsData(id) {
      this.$api
        .getgoodsData(id)
        .then((res) => {
          if (res.code === 200) {
            this.comment = res.goods.comment;
            this.goods = res.goods; //对应id的详情页数据
            this.goods111 = this.goods.goodsOne;
            if (JSON.parse(localStorage.getItem("user"))) {
              this.queryUser = JSON.parse(localStorage.getItem("username"));
              this.$utils.addCollction(
                this.queryUser,
                "colltion",
                this.goods.goodsOne
              );
            }
            // JSON.parse(localStorage.getItem("user"));
            // console.log(JSON.parse(localStorage.getItem(`${this.queryUser}colltion`)));
            // console.log(this.$utils)
            //   console.log(this.goods.goodsOne)
            // this.image111 = this.goods.image;
            // console.log( this.goods.length)
            // console.log(this.goods.image);
            // this.user.push(this.goods111);
            // localStorage.setItem("user", JSON.stringify(this.goods333));
            // console.log(this.user, 111);
          }
          //   console.log(res);
          if (typeof this.goods111 == "undefined") {
            this.image111 = 111;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //确认收藏
    determine111() {
      this.$api
        .getcollectionData(this.goods.goodsOne)
        .then((res) => {
          if (res.code === 200) {
            Toast.success(res.msg);
            this.isCollection = 1;
          }
          //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    determine() {
      this.$utils.checkLogin(this.determine111, () => {
        this.$router.push("/login");
      });
    },
    //取消收藏
    cancel111() {
      this.$api
        .getcancelCollectionData(this.id)
        .then((res) => {
          if (res.code === 200) {
            Toast.fail(res.msg);
            this.isCollection = 0;
          }
          //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    cancel() {
      this.$utils.checkLogin(this.cancel111, () => {
        this.$router.push("/login");
      });
    },
    //图片预览
    goodsimage() {
      ImagePreview({
        images: [this.goods111.image, this.goods111.image_path],
        closeable: true,
      });
    },
    //返回
    gotoclass() {
      this.$router.go(-1);
    },
    //去购物车
    goCart() {
      this.$router.push("/ShoppingCart");
    },
    //加入购物车
    addCart111() {
      this.$api
        .getaddShopData(this.id)
        .then((res) => {
          if (res.code === 200) {
              this.$store.commit("getgetCard");
            Toast.success(res.msg);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart() {
      this.$utils.checkLogin(this.addCart111(), () => {
        this.$router.push("/login");
      });
    },
  },
  //页面初始化方法
  mounted() {
    localStorage.removeItem("nullcolltion");
    this.id = this.$route.query.id; //接收id
    // console.log(this.id);
    this.goodsData(this.id); //挂载商品方法
    //单个商品是否已收藏(post)
    this.$api
      .getisCollectionData(this.id)
      .then((res) => {
        if (res.code === 200) {
          this.isCollection = res.isCollection;
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    //   console.log(this.$utils.addCollction)
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    // badges() {
    //   return this.$store.state.badges;
    // },
  },
};
</script>

<style scoped lang='scss'>
.color {
  color: red;
}
.autoplay {
  position: relative;
  overflow: auto;
  height: 600px;
}
.play {
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 5;
  background-color: #999;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  color: #eee;
  border-radius: 50%;
}
.content {
  padding: 16px 16px 100px;
}
.danger {
  position: absolute;
  bottom: 0;
  width: 375px;
  left: 0;
}
</style>