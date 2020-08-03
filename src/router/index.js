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
            },
            {
                path: "/classification",
                name: "classification",
                component: () =>
                    import ("../views/classification.vue"),
            },
            {
                path: "/ShoppingCart",
                name: "ShoppingCart",
                component: () =>
                    import ("../views/ShoppingCart.vue"),
            },
            {
                path: "/mine",
                name: "mine",
                component: () =>
                    import ("../views/mine.vue"),
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("../views/login.vue"),
    },
    {
        path: "/location",
        name: "location",
        component: () =>
            import ("../components/location"),
    },
    {
        path: "/details",
        name: "details",
        component: () =>
            import ("../views/details.vue"),
    },
    {
        path: "/setup",
        name: "setup",
        component: () =>
            import ("../views/setup.vue"),
    },
    {
        path: "/settlement",
        name: "settlement",
        component: () =>
            import ("../components/settlement.vue"),
    },
    {
        path: "/goaddress",
        name: "goaddress",
        component: () =>
            import ("../components/goaddress.vue"),
    },
    {
        path: "/newaddress",
        name: "newaddress",
        component: () =>
            import ("../components/newaddress.vue"),
    },
    {
        path: "/Allorders",
        name: "Allorders",
        component: () =>
            import ("../components/mi/Allorders.vue"),
    },
    {
        path: "/evaluate",
        name: "evaluate",
        component: () =>
            import ("../components/mi/evaluate.vue"),
    },
    {
        path: "/seeevaluate",
        name: "seeevaluate",
        component: () =>
            import ("../components/mi/seeevaluate.vue"),
    },
    {
        path: "/comment",
        name: "comment",
        component: () =>
            import ("../components/mi/comment.vue"),
    },
    {
        path: "/Collection",
        name: "Collection",
        component: () =>
            import ("../components/mi/Collection.vue"),
    },
    {
        path: "/browsing",
        name: "browsing",
        component: () =>
            import ("../components/mi/browsing.vue"),
    },
    {
        path: "*",
        name: "404",
        component: () =>
            import ("../views/404.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;