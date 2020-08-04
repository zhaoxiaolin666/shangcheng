import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        redirect: "/homepage",
        children: [{
                path: "/homepage",
                name: "homepage",
                component: () =>
                    import ("../views/homepage.vue"),
                meta: {
                    title: "商城主页",
                },
            },
            {
                path: "/classification",
                name: "classification",
                component: () =>
                    import ("../views/classification.vue"),
                meta: {
                    title: "商品分类",
                },
            },
            {
                path: "/ShoppingCart",
                name: "ShoppingCart",
                component: () =>
                    import ("../views/ShoppingCart.vue"),
                meta: {
                    title: "购物车",
                },
            },
            {
                path: "/mine",
                name: "mine",
                component: () =>
                    import ("../views/mine.vue"),
                meta: {
                    title: "我的",
                },
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("../views/login.vue"),
        meta: {
            title: "登录",
        },
    },
    {
        path: "/location",
        name: "location",
        component: () =>
            import ("../components/location"),
        meta: {
            title: "城市定位",
        },
    },
    {
        path: "/details",
        name: "details",
        component: () =>
            import ("../views/details.vue"),
        meta: {
            title: "商品详情",
        },
    },
    {
        path: "/setup",
        name: "setup",
        component: () =>
            import ("../views/setup.vue"),
        meta: {
            title: "我的设置",
        },
    },
    {
        path: "/settlement",
        name: "settlement",
        component: () =>
            import ("../components/settlement.vue"),
        meta: {
            title: "订单结算",
        },
    },
    {
        path: "/goaddress",
        name: "goaddress",
        component: () =>
            import ("../components/goaddress.vue"),
        meta: {
            title: "地址列表",
        },
    },
    {
        path: "/newaddress",
        name: "newaddress",
        component: () =>
            import ("../components/newaddress.vue"),
        meta: {
            title: "新地址",
        },
    },
    {
        path: "/Allorders",
        name: "Allorders",
        component: () =>
            import ("../components/mi/Allorders.vue"),
        meta: {
            title: "全部订单",
        },
    },
    {
        path: "/evaluate",
        name: "evaluate",
        component: () =>
            import ("../components/mi/evaluate.vue"),
        meta: {
            title: "评价中心",
        },
    },
    {
        path: "/seeevaluate",
        name: "seeevaluate",
        component: () =>
            import ("../components/mi/seeevaluate.vue"),
        meta: {
            title: "查看评价",
        },
    },
    {
        path: "/comment",
        name: "comment",
        component: () =>
            import ("../components/mi/comment.vue"),
        meta: {
            title: "评价",
        },
    },
    {
        path: "/Collection",
        name: "Collection",
        component: () =>
            import ("../components/mi/Collection.vue"),
        meta: {
            title: "收藏历史",
        },
    },
    {
        path: "/browsing",
        name: "browsing",
        component: () =>
            import ("../components/mi/browsing.vue"),
        meta: {
            title: "最近浏览",
        },
    },
    {
        path: "*",
        name: "404",
        component: () =>
            import ("../views/404.vue"),
        meta: {
            title: "404",
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    console.log(from);
    document.title = to.meta.title;
    next();
});
export default router;