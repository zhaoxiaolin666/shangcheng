<template>
  <div>
    <div>
      <div class="settlement">
        <div
          style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee"
        >
          <div>城市列表</div>
        </div>
        <div class="setup">
          <van-icon name="arrow-left" color="skyblue" @click="$router.go(-1)" />
        </div>
      </div>
      <div style="background:#f2f2f2;">
        <div>
          <van-search v-model="values" placeholder="请输入城市关键词" @search="Searchcity" />
        </div>
        <div v-show="flag" v-for="(item,index) in Searchcity111" :key="index">
          <div
            style="padding:10px;border-bottom:1px solid #eee;background:#fff;"
            @click="hot(item)"
          >{{item.name}}</div>
        </div>
        <div v-show="!flag">
          <div style="padding:10px 20px 10px 15px;">当前城市</div>
          <div style="background:#fff;">
            <div style="padding:10px 20px 10px 15px;" @click="city111">{{city}}</div>
          </div>
          <div style="padding:10px 20px 10px 15px;">热门城市</div>
          <div style="background:#fff;display:flex;flex-wrap:wrap;justify-content: center;">
            <div
              v-for="(item,index) in hotCities"
              :key="index"
              style="width:28%;border:1px solid #ddd;margin:6px;"
            >
              <div style="text-align:center;padding:5px;" @click="hot(item)">{{item.name}}</div>
            </div>
          </div>
          <div>
            <van-index-bar>
              <div v-for="(item,index) in cities" :key="index">
                <van-index-anchor :index="index" />
                <div
                  v-for="(item1,index1) in item"
                  :key="index1"
                  style="border-bottom:1px solid #eee;"
                >
                  <van-cell :title="item1.name" @click="city222(item1)" />
                </div>
              </div>
            </van-index-bar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import area from "../http/js/area";
import city from "../http/js/city";
import util from "../http/js/util";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      city: "",
      values: "",
      hotCities: [],
      cities: {},
      flag: false,
      Searchcity111: [],
      arr: [],
      //   letter: [],
    };
  },
  //事件方法执行
  methods: {
    hot(item) {
      sessionStorage.setItem("city", JSON.stringify(item.name));
      this.$router.push("/homepage");
    },
    city111() {
      if (this.city !== "未获取到当前城市") {
        sessionStorage.setItem("city", JSON.stringify(this.city));
        this.$router.push("/homepage");
      } else {
        this.$router.push("/homepage");
      }
    },
    city222(item1) {
      sessionStorage.setItem("city", JSON.stringify(item1.name));
      this.$router.push("/homepage");
    },
    //定位搜索
    Searchcity() {
      for (let i in this.cities) {
        this.cities[i].map((item) => {
          this.arr.push(item);
        });
      }
      //汉字搜索
      if (/^[\u4e00-\u9fa5]+$/i.test(this.values)) {
        this.Searchcity111 = this.arr.filter((item) => {
          return item.name.includes(this.values);
        });
      } else {
        //字母搜索
        this.Searchcity111 = this.arr.filter((item) => {
          return item.spell.substr(0,1).includes(this.values.toLowerCase());
        });
      }
    //   console.log(this.Searchcity111);
    },
  },
  //页面初始化方法
  mounted() {
    if (this.$route.query.city === "") {
      this.city = "未获取到当前城市";
    } else {
      this.city = this.$route.query.city;
    }
    this.hotCities = city.data.hotCities;
    this.cities = city.data.cities;
    // for (let i in this.cities) {
    //   this.letter.push(i);
    // }
    // console.log(this.letter);
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {
    values() {
      if (this.values !== "") {
        this.flag = true;
      } else {
        this.flag = false;
        this.Searchcity111 = [];
      }
    },
  },
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