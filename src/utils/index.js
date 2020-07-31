//默认导出
import { Dialog } from "vant";
export default {
    //检测登录没有
    checkLogin(next) {
        if (localStorage.getItem("user")) {
            next();
        } else {
            Dialog.alert({
                titile: "检测到您现在没有登录",
                message: "是否跳转到登录/注册页面",
            });
        }
    },
    //加入收藏列表和最近浏览是一样
    addCollction(username, name, item) {
        //每个用户进来收藏和最近浏览不一样的
        //存储到本地localStorage里面
        //数组 标识每个用户
        //用户名是惟一的
        //收藏列表：名字叫 用户名 + colltion
        //最近浏览： 名字叫 用户名 + browser

        //先判断本地localStorage里面有没有收藏或者最近浏览列表
        // this.addCollction(username + "collect", item);
        let user = username + name;
        if (localStorage.getItem(user)) {
            let arr = JSON.parse(localStorage.getItem(user));
            arr.unshift(item);
            //去重的逻辑  收藏
            arr = arr.filter((item, index, arr) => {
                return arr.indexOf(item);
            });
            localStorage.setItem(user, JSON.stringify(arr));
        } else {
            let arr = [];
            arr.unshift(item);
            localStorage.setItem(user, JSON.stringify(arr));
        }
    },
};
//this.$utils.addCollction('colltion',item)
//this.$utils.addCollction('browser',item)