<template>
    <div class="user-login">
        <div>
            <!--手机号-->
            <div class="input-item input-phone">
                <div class="box-icon border-radius-left">
                    <i class="icon icon-phone"></i>
                </div>
                <input
                    type="text"
                    placeholder="请输入账号"
                    class="input border-radius-right"
                    maxlength="20"
                    key="login-phone"
                    :class="error.phone ? 'error' : ''"
                    v-model="login.phone"
                    @blur="checkPhone"
                />
            </div>
            <!--密码-->
            <div class="input-item input-phone">
                <div class="box-icon border-radius-left">
                    <i class="icon input-pass"></i>
                </div>
                <input
                    type="password"
                    placeholder="请输入登录密码"
                    class="input border-radius-right"
                    maxlength="32"
                    key="login-password"
                    :class="error.password ? 'error' : ''"
                    v-model="login.password"
                    @blur="checkPassword"
                />
            </div>

            <div class="btn-login input-item">
                <router-link class="info" tag="div" to="/account/forget"
                    >忘记密码？</router-link
                >
                <div class="btn-code btn-res" @click="loginBtn">登录</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { ElLoading } from "element-plus";
import Bus from "../../events/bus";
import { setUserToken, setUserInfo, setUserRole } from "../../utils/cookie";
import { useRouter, Router } from "vue-router";
import { useStore } from "../../store";
import { Store } from "vuex";
import { State } from "@/store";
export default defineComponent({
    name: "login",
    setup() {
        const router: Router = useRouter();
        const store: Store<State> = useStore();
        const state = reactive({
            login: {
                phone: "",
                password: "",
                code: "",
                setKey: "",
                imgSrc: "",
                seKey: ""
            },
            error: {
                phone: false,
                password: false,
                code: false
            },
            authorize: {}
        });

        //手机号检查
        function checkPhone() {
            const reg = /^1\d{10}$/;
            const phone: string = state.login.phone;

            if (!phone) {
                Bus.emit("showError", "请输入账号");
                state.error.phone = true;
                return false;
            }

            if (reg.test(phone)) {
                state.error.phone = false;
                return true;
            } else {
                Bus.emit("showError", "手机号格式错误");
                state.error.phone = true;
                return false;
            }
        }
        //检查密码
        function checkPassword() {
            if (!checkPhone()) {
                return;
            }
            const passWord: string = state.login.password;
            if (passWord.length >= 6 && passWord.length <= 24) {
                state.error.password = false;
                return true;
            } else {
                Bus.emit("showError", "请输入6-24位密码");
                state.error.password = true;
                return false;
            }
        }

        //登录
        function loginBtn() {
            if (checkPhone() && checkPassword()) {
                // const params: { name: string; password: string } = {
                //     name: state.login.phone,
                //     password: state.login.password
                // };

                const loadingInstance = ElLoading.service({
                    fullscreen: true,
                    text: "登录中"
                });
                setTimeout(() => {
                    loadingInstance.close();

                    setUserRole(["master"]);
                    setUserToken("123456abc");
                    setUserInfo({
                        name: "悠然",
                        nickname: "悠然"
                    });
                    console.log(store, "store");
                    store.commit("checkRole");
                    //跳转到首页
                    router.push("/index");
                }, 1000);

                // login(params).then(res => {
                //     loadingInstance.close();

                //     if (res.error === 0) {
                //         //登录成功
                //         //令牌
                //         const info = res.data.authorize;
                //         setUserToken(info.token);
                //         setUserInfo({
                //             name: res.data.name,
                //             nickname: res.data.nickname
                //         });

                //         //跳转到首页
                //         router.push("/index");
                //     }
                // });
            }
        }

        return { ...toRefs(state), checkPhone, checkPassword, loginBtn };
    }
});
</script>

<style scoped>
.user-login {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
}

.input-item {
    width: 322px;
    height: 46px;
    border-radius: 4px;
    display: flex;
    margin-bottom: 20px;
    position: relative;
}

.input-item .box-icon {
    width: 46px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #f3f3f3;
    position: absolute;
    left: 1px;
    top: 1px;
}

.input-item .box-icon .icon {
    display: block;
    width: 20px;
    height: 20px;
}

.input-item .box-icon .icon-phone {
    background: url(https://static.ledouya.com/Fh9PEsPzma6Lq7YH5e0BfOn79Ymu)
        center no-repeat;
}

.input-item .box-icon .input-pass {
    background: url(https://static.ledouya.com/FjvwvlK8oVd0p0_8xpK12O8yFqJY?imageMogr2/auto-orient)
        center no-repeat;
}

.input-item .input {
    width: 277px;
    border: 1px solid #e4e7ed;
    outline: 0;
    padding-left: 54px;
}

.input-item .input:focus {
    border: 1px solid #3794ff;
}

.input-item .input.error {
    border: 1px solid #ff797a;
}

.input-item .input-code {
    width: 202px;
    padding-left: 8px;
}

.input-item .btn-code {
    width: 120px;
    height: 100%;
    line-height: 44px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    background: #3794ff;
    cursor: pointer;
    right: 0px;
    top: 0px;
}

.input-item .img-code {
    background: #fff;
}

.img-code-detail {
    height: 100%;
    display: block;
}

.btn-login {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-login .info {
    font-size: 16px;
    color: #cacaca;
    cursor: pointer;
}

.btn-login .info:hover {
    color: #3794ff;
}

.input-item .btn-res {
    width: 120px;
    border-radius: 2px;
}

:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #cacaca;
}

::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #cacaca;
}

input:-ms-input-placeholder {
    color: #cacaca;
}

input::-webkit-input-placeholder {
    color: #cacaca;
}

/*小屏优化*/
@media only screen and (max-width: 1500px) {
    .input-item {
        height: 40px;
        width: 281px;
    }

    .input-item .box-icon {
        width: 38px;
        height: 38px;
    }

    .input-item .btn-code {
        line-height: 38px;
    }

    .input-item .input-code {
        width: 161px;
    }
}
</style>
