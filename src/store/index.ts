//类型声明
import { RoutesType } from "../router/AppRouters";

interface State {
    [index: string]: any;
}

import { createStore } from "vuex";

import { filterRouter } from "../utils/assist";

import {
    firstRouters,
    secondRouters,
    thirdRouters
} from "../router/AppRouters";

export default createStore({
    state: {
        //一级路由
        firstRouters,
        // //二级路由
        secondRouters,
        // //三级路由
        thirdRouters
    },
    getters: {
        firstRouters: state => state.firstRouters,
        secondRouters: state => state.secondRouters,
        thirdRouters: state => state.thirdRouters,
        
    },
    mutations: {
        checkRole(state: State): void {
            const role = ["master"];

            if (role) {
                const arrRouters: { [index: string]: RoutesType } = {
                    firstRouters,
                    secondRouters,
                    thirdRouters
                };
                for (const key in arrRouters) {
                    state[key] = filterRouter(arrRouters[key], role);
                }
            }
        }
    },
    actions: {},
    modules: {}
});
