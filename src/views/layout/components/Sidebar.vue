<template>
    <div class="sidebar-container row-flex row-flex-start row-flex-middle">
        <!--一级-->
        <div class="app-first-sidebar">
            <!--top-->
            <el-menu
                mode="vertical"
                :defaultActive="activeIndex"
                background-color="#273543"
                text-color="#adbece"
                active-text-color="#fff"
                @select="handleSelect"
            >
                <img class="logo" src="../../../assets/logo.jpg" alt="" />
                <template
                    v-for="(item, index) in $store.getters.firstRouters.subMenu"
                    :key="index"
                >
                    <el-menu-item :index="item.index" :disabled="item.noAuth">
                        <i
                            class="iconfont"
                            :class="[
                                `${item.icon}`,
                                activeIndex === item.index && 'iconfont-active'
                            ]"
                        ></i>
                        <span>{{ item.title }}</span>
                    </el-menu-item>
                </template>

                <!--bot-->
                <div class="bot-menu">
                    <template
                        v-for="(item, index) in $store.getters.firstRouters.supMenu"
                        :key="index"
                    >
                        <el-menu-item
                            :index="item.index"
                            :disabled="item.noAuth"
                        >
                            <i
                                class="iconfont"
                                :class="[
                                    `${item.icon}`,
                                    activeIndex === item.index &&
                                        'iconfont-active'
                                ]"
                            ></i>
                            <span>{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </div>
            </el-menu>
            <!--登录信息-->
            <el-dropdown
                class="login-box"
                placement="top"
                size="medium"
                @command="handleCommand"
            >
                <div class="user-name">{{ username }}</div>
                <template #dropdown>
                    <el-dropdown-menu size="medium">
                        <el-dropdown-item style="font-size: 12px">{{
                            username
                        }}</el-dropdown-item>
                        <el-dropdown-item
                            command="modify"
                            :divided="true"
                            style="font-size: 12px"
                            >修改密码</el-dropdown-item
                        >
                        <el-dropdown-item
                            command="logout"
                            style="font-size: 12px"
                            >退出登录</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!--二级-->
        <div class="app-second-sidebar" :class="{ 'no-item': !routerList }">
            <div class="menu-title">{{ activeTitle }}</div>
            <ul class="el-menu">
                <template v-if="routerList">
                    <li
                        v-for="(item, index) in routerList"
                        :key="index"
                        class="el-menu-item"
                        :class="{
                            'is-active':
                                currentUrl === `/${activeIndex}/${item.index}`,
                            'is-divide': item.divide,
                            disabled: item.disabled,
                            'no-auth': item.noAuth
                        }"
                        @click="toLink($event, item)"
                    >
                        <span class="second-title">{{ item.title }}</span>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { getUserInfo } from "../../../utils/cookie";
import { RoutesType, RouteMenuType } from "@/router/AppRouters";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            activeIndex: "index",
            currentUrl: "",
            username: "test",
            disabled: true
        };
    },
    watch: {
        $route() {
            this.updateMenu();
        }
    },
    computed: {
        activeTitle(): string {
            const filterMenu: Array<RouteMenuType> = this.$store.getters.firstRouters.subMenu.filter(
                (item: RouteMenuType) => item.index === this.activeIndex
            );
            //确认标题
            if (filterMenu.length > 0) {
                return filterMenu[0].title;
            } else {
                return this.$store.getters.firstRouters.supMenu.filter(
                    (item: RouteMenuType) => item.index == this.activeIndex
                )[0].title;
            }
        },
        routerList(): Array<RouteMenuType> {
            return this.$store.getters.secondRouters[this.activeIndex];
        }
    },
    methods: {
        handleSelect(index: string) {
            let itemPath: RouteMenuType;
            const firstRouters: RoutesType = this.$store.getters.firstRouters;
            const secondRouters: RoutesType = this.$store.getters.secondRouters;
            const thirdRouters: RoutesType = this.$store.getters.thirdRouters;

            for (const key in firstRouters) {
                const res: RouteMenuType = firstRouters[key].find(
                    item => item.index === index
                );
                if (res) {
                    itemPath = { ...res };
                    break;
                }
            }

            if (itemPath.noAuth) {
                this.$message.error("您暂无该页面访问权限，请联系管理员");
                return;
            }
            this.activeIndex = index;

            //只有一级菜单
            if (!secondRouters[index]) {
                return this.$router.push(`/${index}`);
            }

            //只有两级菜单
            const secondIndex: number = secondRouters[index].findIndex(
                item => !item.disabled && !item.noAuth
            );

            if (
                !thirdRouters[
                    `/${index}/${secondRouters[index][secondIndex].index}`
                ]
            ) {
                return this.$router.push(`/${index}`);
            }

            //三级菜单
            this.$router.push(
                `/${index}/${secondRouters[index][secondIndex].index}`
            );
        },
        toLink(e: any, item: RouteMenuType) {
            const thirdRouters: RoutesType = this.$store.getters.thirdRouters;
            if (item.noAuth) {
                this.$message.error("您暂无该页面访问权限，请联系管理员");
                return;
            }
            const target = e.currentTarget;
            if (target.classList.contains("disabled")) return false;

            const secondRoutePath: string =
                "/" + this.activeIndex + "/" + item.index;
            if (!thirdRouters[secondRoutePath]) {
                return this.$router.push(`${secondRoutePath}`);
            }
            const thirdIndex: number = thirdRouters[secondRoutePath].findIndex(
                item => !item.noAuth
            );

            this.$router.push(
                secondRoutePath +
                    "/" +
                    thirdRouters[secondRoutePath][thirdIndex].index
            );
        },
        updateMenu() {
            const routerArray: string[] = this.$route.fullPath.split("/");
            this.activeIndex = routerArray[1];
            this.currentUrl = "/" + routerArray[1] + "/" + routerArray[2];
        },

        handleCommand(event: string) {
            switch (event) {
                case "modify":
                    this.$router.replace('/account/forget')
                    break;
                case "logout":
                     this.$router.replace('/account/login')
                    break;
                default:
                    break;
            }
        }
    },
    mounted() {
       this.username = getUserInfo().name || 'test'
    },
    created() {
        this.updateMenu();
    }
});
</script>

