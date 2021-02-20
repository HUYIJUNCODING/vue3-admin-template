<template>
    <div class="user-register">
        <!--手机号-->
        <div class="input-item input-phone ">
            <div class="box-icon border-radius-left">
                <i class="icon icon-truename"></i>
            </div>
            <input
                type="text"
                placeholder="请输入您的姓名"
                class="input border-radius-right"
                key="res-phone"
                maxlength="11"
                :class="error.truename ? 'error' : ''"
                v-model="res.truename"
                @blur="checkTruename"
            />
        </div>

        <!--手机号-->
        <div class="input-item input-phone ">
            <div class="box-icon border-radius-left">
                <i class="icon icon-phone"></i>
            </div>
            <input
                type="text"
                placeholder="请输入手机号"
                class="input border-radius-right"
                key="res-phone"
                maxlength="11"
                :class="error.phone ? 'error' : ''"
                v-model="res.phone"
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
                class="input input-code border-radius-left"
                key="res-code"
                :class="error.code ? 'error' : ''"
                v-model="res.code"
            />
            <div class="code btn-code border-radius-right" @click="getCodeInfo">
                {{ res.codeInfo }}
            </div>
        </div>
        <!--密码-->

        <div class="input-item input-phone">
            <div class="box-icon border-radius-left">
                <i class="icon input-pass"></i>
            </div>
            <input
                type="password"
                placeholder="请设置6-16位密码"
                class="input border-radius-right"
                key="res-pass"
                :class="error.password ? 'error' : ''"
                @blur="checkPassWord"
                v-model="res.password"
            />
        </div>
        <!--确认密码-->

        <div class="input-item input-phone">
            <div class="box-icon border-radius-left">
                <i class="icon input-pass"></i>
            </div>
            <input
                type="password"
                placeholder="确认密码"
                class="input border-radius-right"
                key="res-passonce"
                :class="error.passwordOnce ? 'error' : ''"
                @blur="checkPassWordOnce"
                v-model="res.passwordOnce"
            />
        </div>

        <!--省市区-->

        <div class="input-item citys">
            <el-select
                size="small"
                v-model="selectProv"
                placeholder="省份"
                class="select-item"
                @change="changeProv($event)"
            >
                <el-option
                    v-for="(item, index) in provs"
                    :key="index"
                    :getProId="index"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>

            <el-select
                size="medium"
                class="select-item"
                v-model="selectCity"
                placeholder="城市"
                @change="changeCity($event)"
            >
                <el-option
                    v-for="(item, index) in citysList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <el-select
                size="medium"
                v-if="hasCon"
                v-model="selectCon"
                placeholder="区县"
            >
                <el-option
                    v-for="(item, index) in con"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
        </div>

        <!--注册文件-->
        <div class="btn-register input-item">
            <div class="btn-code btn-res" @click="resigter">注册</div>
        </div>

        <div class=" attention" @click="agree" v-if="false">
            <div class="is-agree" :class="isAgree ? '' : 'not'"></div>
            <div class="info">
                注册即代表同意<span>《乐店云服务协议》</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import citys from "../../utils/city";
import Bus from "../../events/bus";

import {
    toRefs,
    defineComponent,
    reactive,
    onBeforeMount
} from "vue";
import { useRouter, Router } from "vue-router";

