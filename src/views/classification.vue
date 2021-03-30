<template>
  <div>
    <div style="text-align:center;padding:5px 0">商品分类</div>
    <div class="mall">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="item.mallCategoryName"
            v-for="(item,index) in category"
            :key="index"
            @click="onclick1"
          />
        </van-sidebar>
      </div>
      <div>
        <van-tabs v-model="active" :ellipsis="false" @click="onclick2">
          <van-tab
            :title="item.mallSubName"
            v-for="(item,index) in bxMallSubDto"
            :key="index"
            style="overflow: auto;height:550px;"
          >
            <div>
              <div v-if="flag===false">
                <van-loading size="30px" vertical>加载中...</van-loading>
              </div>
              <div v-if="dataList.length>0&&flag===true">
                <div
                  v-for="(item,index) in dataList"
                  :key="index"
                  class="vantab"
                  @click="$Todetails(item.id)"
                >
                  <div>
                    <img :src="item.image_path" :alt="item.name" class="imgname" />
                  </div>
                  <div class="prices">
                    <div style="font-size:14px">{{item.name}}</div>
                    <div class="jiage">
                      <div style="font-weight:600">￥{{item.present_price}}</div>
                      <div
                        style="font-size:12px;color:#444;text-decoration: line-through;margin-bottom:1px"
                      >{{item.orl_price}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="flag===true&&dataList.length===0">暂无数据</div>
            </div>
          </van-tab>
        </van-tabs>
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
      category: [], //分类
      active: 0, //第几标签
      activeKey: 0, //第几导航
      dataList: [], //详情商品
      bxMallSubDto: [], //标签页数据
      id: "", //标签页类别id
      flag: null
    };
  },
  //事件方法执行
  methods: {
    //导航栏点击
    onclick1(index) {
      this.bxMallSubDto = this.category[index].bxMallSubDto; //导航栏为index的导航栏对应的标签页数据
      this.active = 0; //默认标签页为0
      this.id = this.bxMallSubDto[this.active].mallSubId; //导航栏为index的标签栏为this.active的id
      this.classification(this.id); //给事件classification传形参id
    },
    //标签点击
    onclick2() {
      this.id = this.bxMallSubDto[this.active].mallSubId; //导航栏为index的标签栏为this.active的id
      this.classification(this.id); //给事件classification传形参id
    },
    //分类请求
    classification(id) {
      this.$api
        .getclassificationData(id)
        .then(res => {
          if (res.code === 200) {
            this.dataList = res.dataList; //对应id的详情页数据
          }
          //   console.log(res.dataList);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // //跳转详情页及传参
    // goto(item,index){
    //     // console.log(index)
    //     this.$router.push({name:'details',query:{id:this.id,a:index}})//路由到详情页，传形参id
    // }
    //   主页数据请求
    getHome() {
      this.$api
        .getHomeData()
        .then(res => {
          this.category = res.data.category; // 分类
          //   console.log(this.activeKey);
          this.bxMallSubDto = this.category[this.activeKey].bxMallSubDto; //默认项导航栏0的标签数据!!!
          // console.log(this.bxMallSubDto);
          this.id = this.bxMallSubDto[this.active].mallSubId; //默认项导航栏0的标签栏0的id
          this.classification(this.id); //给事件classification传形参id

          //   console.log(res);
          //   console.log(this.id)
          //    console.log(this.category);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //页面初始化方法
  mounted() {
    this.classification();
    this.getHome();
    //页面初始化判断有无主页activeKey传来，没有activeKey=0
    if (this.$route.query.activeKey) {
      this.activeKey = this.$route.query.activeKey;
    }
    let i = 0.7;
    let timrId = setInterval(() => {
      this.flag = false;
      i -= 0.7;
      if (i === 0) {
        this.flag = true;
        clearInterval(timrId);
      }
    }, 700);
    //接收主界面的导航栏下标
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {
    // activeKey(val) {
    //   this.bxMallSubDto = this.category[val].bxMallSubDto;
    // }
  },
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.mall {
  display: flex;
}
.vantab {
  border-bottom: 1px solid #eee;
  display: flex;
}
.imgname {
  width: 80px;
  height: 80px;
  border: 1px solid #ddd;
  margin: 8px;
}
.prices {
  color: red;
  margin-top: 20px;
}
.jiage {
  display: flex;
  align-items: flex-end;
  margin: 10px 0;
  div {
    margin-right: 10px;
  }
}
</style>
