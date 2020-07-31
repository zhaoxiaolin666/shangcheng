<template>
  <div>
    <div class="settlement">
      <div style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee">
        <div>订单结算</div>
      </div>
      <div class="setup">
        <van-icon name="arrow-left" color="skyblue" @click="gocarts" />
      </div>
      <div style="height:120px;">
        <div
          style="height:100px;line-height:100px;text-align:center;"
          @click="goaddress"
          v-if="flag333===true"
        >点击添加收货地址</div>
        <div v-if="flag333===false" style="padding:10px;">
          <div style="display:flex;justify-content: space-around;">
            <div>收货人：{{default222.name}}</div>
            <div>{{default222.tel}}</div>
          </div>
          <div style="display:flex;justify-content: space-around;align-items: center;">
            <div>
              <van-icon name="location-o" size="30px" />
            </div>
            <div style="font-size:14px;">收货地址：{{default222.address}}{{default222.addressDetail}}</div>
            <div>
              <van-icon name="arrow" size="30px" @click="goaddress" />
            </div>
          </div>
          <div style="color:#DE9C00;font-size:14px;padding-left:30px;">(收货不便时，可选择免费待收货服务)</div>
        </div>
        <div style="margin-bottom:10px">
          <img src="../assets/caitiao.jpg" alt style="width:100%;" />
        </div>
      </div>

      <div v-if="flag999===false">
        <div>
          <div
            v-for="(item,index) in delList222"
            :key="index"
            style="display:flex;align-items: center;border-bottom:1px solid #eee"
          >
            <div style="padding:10px 0 10px 20px">
              <img
                :src="item.image_path"
                :alt="item.name"
                style="width:80px;height:80px;border:1px solid #ddd"
              />
            </div>
            <div style="width:250px;margin-left:10px">
              <div style="color:red;">{{item.name}}</div>
              <div style="color:red;font-weight:600">￥{{item.mallPrice}}</div>
              <div style=" text-align:right;font-size:12px">x{{item.count}}</div>
            </div>
          </div>
        </div>
        <div>
          <van-submit-bar :price="snum*100" button-text="提交订单" @submit="onSubmit" />
        </div>
      </div>
      <div v-else>
        <div style="display:flex;align-items: center;border-bottom:1px solid #eee">
          <div style="padding:10px 0 10px 20px">
            <img
              :src="delList333.image_path"
              :alt="delList333.name"
              style="width:80px;height:80px;border:1px solid #ddd"
            />
          </div>
          <div style="width:250px;margin-left:10px">
            <div style="color:red;">{{delList333.name}}</div>
            <div style="color:red;font-weight:600">￥{{delList333.present_price}}</div>
            <div style=" text-align:right;font-size:12px">x{{delList333.num}}</div>
          </div>
        </div>
        <div>
          <van-submit-bar :price="snum111*100" button-text="提交订单" @submit="onSubmit" />
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
      delList222: [],
      default222: [],
      flag333: false,
      orderId: [],
      Price111: 0,
      delList333: {},
      flag999: false,
    };
  },
  //事件方法执行
  methods: {
    //返回购物车
    gocarts() {
      localStorage.removeItem("delList111");
      sessionStorage.removeItem("list999");
      this.$router.push("/ShoppingCart");
    },
    //前往地址修改
    goaddress() {
      this.$router.push("/goaddress");
    },
    //提交
    onSubmit() {
      if (this.flag333 === true) {
        Toast("请添加地址");
      }
      if (this.flag999 === false) {
        this.$api
          .getorderData({
            address: this.default222.address,
            tel: this.default222.tel,
            orderId: this.orderId,
            totalPrice: this.Price111,
            idDirect: false,
            count: this.delList222[0].count,
          })
          .then((res) => {
            if (res.code === 200) {
              this.orderId = [];
              Toast(res.msg);
              localStorage.removeItem("delList111");
              this.$router.push("/homepage");
            }
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$api
          .getorderData({
            address: this.default222.address,
            tel: this.default222.tel,
            orderId: this.orderId,
            totalPrice: this.Price111,
            idDirect: true,
            count: this.delList333.num,
          })
          .then((res) => {
            if (res.code === 200) {
              this.orderId = [];
              Toast(res.msg);
              sessionStorage.removeItem("list999");
              this.$router.push("/homepage");
            }
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //查询默认收货地址
    getDefaultAddress() {
      this.$api
        .getDefaultAddressData()
        .then((res) => {
          if (res.code === 200) {
            this.default222 = res.defaultAdd;
          }
          if (res.defaultAdd === null) {
            this.flag333 = true;
            // console.log(this.flag333);
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //页面初始化方法
  mounted() {
    this.getDefaultAddress();
    if (JSON.parse(localStorage.getItem("delList111"))) {
      this.flag999 = false;
      this.delList222 = JSON.parse(localStorage.getItem("delList111"));
      console.log(this.delList222);
      this.delList222.map((item) => {
        if (item.check === true) {
          this.Price111 += item.mallPrice * item.count;
          this.orderId.push(item.cid);
        }
      });
    } else {
      this.flag999 = true;
      this.delList333 = JSON.parse(sessionStorage.getItem("list999"));
      this.orderId.push(this.delList333.id);
      this.Price111 = this.delList333.num * this.delList333.present_price;
      console.log(this.delList333.id);
    }
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    snum() {
      let Price = 0;
      this.delList222.map((item) => {
        if (item.check === true) {
          Price += item.mallPrice * item.count;
        }
      });
      return Price;
    },
    snum111() {
      let Price = 0;
      Price += this.delList333.present_price * this.delList333.num;
      return Price;
    },
    badges() {
      return this.$store.state.badges;
    },
  },
  //过滤器
  filters: {
    // toFixed(val) {
    //   return Number(val).toFixed(2);
    // },
  },
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