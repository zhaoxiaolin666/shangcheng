//封装所有请求
import service from "./index";

export default {
    //注册
    //username:用户名
    //password:密码
    register({ nickname, password, verify }) {
        return service.post("/register", { nickname, password, verify });
    },
    //登陆
    //username:用户名
    //password:密码
    login({ nickname, password, verify }) {
        return service.post("/login", { nickname, password, verify });
    },
    //验证码
    getverifyData() {
        return service.get("/verify");
    },
    //获取首页的数据
    getHomeData() {
        return service.get("/recommend");
    },
};