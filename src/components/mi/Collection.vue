<template>
  <div>
    <div class="settlement">
      <div style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee">
        <div>我的收藏</div>
      </div>
      <div class="setup">
        <van-icon name="arrow-left" color="skyblue" @click="$router.go(-1)" />
      </div>
    </div>
    <div>
      <div
        v-for="(item,index) in list"
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
          <div style="color:red;font-weight:600">￥{{item.present_price}}</div>
          <div style=" text-align:right;font-size:12px" @click="cancels(item,index)">x</div>
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
      collectionlist: {},
      list: [],
    };
  },
  //事件方法执行
  methods: {
    //查询收藏
    getcollectionst() {
      this.$api
        .getcollectionstData()
        .then((res) => {
          if (res.code === 200) {
            this.collectionlist = res.data;
            this.list = this.collectionlist.list;
          }
        //   console.log(this.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //取消收藏
    cancels(item,index) {
      this.$api
        .getcancelCollectionData(item.cid)
        .then((res) => {
          if (res.code === 200) {
            this.list.splice(index,1)
            Toast.fail(res.msg);
          }
            // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  //页面初始化方法
  mounted() {
    this.getcollectionst();
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