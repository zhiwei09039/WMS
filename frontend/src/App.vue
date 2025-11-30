<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth'; // 导入 Store

const authStore = useAuthStore();

/**
 * @description: 监听浏览器或分页关闭，执行清除 Token 操作
 * 注意：这个逻辑只应该在应用的主入口文件（如 App.vue）中执行一次。
 */
const clearTokenOnClose = () => {
  // 当窗口即将关闭时，调用 Store 的登出方法
  authStore.logout(); 
};

onMounted(() => {
  // 页面加载时添加监听
  window.addEventListener('beforeunload', clearTokenOnClose);
});

onBeforeUnmount(() => {
  // 组件卸载时移除监听
  window.removeEventListener('beforeunload', clearTokenOnClose);
});
</script>

<template>
  <router-view />
</template>