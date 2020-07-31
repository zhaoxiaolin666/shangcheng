<template>
  <div>
    <div class="settlement">
      <div style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee">
        <div>最近浏览</div>
      </div>
      <div class="setup">
        <van-icon name="arrow-left" color="skyblue" @click="$router.go(-1)" />
      </div>
    </div>
    <div>
      <div
        v-for="(item,index) in setgoods"
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
          <div style="display:flex;margin-top:20px;">
            <div style="color:red;font-weight:600">￥{{item.present_price}}</div>
            <div
              style="text-decoration:line-through;font-size:14px;margin:3px 0 0 10px;"
            >{{item.orl_price}}</div>
          </div>
          <div style=" text-align:right;font-size:12px" @click="delate(item,index)">x</div>
        </div>
      </div>
    </div>
    <div></div>
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
      setgoods: [],
      queryUser: "",
    };
  },
  //事件方法执行
  methods: {
    //删除最近浏览
    delate(item, index) {
      this.setgoods.splice(index, 1);
     localStorage.setItem(`${this.queryUser}colltion`,JSON.stringify(this.setgoods))
    },
  },
  //页面初始化方法
  mounted() {
    this.queryUser = JSON.parse(localStorage.getItem("username"));
    this.setgoods = JSON.parse(
      localStorage.getItem(`${this.queryUser}colltion`)
    );
    console.log(this.setgoods);
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