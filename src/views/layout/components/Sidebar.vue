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
                <img class=" logo" src="../../../assets/logo.jpg" alt="" />
                <template
                    v-for="(item, index) in $store.state.firstRouters.subMenu"
                    :key="index"
                >
                    <el-menu-item :index="item.index">
                        <i
                            class="iconfont iconfont-active"
                            :class="
                                item.noAuth
                                    ? `${item.icon} no-auth`
                                    : `${item.icon}`
                            "
                            v-if="activeIndex == item.index"
                        ></i>
                        <i
                            class="iconfont"
                            :class="
                                item.noAuth
                                    ? `${item.icon} no-auth`
                                    : `${item.icon}`
                            "
                            v-else
                        ></i>
                        <span :class="{ 'no-auth': item.noAuth }">{{
                            item.title
                        }}</span>
                    </el-menu-item>
                </template>

                <!--bot-->
                <div class="bot-menu">
                    <template
                        v-for="(item, index) in $store.state.firstRouters
                            .supMenu"
                        :key="index"
                    >
                        <el-menu-item :index="item.index">
                            <i
                                class="iconfont iconfont-active"
                                :class="
                                    item.noAuth
                                        ? `${item.icon} no-auth`
                                        : `${item.icon}`
                                "
                                v-if="activeIndex == item.index"
                            ></i>
                            <i
                                class="iconfont"
                                :class="
                                    item.noAuth
                                        ? `${item.icon} no-auth`
                                        : `${item.icon}`
                                "
                                v-else
                            ></i>
                            <span :class="{ 'no-auth': item.noAuth }">{{
                                item.title
                            }}</span>
                        </el-menu-item>
                    </template>
                </div>
            </el-menu>
        </div>
        <!--二级-->
        <div
            class="app-second-sidebar"
            :class="{ 'no-item': routerList && !routerList.length }"
        >
            <div class="menu-title">{{ activeTitle }}</div>
            <ul class="el-menu">
                <template v-for="(item, index) in routerList" :key="index">
                    <li
                        class="el-menu-item custom-item"
                        :data-link="`/${activeIndex}/${item.index}`"
                        :class="{
                            'is-active':
                                currentUrl == `/${activeIndex}/${item.index}`,
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

<script>
import { mapGetters } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            // active index
            activeIndex: "index",
            currentUrl: ""
        };
    },
    watch: {
        $route() {
            this.updateMenu();
        }
    },
    computed: {
        ...mapGetters([
            "name",
            "firstRouters",
            "secondRouters",
            "thirdRouters"
        ]),
        activeTitle() {
            const filterMenu = this.$store.state.firstRouters.subMenu.filter(
                item => item.index == this.activeIndex
            );
            //确认标题
            if (filterMenu.length > 0) return filterMenu[0].title;
            else
                return this.$store.state.firstRouters.supMenu.filter(
                    item => item.index == this.activeIndex
                )[0].title;
        },
        routerList() {
            console.log(this.$store.state.firstRouters.subMenu);
            return this.$store.state.secondRouters[this.activeIndex];
        },
        platform() {
            return this.$store.getters.platform;
        }
    },
    methods: {
        handleSelect(index) {
            let itemPath = {};

            for (const key in this.$store.state.firstRouters) {
                const res = this.$store.state.firstRouters[key].find(
                    item => item.index == index
                );
                if (res) {
                    itemPath = res;
                    break;
                }
            }

            if (itemPath.noAuth) {
                this.$message.error("您暂无该页面访问权限，请联系管理员");
                return;
            }

            this.activeIndex = index;
            if (index != "index") {
                setTimeout(() => {
                    const item = document.querySelector(".custom-item");
                    const secondIndex = this.$store.state.secondRouters[
                        index
                    ].findIndex(
                        item => !item.disabled && item.noAuth === false
                    );

                    item &&
                        this.$router.push(
                            "/" +
                                index +
                                "/" +
                                this.$store.state.secondRouters[index][
                                    secondIndex
                                ].index
                        );
                }, 0);
            } else {
                this.$router.push("/");
            }
        },
        toLink(e, item) {
            if (item.noAuth) {
                this.$message.error("您暂无该页面访问权限，请联系管理员");
                return;
            }
            const target = e.currentTarget;
            const link = target.dataset.link;
            if (target.classList.contains("disabled")) return false;
            this.clearActiveItems();
            target.classList.add("is-active");

            const third = "/" + this.activeIndex + "/" + item.index;
            const thirdIndex = this.thirdRouters[third].findIndex(
                item => item.noAuth === false
            );

            this.$router.push(
                third + "/" + this.thirdRouters[third][thirdIndex].index
            );
        },
        clearActiveItems() {
            const customItems = document.querySelectorAll(".custom-item");
            //循环清空选中
            for (let i = 0; i < customItems.length; i++)
                customItems[i].classList.remove("is-active");
        },
        updateMenu() {
            const routerArray = this.$route.fullPath.split("/");
            this.activeIndex = routerArray[1];
            this.currentUrl = "/" + routerArray[1] + "/" + routerArray[2];
        }
        // command(event) {
        //     switch (event) {
        //         case "logout":
        //             clearCookie();
        //             window.location.href =
        //                 this.$store.state.domainURL + "shoplist";
        //             break;
        //         case "modify":
        //             window.location.href =
        //                 this.$store.state.domainURL + "update";
        //             // this.$router.push('/setting/user/password');
        //             break;
        //         case "logoutAdmin":
        //             logoutClearCookie();

        //             // return
        //             window.location.href =
        //                 this.$store.state.domainURL + "account/login";
        //             break;
        //     }
        // }
    },
    mounted() {
        // console.log(store.state.domainURL);
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
            z-index: 10;
            white-space: nowrap;
            overflow: hidden;
            text-align: center;
        }

        .el-menu {
            padding: 12px 10px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-right: none;
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
    }
}
</style>