<style lang="scss">
.sidebar-container {
    height: 100%;

    .logo {
        @include size(50px, 50px);
        margin: 15px auto;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
            transform: rotate(360deg);
            transition: all 0.6s ease-in-out;
        }
    }

    /*一级菜单*/
    .app-first-sidebar {
        position: relative;
        height: 100%;
        overflow: auto;
        z-index: 9;

        .el-menu {
            height: 100%;
            width: 130px;
            border-right: none;
            overflow: auto;
        }

        li {
            font-size: 14px;
            height: 40px;
            line-height: 40px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;

            &.is-active {
                background: #3d8eff !important;
                color: #fff !important;
            }
            &:hover {
                background: #434e6c;
                color: #fff;
            }
            > span {
                margin-left: 4px;
            }
        }

        .bot-menu {
            margin-top: 50px;
        }
    }

    /*二级菜单*/
    .app-second-sidebar {
        width: 120px;
        height: 100%;
        transition: all 0.28s;
        overflow: hidden;

        &.no-item {
            width: 0;
            .menu-title {
                opacity: 0;
            }
        }

        .menu-title {
            color: #999;
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            border-bottom: 1px solid #f2f2f2;
            border-right: 1px solid #f2f2f2;
            position: relative;
            background-color: #fff;
            z-index: 10;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
        }

        .el-menu {
            padding: 12px 10px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            overflow: auto;
            height: calc(100% - 50px);
            height: -webkit-calc(100% - 50px);

            > li {
                height: 30px;
                line-height: 30px;
                font-size: 14px;
                padding: 0 10px;
                color: #666;
                display: block;
                cursor: pointer;
                margin-bottom: 10px;
                overflow: hidden;

                &:hover {
                    background: #ebf3ff;
                }

                &.is-active {
                    background: #ebf3ff;
                    color: #3d8eff;
                }

                &.disabled {
                    color: #ccc;
                    font-size: 13px;
                    position: relative;
                    height: 35px;
                    cursor: default;

                    &:first-child {
                        margin-top: 0;
                    }

                    &:hover {
                        background: transparent;
                    }

                    &:after {
                        content: "";
                        position: absolute;
                        height: 1px;
                        left: 0;
                        right: 0;
                        background: #f2f2f2;
                        bottom: 0;
                    }

                    .is-divide {
                        margin-top: 25px;
                    }
                }

                .second-title {
                    width: 100%;
                    display: block;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                }
            }
        }

        .no-auth {
            opacity: 0.4;
        }
    }

    .login-box {
        position: fixed;
        left: 0;
        bottom: 15px;
        color: #e5e5e5;
        padding: 10px 0;
        width: 130px;
        word-break: break-all;
        background: rgba(0, 0, 0, 0.6);
        z-index: 100;
        cursor: pointer;

        .user-name {
            width: 100%;
            display: block;
            font-size: 12px;
            line-height: 30px;
            padding: 0 12px;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}
</style>
