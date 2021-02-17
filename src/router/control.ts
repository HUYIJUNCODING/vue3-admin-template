
import router from "./index";
import store from "../store";

// progress bar
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: false });

store.commit("checkRole");

router.beforeEach((to, from, next) => {
  
    NProgress.start(); // start progress bar
    next();
    
});

router.afterEach((to, from) => {
    NProgress.done();
});
