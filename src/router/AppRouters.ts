export  interface RoutesType {
    [index: string]: Array<object>;
}

export const firstRouters: RoutesType = {
    subMenu: [
        {
            title: "店铺概况",
            index: "index",
            icon: "icon-dianpu",
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        },
        {
            title: "订单管理",
            index: "order",
            icon: "icon-dingdan",
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        }
    ],
    supMenu: [
        {
            title: "设置",
            index: "setting",
            icon: "icon-shezhi",
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        }
    ]
};

export const secondRouters: RoutesType = {
    index: [],
    order: [
        {
            title: "订单交易",
            disabled: true,
            divide: true,
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        },
        {
            title: "物流订单",
            index: "query",
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        },
        {
            title: "自提订单",
            index: "verify",
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        }
    ],
    setting: [
        {
            title: "订单设置",
            index: "order",
            noAuth: false,
            auth: ["beego"],
            role: ["master", "manager", "operator"]
        }
    ]
};

export const thirdRouters: RoutesType = {
    "/index": [
        {
            title: "店铺概况",
            index: "index",
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        }
    ],
    "/order/query": [
        {
            title: "物流订单",
            index: "queryOrder",
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        }
    ],

    "/order/verify": [
        {
            title: "自提订单",
            index: "verification",
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        }
    ],

    "/setting/order": [
        {
            title: "订单设置",
            index: "order",
            noAuth: false,
            auth: ["beego"],
            role: ["master"]
        }
    ]
};
