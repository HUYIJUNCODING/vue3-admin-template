import router from "./index";
import { getUserToken, clearLoginCookie } from "../utils/cookie";

// progress bar
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });



router.beforeEach((to, from) => {
    NProgress.start(); // start progress bar

    const userToken: string = getUserToken();

    if (to.fullPath.indexOf('/account') > -1) {
        clearLoginCookie();
    } else if (!userToken) {
        clearLoginCookie();
        return {
            redirect: true,
            path: "/account/login"
        };
    }
});

router.afterEach((to, from) => {
    NProgress.done();
});
