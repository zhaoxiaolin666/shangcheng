<template>
  <div>
    <div class="home">
      <div class="hometop">
        <!-- 定位  -->
        <div>成都市</div>
        <!-- 搜索框  -->
        <div>
          <van-search v-model="searchtop" show-action placeholder="请输入搜索关键词" @search="onSearch">
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </div>
      </div>
      <!-- 轮播图  -->
      <div class="photo">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image.image" class="Rotation" style="width:100%" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 分类  -->
      <div class="classification">
        <van-grid :border="false" :column-num="5">
          <van-grid-item v-for="(item,index) in category" :key="index">
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
            <img :src="item.image" class="image111" />
            <div class="goodsname">{{item.goodsName}}</div>
            <div class="price">
              <div>￥{{item.mallPrice}}</div>
              <div class="price111">{{item.price}}</div>
            </div>
            <div class="looks">
              <div class="looks1">
                <van-icon name="shopping-cart-o" />
              </div>
              <div class="looks2">查看详情</div>
            </div>
          </div>
        </div>
      </div>
      <div class="leisure">
        <div class="leisure1">1F</div>
        <div class="leisure2">休闲食品</div>
      </div>
      <van-grid :column-num="2">
        <!-- <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" /> -->
      </van-grid>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      images: [],
      category: [],
      consolesearchtop: "",
      searchtop: "",
      advertisement: "",
      recommend: []
      //   msg: "改变之后"
    };
  },
  methods: {
    //   主页数据请求
    getrecommend() {
      this.$api
        .getHomeData()
        .then(res => {
          if (res.code === 200) {
            this.images = res.data.slides;
            this.category = res.data.category;
            this.advertisement = res.data.advertesPicture;
            this.recommend = res.data.recommend;
            // console.log(this.recommend)
            // console.log(this.category);
            // console.log(this.images);
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSearch() {}

    // change() {
    //   this.$store.commit("setName", this.msg);
    // }
  },
  mounted() {
    this.getrecommend();
    new BScroll(this.$refs.container, {
      scrollX: true,
      click: true
    });
  },
  watch: {},
  computed: {
    // name() {
    //   return this.$store.state.name;
    // }
  }
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
  align-items: center;
  .price111 {
    font-size: 14px;
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
.leisure {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0 10px 0;
}
.leisure1 {
  background-color: #ff1600;
  color: #fff;
  border-radius: 50%;
  padding: 3px;
}
.leisure2 {
  color: #ff1600;
}
</style>