<template>
    <div
        class="app-third-sidebar"
        :class="{ 'no-item': !breadcrumbData && !thirdRouteData }"
    >
        <div class="nav-bar">
            <div v-if="breadcrumbData" class="router-box">
                <router-link :to="breadcrumbData.thirdPath">{{
                    breadcrumbData.thirdTitle
                }}</router-link>
                <span class="router-to"> > </span>
                <router-link :to="breadcrumbData.fourthPath">{{
                    breadcrumbData.fourthTitle
                }}</router-link>
            </div>

            <ul
                class="el-menu"
                v-else-if="
                    $store.getters.thirdRouters &&
                        $store.getters.thirdRouters[baseUrl]
                "
            >
                <template
                    v-for="(item, index) in $store.getters.thirdRouters[
                        baseUrl
                    ]"
                    :key="index"
                >
                    <li
                        class="el-menu-item nav-item"
                        :class="{
                            'is-active':
                                currentUrl.indexOf(baseUrl + '/' + item.index) >
                                -1,
                            'no-auth': item.noAuth
                        }"
                        @click="handleSelect(item)"
                    >
                        <span>{{ item.title }}</span>
                    </li>
                </template>
            </ul>
            <div
                v-else
                class="default-nav row-flex row-flex-start row-flex-middle"
                :class="pathArr.length === 2 && 'ml'"
            >
                <span class="site-name">{{ siteTitle }}</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { RouteLocationNormalized } from "vue-router";
import { RouteMenuType } from "@/router/AppRouters";

export default {
    data() {
        return {
            baseUrl: "",
            currentUrl: "",
            pathArr: [],
            siteTitle: "大王叫我来巡山", //店铺名称
            breadcrumbData: null,
            thirdRouteData: null
        };
    },
    computed: {},
    watch: {
        $route(val: RouteLocationNormalized) {
            this.toggleRouter(val);
            this.updateMenu();
        }
    },
    methods: {
        toggleRouter(val: RouteLocationNormalized) {
            const pathArr: string[] = val.path.slice(1).split("/");
            const secondRoutePath: string = "/" + pathArr[0] + "/" + pathArr[1];

            this.thirdRouteData =
                this.$store.getters.thirdRouters[secondRoutePath] || null;
            this.pathArr = pathArr;
            if (!this.thirdRouteData) return (this.breadcrumbData = null);

            for (const item in this.thirdRouteData[0]) {
                if (item === pathArr[2]) {
                    this.breadcrumbData = {
                        thirdTitle: this.thirdRouteData[0].title,
                        thirdPath:
                            secondRoutePath +
                            "/" +
                            this.thirdRouteData[0].index,
                        fourthTitle: this.thirdRouteData[0][item],
                        fourthPath: secondRoutePath + "/" + item
                    };
                    return;
                }
                this.breadcrumbData = null;
            }
        },
        handleSelect(item: RouteMenuType) {
            if (item.noAuth) {
                this.$message.error("您暂无该页面访问权限，请联系管理员");
                return;
            }

            this.$router.push(this.baseUrl + "/" + item.index);
        },
        updateMenu() {
            const routeArray: string[] = this.$route.fullPath.split("/");

            this.currentUrl = this.$route.fullPath;
            this.baseUrl = "/" + routeArray[1] + "/" + routeArray[2];
        }
    },
    created() {
        this.updateMenu();
        this.toggleRouter(this.$route);
    }
};
</script>

<style lang="scss" scoped>
/*三级路由*/
.app-third-sidebar {
    position: fixed;
    top: 0;
    left: 250px;
    right: 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    background: #fff;
    opacity: 1;
    transition: all 0.28s;
    z-index: 9;
    user-select: none;
    -webkit-user-select: none;

    &.no-item {
        left: 130px;
        padding-left: 20px;
    }

    .nav-bar {
        flex: 1;
        position: relative;

        .router-box {
            display: flex;
            align-items: center;
            padding: 0 20px;
            font-size: 14px;
            cursor: pointer;
            a {
                color: #3d8eff;
            }
        }

        .el-menu {
            display: flex;
            align-items: center;
            border: none;

            .el-menu-item {
                height: 50px;
                color: #333;
                line-height: 50px;
                padding: 0 10px;
                margin: 0 15px;

                &:hover {
                    background: #fff;
                    color: #3d8eff;
                }
                &.is-active {
                    color: #3d8eff;
                    border-bottom: 2px solid #3d8eff;
                }
            }
        }
    }

    .default-nav {
        height: 50px;
        &.ml {
            margin-left: 120px;
        }
    }

    .no-auth {
        opacity: 0.4;
    }
}
</style>
