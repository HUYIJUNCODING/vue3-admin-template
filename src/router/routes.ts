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
    // //用户行为
    // {
    //     path: "/behavior",
    //     name: "behavior",
    //     redirect: "/behavior/menuHits",
    //     component: () => import("../views/layout/Index.vue"),
    //     children: [
    //         {
    //             //菜单点击量
    //             path: "menuHits",
    //             name: "menuHits",
    //             component: () => import("../views/behavior/MenuHits.vue")
    //         },
    //         {
    //             //用户在线时长
    //             path: "onlineTime",
    //             name: "onlineTime",
    //             component: () => import("../views/behavior/OnlineTime.vue")
    //         },
    //         {
    //             //新增用户数据
    //             path: "newUsers",
    //             name: "newUsers",
    //             component: () => import("../views/behavior/NewUsers.vue")
    //         }
    //     ]
    // },
    // //异常监控
    // {
    //     path: "/abnormalMonitor",
    //     name: "abnormalMonitor",
    //     redirect: "/abnormalMonitor/performance",
    //     component: () => import("../views/layout/Index.vue"),
    //     children: [
    //         {
    //             //页面性能
    //             path: "performance",
    //             name: "performance",
    //             component: () =>
    //                 import("../views/abnormalMonitor/Performance.vue")
    //         },
    //         {
    //             //错误看板
    //             path: "errorDashboard",
    //             name: "errorDashboard",
    //             component: () =>
    //                 import("../views/abnormalMonitor/ErrorDashboard.vue")
    //         }
    //     ]
    // },
    // //报警
    // {
    //     path: "/alarm",
    //     name: "alarm",
    //     redirect: "/alarm/alarmConfig",
    //     component: () => import("../views/layout/Index.vue"),
    //     children: [
    //         {
    //             //配置
    //             path: "alarmConfig",
    //             name: "alarmConfig",
    //             component: () => import("../views/alarm/AlarmConfig.vue")
    //         },
    //         {
    //             //日志
    //             path: "alarmLog",
    //             name: "alarmLog",
    //             component: () =>
    //                 import("../views/abnormalMonitor/AlarmLog.vue")
    //         }
    //     ]
    // },
    // {
    //     path: "/userManage",
    //     name: "userManage",
    //     component: () => import("../views/userManage/UserManage.vue")
    // }
];

export default routes;
