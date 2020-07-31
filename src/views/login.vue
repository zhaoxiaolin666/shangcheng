<template>
  <div>
    <div class="login">
      <div>
        <div class="goto" @click="gotohome">&lt;</div>
      </div>
      <div class="login_bottom">
        <div>
          <van-cell-group>
            <div class="top">登录/注册</div>
            <van-field v-model="username" label="USERNAME" placeholder="请输入用户名"  />
            <van-field v-model="password" type="password" label="PASSWORD" placeholder="请输入密码" />
            <van-field type="tel" label="手机号" placeholder="请输入手机号" />
            <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
              <template #button>
                <van-button size="small" type="primary" @click="sendout" ref="addAlert">发送验证码</van-button>
              </template>
            </van-field>
            <van-field v-model="verify" center clearable label="验证码" placeholder="请输入验证码">
              <template #button>
                 <div v-html="verify111" @click="switchcode"></div>
              </template>
            </van-field>
          </van-cell-group>
          <van-cell-group>
            <van-button type="primary" style="margin:50px 20px 50px 20px" @click="getlogin">登 录</van-button>
            <van-button type="danger" @click="getregister">注 册</van-button>
          </van-cell-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      username: "",
      password: "",
      phone: "",
      sms: "",
      verify: "",
       verify111: "",
      from: ""
    };
  },
  methods: {
    //   短信倒计时
    sendout() {
      let i = 60;
      let timrId = setInterval(() => {
        this.$refs.addAlert.disabled = true;
        i--;
        this.$refs.addAlert.innerText = `${i}s后重新发送`;
        if (i === 0) {
          this.$refs.addAlert.disabled = false;
          this.$refs.addAlert.innerText = "重新发送";
          clearInterval(timrId);
        }
      }, 1000);
    },
    // 登录请求
    getlogin() {
      this.$api
        .login({
          nickname: this.username,
          password: this.password,
          verify:this.verify
        })
        .then(res => {
             if(res.code===200){
                 let obj1={
                     nickname: this.username,
                    password: this.password,
                    verify:this.verify,
                 }
                localStorage.setItem("user",JSON.stringify(obj1))
                this.username="",
                 this.password="",
                 this.verify="",
                 this.$toast(res.msg);
                 this.$router.push("/")
            }
            else{
                this.$toast(res.msg);
            }
            console.log(res);
        //   this.from = res;
        //   console.log(this.from);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 注册请求
    getregister(){
        this.$api
        .register({
          nickname: this.username,
          password: this.password,
          verify:this.verify
        })
        .then(res => {
            if(res.code===200){
                let obj2={
                     nickname: this.username,
                    password: this.password,
                    verify:this.verify,
                 }
                localStorage.setItem("user",JSON.stringify(obj2))
                 this.username="",
                 this.password="",
                 this.verify="",
                 this.$toast(res.msg);
                 this.$router.push("/")
            }
            else{
                this.$toast(res.msg);
            }
            console.log(res);
        //   this.from = res;
        //   console.log(this.from);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 验证码请求
    getverify() {
      this.$api
        .getverifyData()
        .then(res => {
            // console.log(res);
          this.verify111 = res;
        //   console.log(this.verify111);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 再次请求验证码 
    switchcode(){
        this.$api
        .getverifyData()
        .then(res => {
          //   console.log(res);
          this.verify111 = res;
        //   console.log(this.verify111);
        })
        .catch(err => {
          console.log(err);
        });
    },
    gotohome(){
        this.$router.push("/")
    }
  },
  mounted() {
    this.getverify();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.login {
  background-image: url("../assets/login.jpg");
  height: 667px;
  width: 375px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.top {
  font-size: 28px;
  font-weight: 500;
  margin-left: 15px;
}
.goto {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  background-color: #ccc;
  color: #777;
  font-size: 20px;
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.8;
}
.login_bottom {
  position: absolute;
  bottom: 50px;
  left: 10px;
  right: 10px;
}
</style>