import {RoutesType} from "../router/AppRouters";

export function arrHas(min: string[], max: string[]): boolean {
    for (const item of min) {
        if (max.includes(item)) {
            return true;
        }
    }
    return false;
}

export function setRole(role: string): void {
    let str = "";
    if (role) {
        str = JSON.stringify(role);
    }
    window.sessionStorage.setItem("role", str);
}

export function getRole(): void {
    return window.sessionStorage.getItem("role")
        ? JSON.parse(window.sessionStorage.getItem("role"))
        : [];
}

export function filterRouter(
    routers: RoutesType,
    role: string[]
) {
    const newRouter: {[index: string]: Array<object>} = {};

    for (const i in routers) {
        const item: Array<any> = routers[i];

        if (i == "index") {
            newRouter[i] = [];
        }       
        const arr: Array<object> = item.map((item) => {
            if (!item.disabled) {
                if (!arrHas(role, item.role)) {
                    item.noAuth = true;
                } else {
                    item.noAuth = false;
                }
            }
            return item;
        });
        if (arr.length > 0) {
            newRouter[i] = arr;
        }
    }

    return newRouter;
}

// export function canUseBtn(disableArr) {
//     let role = getMallRole();
//     if(arrHas( disableArr,role)){
//         return true
//     }else {
//         return false
//     }
// }
