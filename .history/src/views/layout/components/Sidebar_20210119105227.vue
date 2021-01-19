<template>
    <div class="sidebar-container">
        <div class="head-box">
            <img class="logo" src="@/assets/firefly.jpg" alt="" />
        </div>
        <div class="menu-box">
            <el-menu
                :uniqueOpened="true"
                :default-active="!menuList[0].children ? menuList[0].alias: menuList[0].children[0].alias"
                class="el-menu-vertical"
                :router="true"
                @select="handleSelect"
                background-color="#273543"
                text-color="#fff"
                active-text-color="#3d8eff"
            >
                <template v-for="item in menuList">
                    <el-submenu
                        v-if="item.children"
                        :index="item.path"
                        :key="item.alias"
                    >
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <el-menu-item
                            v-for="(it, idx) in item.children"
                            :index="`${item.path}/${it.path}`"
                            :key="idx"
                            >{{ it.title }}</el-menu-item
                        >
                    </el-submenu>
                    <el-menu-item v-else :index="item.path" :key="item.alias">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watchEffect } from "vue";

export default defineComponent({
    name: "Sidebar",
    setup(props) {
        const data = reactive({
            menuList: [
                {
                    title: "数据概览",
                    icon: "el-icon-monitor",
                    alias: "index",
                    path: "index"
                },
                {
                    title: "用户行为",
                    icon: "el-icon-table-lamp",
                    alias: "behavior",
                    path: "behavior",
                    children: [
                        {
                            title: "菜单点击量",
                            alias: "menuHits",
                            path: "menuHits"
                        },
                        {
                            title: "用户在线时长",
                            alias: "onlineTime",
                            path: "onlineTime"
                        },
                        {
                            title: "新增用户数据",
                            alias: "newUsers",
                            path: "newUsers"
                        }
                    ]
                },
                {
                    title: "异常监控",
                    icon: "el-icon-stopwatch",
                    alias: "abnormalMonitor",
                    children: [
                        {
                            title: "页面性能",
                            alias: "performance",
                            path: "performance"
                        },
                        {
                            title: "错误看板",
                            alias: "errorDashboard",
                            path: "errorDashboard"
                        }
                    ]
                },
                {
                    title: "报警",
                    icon: "el-icon-sunrise",
                    alias: "alarm",
                    path: "alarm",
                    children: [
                        {
                            title: "配置",
                            alias: "alarmConfig",
                            path: "alarmConfig"
                        },
                        {
                            title: "错误看板",
                            alias: "alarmLog",
                            path: "alarmLog"
                        }
                    ]
                },
                {
                    title: "成员管理",
                    icon: "el-icon-orange",
                    alias: "userManage",
                    path: "userManage"
                }
            ]
        });
        function handleSelect(key: any, keyPath: any) {
            console.log(key, keyPath);
        }
        return {
            menuList: data.menuList,
            handleSelect
        };
    }
});
</script>

<style lang="scss">
.sidebar-container {
    @include size(200px, 100%);
    background-color: $theme-bg;
    .head-box {
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
    }
    .menu-box {
       
    }
}
</style>
