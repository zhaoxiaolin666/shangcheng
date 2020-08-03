<template>
  <div style="overflow: auto;height:600px">
    <div style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee">
      <div>购物车</div>
    </div>
    <div v-if="flag===false">
      <div>
        <div>
          <img src="../assets/order.gif" style="width:375px;" />
        </div>
      </div>
      <div style="display:flex;justify-content: center;padding:10px 0;font-size:24px;color:#666">
        <div>登录后才能查看订单</div>
      </div>
      <div>
        <div style="display:flex;justify-content: center;">
          <van-button round type="default" @click="Gologin">请先登录</van-button>
        </div>
      </div>
    </div>
    <div v-if="flag===true&&shopList.length===0">
      <div style="display:flex;justify-content: center;margin:30px">
        <div style="background-color: #ddd; padding:20px;border-radius: 50%;">
          <van-icon name="shopping-cart-o" size="100px" color="#E0322B" />
        </div>
      </div>
      <div style="display:flex;justify-content: center;padding:10px 0;font-size:24px;color:#666">
        <div>您的购物车还是空的</div>
      </div>
      <div>
        <div style="display:flex;justify-content: center;">
          <van-button round type="default" @click="Goshopping">去购物</van-button>
        </div>
      </div>
    </div>
    <div v-if="shopList.length">
      <div
        style="display:flex; justify-content: space-between;align-items: center;padding:10px 0 50px 0;border-bottom:5px solid #eee;height:100px; position: relative;"
      >
        <div style="padding:0 10px">
          <van-checkbox v-model="checked" @click="all" >
              <div v-if="checked===false">全选</div>
              <div v-if="checked===true">取消全选</div>
          </van-checkbox>
          <!-- <van-checkbox v-model="checked" @click="all" ></van-checkbox> -->
        </div>
        <div style="padding:0 50px;">
          <div style="display:flex;">
            <div>合计:</div>
            <div style="color:red;">￥</div>
            <div style="color:red;margin-top:3px">{{snum | toFixed}}</div>
          </div>
          <div>请确认订单</div>
        </div>
        <div style="display:flex;position:absolute;right:20px;bottom:20px;" v-if="flag111===true">
            <div style="margin-right:10px;">
              <van-button type="warning" @click="del()">删除</van-button>
            </div>
            <div>
              <van-button type="danger" @click="Submit">提交订单</van-button>
            </div>
          </div>
      </div>
      <div
        v-for="(item,index) in shopList"
        :key="index"
        style="display:flex;align-items: center;border-bottom:1px solid #eee"
      >
        <div style="padding:0 10px">
          <van-checkbox v-model="item.check" @change="choice"></van-checkbox>
        </div>
        <div style="padding:10px 0">
          <img
            :src="item.image_path"
            :alt="item.name"
            style="width:80px;height:80px;border:1px solid #ddd"
          />
        </div>
        <div style="color:#D37525">
          <div>{{item.name}}</div>
          <div style="display:flex;justify-content: space-between;margin-top:20px;width:240px;">
            <div>￥{{item.mallPrice}}</div>
            <div>
              <van-stepper
                v-model="item.count"
                min="0"
                max="50"
                @plus="plus111(item)"
                @minus="minus111(item)"
              />
            </div>
          </div>
        </div>
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
      flag: false,
      flag111: false,
      user: {},
      shopList: [],
      checked: false,
      delList: [],
      cid: [],
      length: null,
    };
  },
  //事件方法执行
  methods: {
    //全选
    all() {
    //   if (this.checked) {
    //     this.shopList.map((item) => {
    //       item.check = true;
    //     });
    //   } else {
    //     this.shopList.map((item) => {
    //       item.check = false;
    //     });
    //   }
    this.shopList.map((item) => {
          item.check=this.checked
        });
    //   localStorage.setItem("shopList", JSON.stringify(this.shopList));
    },
    //单选
    choice() {
      this.flag111 = this.shopList.some((item) => {
        return item.check === true;
      });
      this.checked = this.shopList.every((item) => {
        return item.check === true;
      });
      // console.log(this.checked)
    //   localStorage.setItem("shopList", JSON.stringify(this.shopList));
    },
    Gologin() {
      this.$router.push("/login");
    },
    Goshopping() {
      this.$router.push("/homepage");
    },
    //购物车减商品
    minus111(item) {
        item.count--;
      this.$api
        .geteditCartData({count:item.count, id:item.cid, mallPrice:item.mallPrice})
        .then((res) => {
          if (res.code === 200) {
            Toast.success(res.msg);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      //购物车商品删除(post)cid
      if (item.count === 0) {
        this.delList = this.shopList.filter((item) => {
          return item.count === 0;
        });
        this.shopList = this.shopList.filter((item) => {
          return item.count > 0;
        });
        this.delList.map((item) => {
          this.cid.push(item.cid);
        });
        //   console.log(this.cid)
        this.$api
          .getdeleteShopData(this.cid)
          .then((res) => {
            if (res.code === 200) {
              Toast.success(res.msg);
            }
            //   console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //购物车加商品
    plus111(item) {
        item.count++;
    //    console.log(item.count);
    //    console.log(item.cid);
    //    console.log(item.mallPrice);
      this.$api
        .geteditCartData({count:item.count, id:item.cid, mallPrice:item.mallPrice})
        .then((res) => {
          if (res.code === 200) {
            Toast.success(res.msg);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //购物车商品删除(post)cid
    del() {
      this.delList = this.shopList.filter((item) => {
        return item.check === true;
      });
      this.shopList = this.shopList.filter((item) => {
        return item.check === false;
      });
      this.delList.map((item) => {
        this.cid.push(item.cid);
      });
      //   console.log(this.cid)
      this.$api
        .getdeleteShopData(this.cid)
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
    //提交订单
    Submit() {
         this.delList = this.shopList.filter((item) => {
        return item.check === true;
      });
      //提交订单内容
      let delList111=this.delList
    //   console.log(delList111)
    localStorage.setItem("delList111", JSON.stringify(delList111));
    console.log(delList111)
      this.$router.push("/settlement");
    },
    //查询获取购物车数据(get)
    getgetCard() {
      this.$api
        .getgetCardData()
        .then((res) => {
          if (res.code === 200) {
            this.shopList = res.shopList;
            // this.length = this.shopList.length;
            // if(this.length!==0){
            //     this.$store.commit("setbadges", this.length);
            // }
            this.checked = this.shopList.every((item) => {
              return item.check === true;
            });
            this.flag111 = this.shopList.some((item) => {
              return item.check === true;
            });
            //   console.log(this.checked)
          }
          // console.log(res);
        //   console.log(this.shopList);
        })
        .catch((err) => {
          console.log(err);
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
    this.getgetCard();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    snum() {
      let Price = 0;
      this.shopList.map((item) => {
        if (item.check === true) {
          Price += item.mallPrice * item.count;
        }
      });
      return Price;
    },
    // badges() {
    //   return this.$store.state.badges;
    // },
  },
  //过滤器
  filters: {
    toFixed(val) {
      return Number(val).toFixed(2);
    },
  },
};
</script>

<style scoped lang='scss'>
</style>