export default defineComponent({
    name: "register",
    setup() {
        const router: Router = useRouter();
        const state = reactive({
            provs: [],
            citys: [],
            con: [],
            selectProv: "",
            selectCity: "",
            selectCon: "",
            citysList: [],
            conList: [],
            hasCon: true,
            isAgree: true,
            res: {
                truename: "",
                phone: "",
                password: "",
                passwordOnce: "",
                code: "",
                codeInfo: "获取验证码"
            },
            codeTimes: 0,
            error: {
                phone: false,
                password: false,
                passwordOnce: false,
                code: false,
                truename: false
            }
        });
        /*二级联动选择地区*/
        function getProv(): void {
            const tempCity = [];

            for (const val of state.citys) {
                tempCity.push({ label: val.name, value: val.name });
            }
            state.provs = tempCity;
        }
        function changeProv(e: string): void {
            state.selectCity = "";
            state.selectCon = "";
            const cityList = [];

            for (const val of state.citys) {
                if (val.name === e) {
                    state.conList = val.city;

                    for (const item of val.city) {
                        cityList.push({ label: item.name, value: item.name });
                    }
                }
            }
            state.citysList = cityList;
        }

        function changeCity(name: string): void {
            state.selectCon = "";
            let conLists: Array<{ label: string; value: string }>;

            if (!state.conList[0].district.length) {
                state.hasCon = false;
            } else {
                state.hasCon = true;
            }
            for (const val of state.conList) {
                if (val.name === name) {
                    // console.log(val.district)
                    for (const item of val.district) {
                        conLists.push({ label: item.name, value: item.name });
                    }
                }
            }
            state.con = conLists;
        }
        //验证姓名
        function checkTruename(): boolean {
            if (!state.res.truename) {
                Bus.emit("showError", "姓名不能为空");
                state.error.truename = true;
                return false;
            } else {
                state.error.truename = false;
                return true;
            }
        }
        //手机号检查
        function checkPhone(): boolean {
            if (!checkTruename()) {
                return false;
            }

            const phone = state.res.phone;
            const reg = /^1\d{10}$/;

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
        function checkPassWord(): boolean {
            if (!checkPhone()) {
                return false;
            }
            const passWord = state.res.password;
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
                return false;
            }
            if (!checkPassWord()) {
                return false;
            }
            if (checkPassWord) {
                if (state.res.password != state.res.passwordOnce) {
                    Bus.emit("showError", "两次输入密码不一致");
                    state.error.passwordOnce = true;
                    return false;
                } else {
                    state.error.passwordOnce = false;
                    return true;
                }
            }
        }

        //是否同意
        function agree(): void {
            state.isAgree = !state.isAgree;
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
            //     phone: state.res.phone
            // };

            let time = 60;
            function countDown() {
                const timers: NodeJS.Timeout = setTimeout(() => {
                    clearInterval(timers);
                    time--;
                    state.codeTimes = time;
                    const text: string = time + "s";
                    state.res.codeInfo = text;

                    if (time < 1) {
                        const text = "重新发送";
                        state.res.codeInfo = text;
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
        function resigter() {
            //    注册
            if (checkPhone() && checkPassWord()) {
                //判断是否勾选偶同意按钮
                if (!state.isAgree) {
                    Bus.emit("showError", "请勾选并同意相关服务协议");
                    return;
                }

                if (!state.selectProv) {
                    Bus.emit("showError", "请选择省市区");
                    return;
                }

                router.push("/account/login");

                // const params = {
                //     truename: state.res.truename,
                //     phone: state.res.phone,
                //     password: state.res.password,
                //     code: state.res.code,
                //     province: state.selectProv,
                //     city: state.selectCity,
                //     area: state.selectCon
                // };

                // register(params).then(res => {
                //     if (Object.keys(res).length == 0) {
                //         return;
                //     }

                //     if (res.error == -1) {
                //         Bus.emit("showError", res.error_reason);
                //         return;
                //     }

                //     if (!res.error) {
                //         //    注册成功跳转到登录页
                //         router.push("/account/login");
                //     }
                // });
            }
        }
        onBeforeMount(() => {
            state.citys = citys as [];
            getProv();
        });

        return {
            ...toRefs(state),
            getProv,
            changeProv,
            changeCity,
            checkTruename,
            checkPhone,
            checkPassWord,
            checkPassWordOnce,
            agree,
            getCodeInfo,
            resigter
        };
    }
});
</script>

<style scoped>
.user-register {
    position: absolute;
    bottom: -11px;
}
.input-item {
    width: 322px;
    height: 46px;
    border-radius: 4px;
    /*border: 1px solid #F3F3F3;*/
    display: flex;
    margin-bottom: 20px;

    position: relative;
}

/*.input-item.error .input{*/
/*border: 1px solid #ff797a;*/
/*border-left:0;*/

/*}*/
/*.input-item.error .box-icon {*/
/*border: 1px solid #ff797a;*/
/*border-right: 0;*/
/*}*/

.input-item .box-icon {
    position: absolute;
    left: 1px;
    top: 1px;
    width: 44px;
    height: 44px;
    /*border: 1px solid red;*/
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #f3f3f3;
    /*border-right: 0;*/
}

.input-item .box-icon .icon {
    display: block;
    width: 20px;
    height: 20px;
    /*background: red;*/
}

.input-item .box-icon .icon-truename {
    background: url(https://static.ledouya.com/Fh9PEsPzma6Lq7YH5e0BfOn79Ymu)
        center no-repeat;
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
    /*border: 1px solid #ff797a;*/
    border: 1px solid #e4e7ed;
    outline: 0;
    padding-left: 54px;
    color: #666;
}
.input-item .input.error {
    border: 1px solid #ff797a;
}
.input-item .input:focus {
    border: 1px solid #3794ff;
}

/*.input-item .input.error {*/
/*border: 1px solid #f56c6c;*/
/*}*/

.input-item .input-code {
    width: 322px;
    padding-left: 8px;
}

.input-item .btn-code {
    width: 120px;
    line-height: 44px;
    color: #fff;
    font-size: 16px;
    text-align: center;
    background: #3794ff;
    cursor: pointer;
    position: absolute;
    right: 1px;
    top: 1px;
}
.btn-register {
    display: flex;
    justify-content: flex-end;
}
.input-item .btn-res {
    width: 120px;
    border-radius: 2px;
}

.border-radius-right {
    border-radius: 0 2px 2px 0;
}

.border-radius-left {
    border-radius: 2px 0 0 2px;
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

.select-item {
    margin-right: 17px;
}
.citys {
    border: 0;
}
.attention {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
}

.attention .is-agree {
    width: 16px;
    height: 16px;
    background: url(https://static.ledouya.com/FpOSc47ejF58zxoHgtD2sEggwSOY?imageMogr2/auto-orient)
        center no-repeat;
    margin-right: 5px;
}

.attention .is-agree.not {
    background: url(https://static.ledouya.com/FodhEMNU1FuIuS7sJz_bXk_NIz8p?imageMogr2/auto-orient)
        center no-repeat;
}

.attention .info {
    font-size: 12px;
    color: #cacaca;
}
.attention .info span {
    color: #3794ff;
}

@media only screen and (max-width: 1500px) {
    .input-item {
        height: 40px;
        width: 281px;
        margin-bottom: 10px;
    }

    .input-item .box-icon {
        height: 38px;
        width: 38px;
    }
    .input-item .btn-code {
        line-height: 38px;
    }
}
</style>
