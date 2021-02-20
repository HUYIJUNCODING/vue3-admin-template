import Cookies from "js-cookie";
import { UserInfo } from '@/types/global';


// 设置用户 token
export function setUserToken(userToken: string): void {
    Cookies.set("userToken", userToken);
}

// 获取用户 token
export function getUserToken(): string {
    return Cookies.get("userToken");
}

// 设置用户的信息
export function setUserInfo(userInfo: UserInfo): void {
    Cookies.set("userInfo", userInfo);
}

// 获取用户的信息
export function getUserInfo(): UserInfo {
    return Cookies.getJSON("userInfo");
}

// 设置用户身份(角色)
export function setUserRole(userRole: Array<string>): void {
    Cookies.set("userRole", userRole);
}

//获取用户身份(角色)
export function getUserRole(): Array<string> {
    return Cookies.getJSON("userRole");
}

// 清除cookie登录信息
export function clearLoginCookie(): void {
    Cookies.remove("userToken");
    Cookies.remove("userInfo");
    Cookies.remove("userRole");
}
