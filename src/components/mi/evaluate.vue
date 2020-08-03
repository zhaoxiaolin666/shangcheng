<template>
  <div>
    <div class="settlement">
      <div style="display:flex;justify-content: center;padding:10px 0;">
        <div>评价中心</div>
      </div>
      <div class="setup">
        <van-icon name="arrow-left" color="skyblue" @click="$router.go(-1)" />
      </div>
    </div>
    <div>
      <img src="../../assets/evaluate.jpg" alt style="width:100%;" />
    </div>
    <div style="display:flex;justify-content: center;">
      <div style="width:80%;" class="position">
        <van-tabs v-model="active" style=" border-radius: 10px;">
          <van-tab title="待评价">
            <div v-if="list.length===0">暂无未评价</div>
            <div
              v-for="(item,index) in list"
              :key="index"
              v-else
              style="display:flex;font-size:14px;margin:20px 0;border-bottom:1px solid #eee;"
            >
              <div>
                <img :src="item.image_path" alt style="width:60px;height:60px;" />
              </div>
              <div style="width:200px;">{{item.name}}</div>
              <div style="width:100px;display:flex;align-items:flex-end;margin-bottom:5px;">
                <van-button plain type="danger" round size="mini" @click="comment(item)">
                  <van-icon name="chat" />评论晒单
                </van-button>
              </div>
            </div>
          </van-tab>
          <van-tab title="已评价">
            <div v-if="overlist.length===0">暂无已评价</div>
            <div
              v-for="(item,index) in overlist"
              :key="index"
              v-else
              style="display:flex;font-size:14px;margin:20px 0;border-bottom:1px solid #eee;"
            >
              <div v-for="(item1,index1) in item.goods" :key="index1" style="display:flex;">
                <div>
                  <img :src="item1.image_path" alt style="width:60px;height:60px;" />
                </div>
                <div style="width:200px;">{{item1.name}}</div>
                <div style="width:100px;display:flex;align-items:flex-end;margin-bottom:5px;">
                  <van-button plain type="default" round size="mini" @click="see(item)">查看评价</van-button>
                </div>
              </div>
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
      active: 0,
      list: [],
      overlist: [],
    };
  },
  //事件方法执行
  methods: {
    //查询未评价
    gettobeEvaluated() {
      this.$api
        .gettobeEvaluatedData()
        .then((res) => {
          if (res.code === 200) {
            this.list = res.data.list;
          }
          console.log(this.list);
        })
        .catch((err) => {
          conaole.log(err);
        });
    },
    //评价
    comment(item) {
      // console.log(item)
      this.$router.push({ path: "/comment", query: { comment: item } });
    },
    // 查询已评价
    getalreadyEvaluated() {
      this.$api
        .getalreadyEvaluatedData()
        .then((res) => {
          this.overlist = res.data.list;
            // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查看评价
    see(item) {
        // console.log(item)
      this.$router.push({ path: "/seeevaluate", query: { seeevaluate: item } });
    },
  },
  //页面初始化方法
  mounted() {
    this.gettobeEvaluated();
    this.getalreadyEvaluated();
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
.position {
  position: absolute;
  top: 240px;
  //   box-shadow: 3px 3px 3px #ddd;
  //   border-top-left-radius: 10px;
}
</style>