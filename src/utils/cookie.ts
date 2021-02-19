import Cookies from "js-cookie";
import { UserInfo } from '@/types/global';


// 设置用户 token
export function setUserToken(userToken: string): void {
    Cookies.set("userToken", userToken, { expires: 7, path: "/" });
}

// 获取用户 token
export function getUserToken(): string {
    return Cookies.get("userToken");
}

// 设置用户的信息
export function setUserInfo(userInfo: UserInfo): void {
    Cookies.set("userInfo", userInfo, { expires: 7, path: "/" });
}

// 获取用户的信息
export function getUserInfo(): UserInfo {
    return Cookies.getJSON("userInfo");
}

// 清除cookie信息
export function clearCookie(): void {
    Cookies.remove("userToken");
    Cookies.remove("userInfo");
}
