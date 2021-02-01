<template>
    <div
        class="app-third-sidebar"
        :class="{ 'no-item': routerList && !routerList.length }"
    >
        <div class="nav-bar">
            <div v-if="rourterData" class="router-box">
                <router-link :to="rourterData.thirdPath">{{
                    rourterData.thirdTitle
                }}</router-link>
                <span class="router-to"> > </span>
                <router-link :to="rourterData.fourthPath">{{
                    rourterData.fourthTitle
                }}</router-link>
            </div>

            <ul
                class="el-menu"
                v-else-if="thirdRouters && thirdRouters[baseUrl]"
            >
                <template
                    v-for="(item, index) in thirdRouters[baseUrl]"
                    :key="index"
                >
                    <li
                        class="el-menu-item nav-item"
                        :class="{
                            'is-active':
                                currentUrl.indexOf(baseUrl + '/' + item.index) >
                                    -1 ||
                                currentUrl.indexOf('/market/marketing') > -1,
                            'no-auth': item.noAuth
                        }"
                        :data-link="item.index"
                        @click="handleSelect($event, item)"
                    >
                        <span>{{ item.title }}</span>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            baseUrl: "",
            currentUrl: "",
            routerList: [],
            storeName: "", //店铺名称
            rourterData: false
        };
    },
    computed: {
        ...mapGetters(["secondRouters", "thirdRouters"]),
        menuList() {
            return this.thirdRouters[this.baseUrl];
        }
    },
    watch: {
        $route(val) {
            console.log(val, "val");
            this.toggoleRouter(val);
            this.updateMenu();
        }
    },
    methods: {
        toggoleRouter(val) {
            const thirdRouters = this.thirdRouters;
            const pathArr = val.path.slice(1).split("/");
            const secondRouter = "/" + pathArr[0] + "/" + pathArr[1];
            let thirdData = null;
            for (const key in thirdRouters) {
                if (key == secondRouter) thirdData = thirdRouters[key];
            }
            if (thirdData) {
                for (const item in thirdData[0]) {
                    if (item == pathArr[2]) {
                        this.rourterData = {
                            thirdTitle: thirdData[0].title,
                            thirdPath: secondRouter + "/" + thirdData[0].index,
                            fourthTitle: thirdData[0][item],
                            fourthPath: secondRouter + "/" + item
                        };
                        return;
                    }
                    this.rourterData = false;
                }
            } else {
                this.rourterData = false;
            }
        },
        handleSelect(e, item) {
            if (item.noAuth) {
                this.$message.error("您暂无该页面访问权限，请联系管理员");
                return;
            }
            const target = e.currentTarget,
                link = target.dataset.link;
            this.clearActiveItems();
            target.classList.add("is-active");
            this.$router.push(this.baseUrl + "/" + link);
        },
        updateMenu() {
            const routeArray = this.$route.fullPath.split("/");
            this.currentUrl = this.$route.fullPath;
            this.baseUrl = "/" + routeArray[1] + "/" + routeArray[2];
            this.routerList = this.secondRouters[routeArray[1]];
        },
        clearActiveItems() {
            const customItems = document.querySelectorAll(".nav-item");
            //循环清空选中
            for (let i = 0; i < customItems.length; i++)
                customItems[i].classList.remove("is-active");
        }
    },
    created() {
        this.updateMenu();
        this.toggoleRouter(this.$route);
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
    transition: all 0.28s;
    z-index: 9;
    user-select: none;
    -webkit-user-select: none;

    .no-item {
        left: 120px;
    }

    .el-menu {
        display: flex;
        align-items: center;
        border: none;

        & > li {
            height: 50px;
            color: #333;
            line-height: 50px;
            padding: 0 10px;
            margin: 0 15px;
            &:hover {
                background: #fff !important;
                color: #3d8eff !important;
                transition: all 0s;
            }
            &.is-active {
                color: #3d8eff !important;
                border-bottom: 2px solid #3d8eff !important;
            }
        }
    }
    .no-auth {
    opacity: 0.4 !important;
}
}

.app-wrapper
    .app-third-sidebar
    .app-wrapper
    .app-third-sidebar
    li
    .app-wrapper
    .app-third-sidebar
    li
    .app-wrapper
    

.app-wrapper .no-auth.iconfont {
    color: #90939969;
}
.nav-bar {
    flex: 1;
    position: relative;
}

.nav-bar .active-title {
    height: 50px;
    color: #3d8eff;
    line-height: 50px;
    padding: 0 10px;
    margin: 0 15px;
    opacity: 1;
    font-size: 16px;
    transition: all 0.28s;
}

.active-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.router-box {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 14px;
    cursor: pointer;
}

.router-to {
    margin: 0 8px;
    color: #999;
}

.router-box > a {
    color: #3d8eff;
}


</style>
