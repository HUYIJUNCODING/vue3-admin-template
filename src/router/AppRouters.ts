export type RouteMenuType = {
    title: string;
    index?: string;
    noAuth: boolean;
    role: string[];
    icon?: string;
    disabled?: boolean;
    divide?: boolean;
}

export  interface RoutesType {
    [index: string]: Array<RouteMenuType>;
}

export const firstRouters: RoutesType = {
    subMenu: [
        {
            title: "店铺概况",
            index: "index",
            icon: "icon-dianpu",
            noAuth: false,
            role: ["master"]
        },
        {
            title: "订单管理",
            index: "order",
            icon: "icon-dingdan",
            noAuth: false,
            role: ["master"]
        }
    ],
    supMenu: [
        {
            title: "设置",
            index: "setting",
            icon: "icon-shezhi",
            noAuth: false,
            role: ["manager"]
        }
    ]
};

export const secondRouters: RoutesType = {
    order: [
        {
            title: "订单交易",
            disabled: true,
            divide: true,
            noAuth: false,
            role: ["master"]
        },
        {
            title: "物流订单",
            index: "query",
            noAuth: false,
            role: ["manager"]
        },
        {
            title: "自提订单",
            index: "verify",
            noAuth: false,
            role: ["master"]
        },
        {
            title: "订单统计",
            index: "orderCalc",
            noAuth: false,
            role: ["master"]
        }
    ],
    setting: [
        {
            title: "订单设置",
            index: "order",
            noAuth: false,
            role: ["master", "manager"]
        }
    ]
};

export const thirdRouters: RoutesType = {
    "/index": [
        {
            title: "店铺概况",
            index: "index",
            noAuth: false,
            role: ["master"]
        }
    ],
    "/order/query": [
        {
            title: "物流订单",
            index: "queryOrder",
            noAuth: false,
            role: ["master"]
        }
    ],

    "/order/verify": [
        {
            title: "自提订单",
            index: "verification",
            noAuth: false,
            role: ["master"]
        },
        {
			title: "核销纪录",
			index: "record",
			noAuth: false,
			role: ["master"]
		}
    ],

    "/setting/order": [
        {
            title: "订单设置",
            index: "order",
            noAuth: false,
            role: ["master"]
        }
    ]
};
