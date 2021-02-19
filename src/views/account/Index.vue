<template>
    <div class="account-box">
        <!-- 环形动画 -->
        <div class="circle">
            <div class="path1">
                <div class="item1"></div>
            </div>
            <div class="border1"></div>
            <div class="path2">
                <div class="item2"></div>
            </div>
            <div class="border2"></div>
        </div>
        <div class="content">
            <div class="left">
                <div class="content-header" v-if="!data.forget">
                    <div class="login">{{ data.mainTitle }}</div>
                    <div class="register" @click="toggle">
                        {{ data.subTitle }}
                    </div>
                </div>
                <div class="forget" v-if="data.forget">
                    <div class="content-header">
                        <div class="login">忘记密码</div>
                    </div>
                    <router-link tag="div" to="/account/login" class="goback">
                        <i class="icon back"></i>
                        返回登录</router-link
                    >
                </div>

                <div class="err-info" :class="data.isError ? 'error-show' : ''">
                    {{ data.errorInfo }}
                </div>
                <div class="substance">
                    <router-view></router-view>
                </div>
            </div>
            <div class="right">
                <Carousel></Carousel>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Bus from '../../events/bus'
import Carousel from "./components/Carousel";

import { toRefs,defineComponent, onMounted, onUnmounted, reactive, watchEffect } from "vue";
import { useRouter, useRoute,Router,RouteLocationNormalizedLoaded } from "vue-router";

export default defineComponent({
    name: 'account',
    components: {
        Carousel
    },
    setup() {
        const router: Router = useRouter();
        const route: RouteLocationNormalizedLoaded = useRoute();

        const state = reactive({
            toggleClass: false,
            isError: false,
            showError: "",
            errorInfo: "",
            mainTitle: "",
            subTitle: "",
            toPath: "",
            forget: false,
            account: false
        });

        function toggle() {
            router.push(state.toPath);
        }
        function showErrorInfo(info: string) {
            state.isError = true;
            state.errorInfo = info;
            setTimeout(() => {
                state.isError = false;
            }, 1000);
        }
        watchEffect(() => {
            const path = route.path;

            if (path.indexOf("login") !== -1) {
                state.mainTitle = "登录";
                state.subTitle = "注册";
                state.toPath = "/account/register";
                state.forget = false;
            } else if (path.indexOf("register") !== -1) {
                state.mainTitle = "注册";
                state.subTitle = "登录";
                state.toPath = "/account/login";
                state.forget = false;
            } else if (path.indexOf("forget") !== -1) {
                state.forget = true;
            }
        });
        onMounted(()=>{
            Bus.on('showError',(msg: string)=> {
                showErrorInfo(msg)
            })
        })
        onUnmounted(()=> {
            Bus.off('showError',()=>({}))
        })

        return {
            ...toRefs(state),
            toggle
        };
    }
});
</script>

<style lang="scss" scoped>
.account-box {
    height: 100vh;
    background: #f5f6fc;
    position: relative;

    .circle {
        position: absolute;
        background: #f5f6fc;
        width: 620px;
        height: 620px;
        top: -193px;
        left: -258px;
        z-index: 1;

        .content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            background: #fff;
            display: flex;
            justify-content: space-between;
            border-radius: 5px;
            overflow: hidden;

            .left {
                width: 400px;
                flex: 1;
                padding: 39px;
                position: relative;

                .err-info {
                    position: absolute;
                    top: 100px;
                    color: #3794ff;
                    font-size: 14px;
                    display: none;

                    &.error-show {
                        display: block;
                        color: #ff797a;
                    }
                    &.error-ok {
                        color: #3794ff;
                    }
                }
            }
            .right {
                width: 700px;
            }

            .content-header {
                display: flex;
                align-items: flex-end;
                align-items: center;
                width: 100px;
                justify-content: space-between;
                cursor: pointer;
                user-select: none;
            }

            .goback {
                color: #cacaca;
                font-size: 14px;
                display: flex;
                align-items: center;

                &:hover {
                    color: #3794ff;
                }
            }
        }
    }

    .icon.back {
        width: 10px;
        height: 10px;
        display: block;
        background: url(https://static.ledouya.com/FjALv90NOH8bngQvkR37se6DDu4q)
            no-repeat;
    }
    .forget .goback:hover .back {
        background: url(https://static.ledouya.com/Fr5rH308tBonyGrpxY8lR-UUO428)
            no-repeat;
    }

    .content-header .login {
        font-size: 24px;
        color: #3794ff;
        border-bottom: 2px solid #3794ff;
        padding-bottom: 5px;
    }

    .content-header .register {
        font-size: 18px;
        color: #aaa;
        padding-bottom: 5px;
    }

    /*下划线*/
    .under-line {
        margin-top: 5px;
        width: 48px;
        height: 2px;
        background: #3794ff;
    }

    .under-line:hover {
        animation: under-change 1.5s linear;
    }

    /*下划线动画*/
    @keyframes under-change {
        to,
        from {
            width: 48px;
        }
        50% {
            width: 0;
        }
    }

    .substance {
        /*border: 1px solid red;*/
        height: 495px;
        position: relative;
    }

    /*环形动画*/
    .path1 {
        width: 620px;
        height: 620px;
        border-radius: 50%;
        text-align: center;
    }
    .path1 .item1 {
        width: 32px;
        height: 32px;
        box-sizing: border-box;
        background: #fff;
        border: 10px solid #ffdb8d;
        border-radius: 50%;
        animation: spin 15s infinite linear;
        transform-origin: 50% 310px;
        display: inline-block;
    }
    .border1 {
        width: 584px;
        height: 584px;
        border-radius: 50%;
        border: 2px solid #eee;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: -1;
    }
    .path2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 410px;
        height: 410px;
        border-radius: 50%;
        text-align: center;
    }
    .path2 .item2 {
        width: 28px;
        height: 28px;
        background: #fff;
        border: 8px solid #8dc2ff;
        box-sizing: border-box;
        border-radius: 50%;
        animation: spin 12s infinite linear;
        transform-origin: 50% 205px;
        display: inline-block;
    }
    .border2 {
        width: 380px;
        height: 380px;
        border-radius: 50%;
        border: 2px solid #eee;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: -1;
    }
    @keyframes spin {
        to {
            transform: rotate(1turn);
        }
    }

    /*小屏优化*/
    @media only screen and (max-width: 1500px) {
        .account-box {
            width: 884px;
            height: 440px;
        }

        .left {
            width: 370px;
            padding: 17px 39px;
        }

        .right {
            width: 514px;
        }

        .substance {
            height: 375px;
        }

        .content-header .login {
            font-size: 22px;
        }

        .content-header .register {
            font-size: 16px;
        }

        .left .err-info {
            top: 50px;
            font-size: 12px;
        }

        .forget {
            width: 281px;
        }
    }
}
</style>
