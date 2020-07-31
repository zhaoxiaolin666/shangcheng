<template>
  <div>
    <div class="settlement">
      <div style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee">
        <div>地址列表</div>
      </div>
      <div class="setup">
        <van-icon name="arrow-left" color="skyblue" @click="gocarts" />
      </div>
      <div style="height:500px;width:100%" v-if="list.length===0">
        <div style="text-align:center;line-height:500px;">暂无收货地址哦~~</div>
      </div>
      <div>
        <div>
          <div>
            <van-address-list
              v-model="chosenAddressId"
              :list="list"
              default-tag-text="默认"
              @add="onAdd"
              @edit="onEdit"
              @select="select"
            />
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
      chosenAddressId: "1",
      list: [],
      list111: [],
    };
  },
  //事件方法执行
  methods: {
    gocarts() {
      this.$router.go(-1);
    },
    onAdd() {
      Toast("新增地址");
      this.$router.push("/newaddress");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
      //   console.log(item);
      this.$router.push({ path: "/newaddress", query: { cont: item } });
    },
    select(item) {
          this.$api
            .getsetDefaultAddressData(item._id)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
    },
    //收货地址
    getAddress() {
      this.$api
        .getgetAddressData()
        .then((res) => {
          if (res.code === 200) {
            this.list = res.address;
            this.list.map((item) => {
              this.$set(item, "id", item._id);
              if (item.isDefault) {
                this.chosenAddressId = item.id;
                //设置默认收货地址
                this.$api
                  .getsetDefaultAddressData(item._id)
                  .then((res) => {
                    // console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });
          }
          //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // select(index) {

    // },
  },
  //页面初始化方法
  mounted() {
    this.getAddress();
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
  height: 667px;
}
.setup {
  position: absolute;
  top: 15px;
  left: 10px;
}
.btn {
  position: absolute;
  bottom: 0;
}
</style>