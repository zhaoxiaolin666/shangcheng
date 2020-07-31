//封装所有请求
import service from "./index";

export default {
    //1注册
    //username:用户名
    //password:密码
    register({ nickname, password, verify }) {
        return service.post("/register", { nickname, password, verify });
    },
    //2登陆
    //username:用户名
    //password:密码
    login({ nickname, password, verify }) {
        return service.post("/login", { nickname, password, verify });
    },
    //3验证码
    getverifyData() {
        return service.get("/verify");
    },
    //4获取首页的数据
    getHomeData() {
        return service.get("/recommend");
    },
    //5分类查询
    getclassificationData(id) {
        return service.get(`/classification?mallSubId=${id}`);
    },
    //6单个商品详情(get)
    getgoodsData(id) {
        return service.get(`/goods/one?id=${id}`);
    },
    //7获取用户信息(post)
    getqueryUserData() {
        return service.post("/queryUser");
    },
    //8修改保存用户信息(post)
    getsaveUserData(gender, year, month, day, id, nickname, username) {
        return service.post("/saveUser", {
            gender,
            year,
            month,
            day,
            id,
            nickname,
            username,
        });
    },
    //9收藏单个商品(post)
    getcollectionData(goods) {
        return service.post("/collection", goods); //goods是对象，post请求传对象
    },
    //10取消收藏(post)
    getcancelCollectionData(id) {
        return service.post("/cancelCollection", { id });
    },
    //11. 查询商品是否已收藏(post)
    getisCollectionData(id) {
        return service.post("/isCollection", { id });
    },
    //12加入购物车(post)
    getaddShopData(id) {
        return service.post("/addShop", { id });
    },
    //13 查询获取购物车数据
    getgetCardData() {
        return service.post("/getCard");
    },
    //14购物车加减商品(post)
    geteditCartData({ count, id, mallPrice }) {
        return service.post("/editCart", { count, id, mallPrice });
    },
    //15购物车商品删除(post)cid
    getdeleteShopData(id) {
        return service.post("/deleteShop", id);
    },
    //16增加收货地址(post)
    getaddressData({
        name,
        tel,
        address,
        isDefault,
        province,
        city,
        county,
        addressDetail,
        areaCode,
        id,
    }) {
        return service.post("/address", {
            name,
            tel,
            address,
            isDefault,
            province,
            city,
            county,
            addressDetail,
            areaCode,
            id,
        });
    },
    //17查询用户收货地址(get)
    getgetAddressData() {
        return service.get("/getAddress");
    },
    //18删除地址(post)
    getdeleteAddressData(id) {
        return service.post("/deleteAddress", { id });
    },
    //19 查询默认收货地址(get)
    getDefaultAddressData() {
        return service.get("/getDefaultAddress");
    },
    //20设置默认收货地址(post)
    getsetDefaultAddressData(id) {
        return service.post("/setDefaultAddress", { id });
    },
    //21 购物车支付页面(post)
    getorderData({ address, tel, orderId, totalPrice, idDirect, count }) {
        return service.post("/order", {
            address,
            tel,
            orderId,
            totalPrice,
            idDirect,
            count,
        });
    },
    //22查询我的收藏(get)
    getcollectionstData() {
        return service.get('/collection/list')
    },
    //23订单查询路径是
    getmyOrderData() {
        return service.get('/myOrder')
    },
    //24查询未评价(get)
    gettobeEvaluatedData() {
        return service.get('/tobeEvaluated')
    },
    //25查询已评价(get)
    getalreadyEvaluatedData() {
        return service.get('/alreadyEvaluated')
    },
    //26查询单条评论(post)
    getevaluateOneData({ id, _id }) {
        return service.post("/evaluateOne", {
            id,
            _id
        });
    },
    //27商品评论(post)
    getgoodsOneData({ id, rate, content, anonymous, _id, order_id, image }) {
        return service.post("/goodsOne/comment", {
            id,
            rate,
            content,
            anonymous,
            _id,
            order_id,
            image
        });
    },
    // 28搜索(get)
    getsearchData({ value }) {
        return service.post("/search", { value });
    },
    //退出登录(post)
    getloginOutData() {
        return service.post("/loginOut", {});
    },
};