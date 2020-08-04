<template>
  <div>
    <div class="home">
      <div class="hometop">
        <!-- 定位  -->
        <div v-if="city===''&&cityflag===false" style="width:80px;" @click="location">获取中...</div>
        <div v-else-if="cityflag===true" style="width:80px;" @click="location">
          {{citys}}
          <van-icon name="arrow-down" />
        </div>
        <div v-else style="width:80px;" @click="location">
          {{city}}
          <van-icon name="arrow-down" />
        </div>
        <!-- 搜索框  -->
        <div>
          <van-search
            v-model="searchtop"
            show-action
            placeholder="请输入搜索关键词"
            @input="onSearch"
            ref="searchtop"
          >
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </div>
      </div>
      <div v-show="flag===true">
        <!-- <div v-for="(item,index) in history" :key="index" style="display:flex;">
          <div>{{item}}</div>
        </div>-->
        <div style="width:100%;height:100%;">
          <div v-for="(item,index) in Search" :key="index">
            <div
              style="padding:10px;border:1px solid #f9f9f9;background:#fff;"
              @click="$Todetails(item.id)"
              v-html="item.name"
            ></div>
          </div>
        </div>
      </div>
      <!-- 轮播图  -->
      <div v-show="flag===false">
        <div class="photo">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img
                v-lazy="image.image"
                class="Rotation"
                style="width:100%"
                @click="$Todetails(image.goodsId)"
              />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 分类  -->
        <div class="classification">
          <van-grid :border="false" :column-num="5">
            <van-grid-item
              v-for="(item,index) in category"
              :key="index"
              @click="gotocategory(item,index)"
            >
              <van-image :src="item.image" class="ification" />
              <div class="face">{{item.mallCategoryName}}</div>
            </van-grid-item>
          </van-grid>
        </div>
        <div class="adver">
          <img :src="advertisement.PICTURE_ADDRESS" style="width:100%" />
        </div>
        <div class="shop">商品推荐</div>
        <div class="recommend" ref="container">
          <div class="cont">
            <div v-for="(item,index) in recommend" :key="index">
              <img :src="item.image" class="image111" @click="$Todetails(item.goodsId)" />
              <div class="goodsname">{{item.goodsName}}</div>
              <div class="price">
                <div class="mallPrice">￥{{item.mallPrice}}</div>
                <div class="price111">{{item.price}}</div>
              </div>
              <div class="looks">
                <div class="looks1">
                  <van-icon name="shopping-cart-o" @click="addCart(item)" />
                </div>
                <div class="looks2" @click="$Todetails(item.goodsId)">查看详情</div>
              </div>
            </div>
          </div>
        </div>
        <floor :floor="floor1" :floorName="floorName.floor1"></floor>
        <floor :floor="floor2" :floorName="floorName.floor2"></floor>
        <floor :floor="floor3" :floorName="floorName.floor3"></floor>
        <div class="Hotsale">热销商品</div>
        <div>
          <van-grid :column-num="2" :border="true">
            <van-grid-item v-for="(item,index) in hotGoods" :key="index">
              <van-image :src="item.image" @click="$Todetails(item.goodsId)" />
              <div class="good">{{item.name}}</div>
              <div class="price">
                <div class="mallPrice">￥{{item.mallPrice}}</div>
                <div class="price111" style="color:red">{{item.price}}</div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import floor from "../components/floor/floor1.vue";
