/* eslint-disable */

//类型声明
import { InjectionKey } from 'vue'
import { RoutesType } from "../router/AppRouters";

// define your typings for the store state
export interface State {
    [index: string]: any;
}


import { createStore, createLogger, useStore as baseUseStore,Store } from 'vuex'

import { filterRouter } from "../utils/assist";

import {
    firstRouters,
    secondRouters,
    thirdRouters
} from "../router/AppRouters";

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

const store: Store<State> = createStore<State>({
    state: {
        //一级路由
        firstRouters,
        // //二级路由
        secondRouters,
        // //三级路由
        thirdRouters
    },
    getters: {
        firstRouters(state: State): RoutesType {
            return state.firstRouters
        },
        secondRouters(state: State): RoutesType {
            return state.secondRouters
        },
        thirdRouters(state: State): RoutesType {
            return state.thirdRouters
        }
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
    modules: {},
    plugins:  process.env.NODE_ENV !== 'production' ? [createLogger()]: []
});

export function useStore () {
    return baseUseStore(key)
  }

export default store;
