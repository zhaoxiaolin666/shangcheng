<template>
  <div>
    <div class="mine">
      <div class="setup">
        <van-icon name="arrow-left" color="skyblue" @click="gomine" />
      </div>
      <div
        style="display:flex;justify-content: center;padding:10px 0;border-bottom:1px solid #eee;font-weight:500"
      >
        <div>个人资料</div>
      </div>
      <div style="display:flex;padding:10px 0;border-bottom:1px solid #eee;">
        <div style="width:80px;" class="margin-left">github</div>
      </div>
      <div
        style="display:flex;padding:10px 0;border-bottom:1px solid #eee;justify-content:space-between;align-items: center;"
      >
        <div style="width:80px;" class="margin-left">头像</div>
        <div style="display:flex;align-items: center;">
          <div>
            <img
              :src="queryUser.avatar"
              style="width:50px;height:50px;border-radius: 50%;margin-right:10px"
            />
          </div>
          <div>
            <van-icon name="arrow" style="margin-right:20px; " />
          </div>
        </div>
      </div>
      <div style="display:flex;padding:10px 0;border-bottom:1px solid #eee;">
        <div style="display:flex;align-items: center;">
          <div style="width:80px;" class="margin-left">用户名</div>
          <div>
            <input
              type="text"
              v-model="queryUser.nickname"
              style="outline:none;border:none;margin-left:30px;"
            />
          </div>
        </div>
      </div>
      <div style="display:flex;padding:10px 0;border-bottom:1px solid #eee;">
        <div style="display:flex; align-items: center;">
          <div style="width:80px;" class="margin-left">昵称</div>
          <div>
            <input
              type="text"
              v-model="queryUser.username"
              disabled
              style="outline:none;border:none;margin-left:30px;"
            />
          </div>
        </div>
      </div>
      <div style="display:flex;padding:10px 0;border-bottom:1px solid #eee;">
        <div style="display:flex;align-items: center;">
          <div style="width:80px;" class="margin-left">性别</div>
          <div>
            <input
              type="text"
              v-model="queryUser.gender"
              style="outline:none;border:none;margin-left:30px;"
            />
          </div>
        </div>
      </div>
      <div style="display:flex;padding:10px 0;border-bottom:1px solid #eee;">
        <div style="display:flex;align-items: center;">
          <div style="width:80px;" class="margin-left">邮箱</div>
          <div>
            <input
              type="email"
              placeholder="请输入邮箱"
              style="outline:none;border:none;margin-left:30px;"
            />
          </div>
        </div>
      </div>
      <div style="display:flex;padding:10px 0;border-bottom:1px solid #eee;">
        <div style="display:flex;align-items: center;">
          <div style="width:80px;" class="margin-left">出生年月</div>
          <div @click="showPopup">
            <input type="text" v-model="birth" style="outline:none;border:none;margin-left:30px;" />
          </div>
        </div>
      </div>
      <div>
        <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
          <div>
            <van-datetime-picker
              v-model="currentDate"
              type="date"
              title="请选择日期"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="value111"
              @cancel="cancel"
            />
          </div>
        </van-popup>
      </div>
      <div>
        <div style="display:flex;justify-content:center;margin:50px 30px 10px 30px">
          <van-button type="primary" size="large" @click="saveUser">保存</van-button>
        </div>
        <div style="display:flex;justify-content:center;margin:0 30px 0 30px">
          <van-button type="default" size="large" @click="nosaveUser">取消</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      user: {},
      currentDate: new Date(),
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2025, 10, 1),
      show: false,
      //   gender: "",
      //   year: "",
      //   month: "",
      //   day: "",
      //   id: "",
      //   nickname: "",
      queryUser: [],
      birth: "",
    };
  },
  //事件方法执行
  methods: {
    //获取用户信息(post)
    getqueryUser() {
      this.$api
        .getqueryUserData()
        .then((res) => {
          if (res.code === 200) {
            this.queryUser = res.userInfo;
          }
          this.birth = `${this.queryUser.year}年${this.queryUser.month}月${this.queryUser.day}日`;
          //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //修改用户信息(post)
    saveUser() {
      // console.log(this.queryUser.year)
      this.$api
        .getsaveUserData(
          this.queryUser.gender,
          this.queryUser.year,
          this.queryUser.month,
          this.queryUser.day,
          this.queryUser._id,
          this.queryUser.nickname,
          this.queryUser.username
        )
        .then((res) => {
        //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //取消修改
    nosaveUser() {
      this.$router.push("/mine");
    },
    //返回
    gomine() {
      this.$router.go(-1);
    },
    //确定
    value111(value) {
      this.show = false;
      //   console.log(value)
      this.queryUser.year = dayjs(value).year(); //时间年
      this.queryUser.month = dayjs(value).month() + 1; //时间月
      this.queryUser.day = dayjs(value).date(); //时间月
      this.birth = dayjs(value).format("YYYY年MM月DD日"); //展示时间
    },
    //取消
    cancel() {
      this.show = false;
    },
    //时间选择初始不显示
    showPopup() {
      this.show = true;
    },
  },
  //页面初始化方法
  mounted() {
    this.getqueryUser();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {},
};
</script>

<style scoped lang='scss'>
.mine {
  position: relative;
  color: #333;
}
.setup {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 20px;
  top: 15px;
}
.margin-left {
  margin-left: 20px;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
</style>