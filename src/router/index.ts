import routesConfig from "./routes";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = routesConfig;

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
