const routes = [
    {
        path: "/",
        name: "index",
        redirect: "/index",
        component: () => import("../views/layout/Index.vue"),
        children: [
            {
                path: "index",
                name: "index",
                component: () => import("../views/main/Index.vue")
            }
        ]
    },
    {
        path: "/order/query",
        name: "orderQuery",
        redirect: "/order/query/queryOrder",
        component: () => import("../views/layout/Index.vue"),
        children: [
            {
                path: "queryOrder",
                name: "queryOrder",
                component: () => import("../views/order/query/QueryOrder.vue")
            }
        ]
    },
    {
        path: "/order/verify",
        name: "orderVerify",
        redirect: "/order/verify/verification",
        component: () => import("../views/layout/Index.vue"),
        children: [
            {
                path: "verification",
                name: "verification",
                component: () => import("../views/order/verify/Verification.vue")
            }
        ]
    },
    
];

export default routes;
