<template>
  <div>
    <div class="settlement">
      <div style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee">
        <div>编辑地址</div>
      </div>
      <div class="setup">
        <van-icon name="arrow-left" color="skyblue" @click="gocarts" />
      </div>
      <div>
        <van-address-edit
          :area-list="areaList"
          show-postal
          show-delete
          show-set-default
          show-search-result
          :search-result="searchResult"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
          @change-detail="onChangeDetail"
          :address-info="addressinfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import areaList from "../http/js/area";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      areaList,
      searchResult: [],
      addressinfo: {},
    };
  },
  //事件方法执行
  methods: {
    //返回
    gocarts() {
      this.$router.go(-1);
    },
    //保存
    onSave(content) {
      this.$api
        .getaddressData({
          id: content._id,
          name: content.name,
          tel: content.tel,
          address: content.province + content.city + content.county,
          isDefault: content.isDefault,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          areaCode: content.areaCode,
        })
        .then((res) => {
          if (res.code === 200) {
            Toast.success(res.msg);
             this.$router.go(-1);
          }
        //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除
    onDelete() {
      this.$api
        .getdeleteAddressData(this.addressinfo._id)
        .then((res) => {
          Toast("delete");
           this.$router.go(-1);
        //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //默认
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
   

  },
  //页面初始化方法
  mounted() {
    this.addressinfo = this.$route.query.cont;
    //   console.log(this.addressinfo)
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
</style>