import { defineStore } from 'pinia'

const ACCESS_TOKEN_KEY = 'access';
const REFRESH_TOKEN_KEY = 'refresh';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // 初始化时从 localStorage 读取 Token
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || null,
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY) || null,
    isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  }),

  actions: {
    /**
     * @description: 登录成功，保存 Token
     */
    loginSuccess(access, refresh) {
      // 1. 更新 Store 状态
      this.accessToken = access;
      this.refreshToken = refresh;
      this.isLoggedIn = true;

      // 2. 将 Token 存储到 localStorage
      //    （我们将只使用 localStorage 来持久化，sessionStorage 在登出时再清除）
      localStorage.setItem(ACCESS_TOKEN_KEY, access);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);

      console.log('登录成功,Token 已保存到 localStorage。');
    },

    /**
     * @description: 处理登出，清除所有 Token
     */
    logout() {
      // 1. 更新 Store 状态
      this.accessToken = null;
      this.refreshToken = null;
      this.isLoggedIn = false;

      // 2. 从 localStorage 中移除 Token
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      
      // 3. 从 sessionStorage 中移除（如果您之前有代码同时使用 sessionStorage）
      sessionStorage.removeItem(ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(REFRESH_TOKEN_KEY);
      router.push('/login')
      console.log('用户已登出,所有 Token 已清除.');
    },
  },
});