import { Toast } from "vant";
import city from "../http/js/city";
export default {
  name: "",
  props: {},
  components: {
    floor,
  },
  data() {
    return {
      city: "",
      citys: "",
      images: [],
      category: [],
      consolesearchtop: "",
      searchtop: "",
      advertisement: "",
      recommend: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: [],
      flag: false,
      Search: [],
      history: [],
      queryUser: "",
      cityflag: false,
      queryUser: "",
      length: 0,
      // msg: "改变之后"
    };
  },
  methods: {
    //   主页数据请求
    getrecommend() {
      this.$api
        .getHomeData()
        .then((res) => {
          if (res.code === 200) {
            this.images = res.data.slides; //头部轮播图
            this.category = res.data.category; // 分类
            this.advertisement = res.data.advertesPicture; //广告
            this.recommend = res.data.recommend; //平滑商品
            this.floor1 = res.data.floor1; //休闲商品楼
            this.floor2 = res.data.floor2; //鲜鲜水果楼
            this.floor3 = res.data.floor3; //热销商品楼
            this.floorName = res.data.floorName; //商品名
            this.hotGoods = res.data.hotGoods; //热销商品
            // console.log(this.recommend)
            // console.log(this.category);
            // console.log(this.images);
          }
          //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //定位
    location() {
      if (JSON.parse(sessionStorage.getItem("city"))) {
        this.citys = JSON.parse(sessionStorage.getItem("city"));
        this.$router.push({ path: "/location", query: { city: this.citys } });
      } else {
        this.$router.push({ path: "/location", query: { city: this.city } });
      }
      // console.log(this.city)
    },
    //搜索
    onSearch() {
      this.$api
        .getsearchData({ value: this.searchtop })
        .then((res) => {
          if (res.code === 200) {
            this.Search = res.data.list;
            this.Search.map((item) => {
              item.name = item.name.replace(
                this.searchtop,
                `<span style="color:red">${this.searchtop}</span>`
              );
            });
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // if (this.history.length === 10) {
      //     this.history.pop(this.searchtop)
      //   this.history = this.history.filter((item) => {
      //     return item !== "";
      //   });
      //   this.queryUser = JSON.parse(localStorage.getItem("username"));
      //   this.$utils.addCollction(this.queryUser, "search", this.searchtop);
      //   this.history = JSON.parse(
      //     localStorage.getItem(`${this.queryUser}search`)
      //   );
      // }
      // console.log(this.history);
    },
    //跳转分类
    gotocategory(item, index) {
      this.$router.push({
        name: "classification",
        query: { activeKey: index },
      });
    },
    //加入购物车
    addCart111(item) {
      // this.$store.commit("setbadges", (this.$store.state.badges)++);
      this.$api
        .getaddShopData(item.goodsId)
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
    addCart(item) {
      this.$utils.checkLogin(this.addCart111(item), () => {
        this.$router.push("/login");
      });
    },
    // change() {
    //   this.$store.commit("setName", this.msg);
    // }
    //获取用户信息(post)
    getqueryUser() {
      this.$api
        .getqueryUserData()
        .then((res) => {
          if (res.code === 200) {
            this.queryUser = res.userInfo.username;
            localStorage.setItem("username", JSON.stringify(this.queryUser));
          }
          // console.log(this.queryUser);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    let _this = this;
    AMap.plugin("AMap.Geolocation",  ()=> {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: "RB",
      });

      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", onComplete);
      AMap.event.addListener(geolocation, "error", onError);

      function onComplete(data) {
        // data是具体的定位信息

        _this.city = data.addressComponent.city;
        // console.log(_this.city)
        // console.log(data.addressComponent.city)
      }

      function onError(data) {
        // 定位出错
      }
    });
    this.getqueryUser();
    this.getrecommend();
    new BScroll(this.$refs.container, {
      scrollX: true,
      click: true,
    });
    if (JSON.parse(sessionStorage.getItem("city"))) {
      this.citys = JSON.parse(sessionStorage.getItem("city"));
      this.cityflag = true;
    }
  },
  watch: {
    searchtop() {
      if (this.searchtop !== "") {
        this.flag = true;
      } else {
        this.flag = false;
        // this.$router.go(0);`
        this.Search = [];
      }
    },
  },
  computed: {
    // name() {
    //   return this.$store.state.name;
    // },
    // badges() {
    //   return this.$store.state.badges;
    // },
  },
};
</script>

<style scoped lang='scss'>
.home {
  background-color: #f3f3f3;
}
.hometop {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.photo {
  margin: 0 0 5px 0;
}
.Rotation {
  height: 180px;
  background-position: center;
}
.classification {
  display: flex;
  justify-content: center;
  margin: 0 10px 0 10px;
}
.face {
  font-size: 10px;
  color: #333;
  margin-top: 5px;
}
.adver {
  padding: 10px 0 15px 0;
}
.shop {
  background-color: #fff;
  padding: 10px;
}
.recommend {
  display: flex;
  overflow: hidden;
  background-color: #fff;
}
.cont {
  display: flex;
  flex: 1;
  border-top: 1px solid #eee;
}
.image111 {
  width: 125px;
}
.goodsname {
  width: 125px;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}
.price {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  .mallPrice {
    font-size: 14px;
  }
  .price111 {
    font-size: 12px;
    text-decoration: line-through;
    color: #999;
    margin-left: 10px;
  }
}
.looks {
  display: flex;
  color: #eee;
}
.looks1 {
  background-color: #b36e00;
  padding: 5px;
  margin-left: 5px;
  border-radius: 10px 0 0 10px;
}
.looks2 {
  background-color: #ff1600;
  font-size: 14px;
  font-weight: 400;
  padding: 5px 15px 5px 15px;
  border-radius: 0 10px 10px 0;
}
.Hotsale {
  clear: both;
  display: flex;
  justify-content: center;
  padding: 10px 0 10px 0;
  color: #ff1600;
}
.good {
  width: 169px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
}
</style>