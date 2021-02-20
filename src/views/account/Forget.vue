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
                    placeholder="请输入手机号"
                    key="forget-phone"
                    class="input border-radius-right"
                    :class="error.phone ? 'error' : ''"
                    v-model="forget.phone"
                    @blur="checkPhone"
                />
            </div>

            <!--手机验证码-->
            <div
                class="input-item input-phone "
                :class="error.phone ? 'error' : ''"
            >
                <input
                    type="text"
                    placeholder="请输入短信验证码"
                    key="forget-code"
                    class="input input-code border-radius-left"
                    v-model="forget.code"
                    :class="error.code ? 'error' : ''"
                />
                <div
                    class="code btn-code border-radius-right"
                    @click="getCodeInfo"
                >
                    {{ forget.codeInfo }}
                </div>
            </div>

            <div class="input-item input-phone">
                <div class="box-icon border-radius-left">
                    <i class="icon input-pass"></i>
                </div>
                <input
                    type="password"
                    placeholder="请设置6-16位密码"
                    key="forget-pass"
                    class="input border-radius-right"
                    :class="error.password ? 'error' : ''"
                    v-model="forget.password"
                    @blur="checkPassWord"
                />
            </div>

            <div class="input-item input-phone">
                <div class="box-icon border-radius-left">
                    <i class="icon input-pass"></i>
                </div>
                <input
                    type="password"
                    placeholder="确认密码"
                    key="forget-passonce"
                    class="input border-radius-right"
                    :class="error.passwordOnce ? 'error' : ''"
                    v-model="forget.passwordOnce"
                    @blur="checkPassWordOnce"
                />
            </div>

            <!--密码-->

            <!--登录文件-->
            <div class="btn-login input-item">
                <div class="btn-code btn-res" @click="alterBtn">确认修改</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Bus from "../../events/bus";

import { toRefs, defineComponent, reactive } from "vue";
import { useRouter, Router } from "vue-router";

export default defineComponent({
    name: "forget",

    setup() {
        const router: Router = useRouter();
        const state = reactive({
            forget: {
                phone: "",
                password: "",
                code: "",
                passwordOnce: "",
                codeInfo: "获取验证码"
            },
            codeTimes: 0,
            error: {
                phone: false,
                password: false,
                code: false,
                passwordOnce: false
            },
            authorize: {}
        })

                //手机号检查
        function checkPhone() {
            const phone = state.forget.phone;
            const reg = /^1[3,4,5,7,8]\d{9}$/;
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
        function checkPassWord() {
            if (!checkPhone()) {
                return;
            }
            const passWord = state.forget.password;
            if (passWord.length >= 6 && passWord.length <= 16) {
                state.error.password = false;
                return true;
            } else {
                Bus.emit("showError", "请设置6-16位密码");
                state.error.password = true;
                return false;
            }
        }
        //检查确认密码
        function checkPassWordOnce() {
            if (!checkPhone()) {
                return;
            }
            if (!checkPassWord()) {
                return;
            }
            if (checkPassWord) {
                if (state.forget.password != state.forget.passwordOnce) {
                    Bus.emit("showError", "两次输入密码不一致");
                    state.error.passwordOnce = true;
                    return false;
                } else {
                    state.error.passwordOnce = false;
                    return true;
                }
            }
        }

             //发送验证码按钮
        function getCodeInfo() {
            if (!checkPhone()) {
                return false;
            }

            if (state.codeTimes) {
                return false;
            }
            // const data = {
            //     phone: state.forget.phone
            // };

            let time = 60;
            function countDown() {
                const timers: NodeJS.Timeout = setTimeout(() => {
                    clearInterval(timers);
                    time--;
                    state.codeTimes = time;
                    const text: string = time + "s";
                    state.forget.codeInfo = text;

                    if (time < 1) {
                        const text = "重新发送";
                        state.forget.codeInfo = text;
                    } else {
                        countDown();
                    }
                }, 1000);
            }
            countDown();
            // getCode(data).then(res => {
            //     if (Object.keys(res).length === 0) {
            //         return false;
            //     }
            //     countDown()
            // });
        }

        //确认修改密码
        function alterBtn() {
            if (checkPassWordOnce()) {
                 router.push("/account/login");

                // const params = {
                //     phone: state.forget.phone,
                //     code: state.forget.code,
                //     password: state.forget.password
                // };

                // forgetPassword(params).then(res => {
                //     if (res.error == -1) {
                //         Bus.emit("showError", "修改密码失败");
                //         return;
                //     }

                //     router.push("/account/login");
                // });
            }
        }

        return {
            ...toRefs(state),
            checkPhone,
            checkPassWord,
            checkPassWordOnce,
            getCodeInfo,
            alterBtn,
        }
    }

});
</script>

<style lang="scss" scoped>
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
    background: url(https://static.ledouya.com/FkJeurSnRDA5X_36A2BA3fVVnWF0?imageMogr2/auto-orient)
        center no-repeat;
}

.input-item .box-icon .input-pass {
    background: url(https://static.ledouya.com/FjvwvlK8oVd0p0_8xpK12O8yFqJY?imageMogr2/auto-orient)
        center no-repeat;
}

.input-item .input {
    width: 277px;
    border: 1px solid #f3f3f3;
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
    justify-content: flex-end;
    align-items: center;
}

.btn-login .info {
    font-size: 16px;
    color: #cacaca;
    cursor: pointer;
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
        margin-bottom: 15px;
    }

    .input-item .box-icon {
        height: 38px;
        width: 38px;
    }
    .input-item .btn-code {
        line-height: 38px;
    }

    .input-item .btn-res {
        width: 101px;
    }
}
</style>
