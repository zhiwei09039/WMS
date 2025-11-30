<template>
  <div class="login">
    <h2>WMS Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
// 导入 Auth Store
import { useAuthStore } from '@/stores/auth' // 假设路径是正确的

const username = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore() // 初始化 Store

// 确保您的 variables.API_URL 在这里可用，例如通过 import 或 setup
// const variables = { API_URL: '...' };

async function login() {
  try {
    const res = await axios.post(variables.API_URL + 'api/token/', {
      // const res = await axios.post('http://127.0.0.1:8000/api/token/', {
      username: username.value,
      password: password.value,
    })
    
    // 关键修改：不再直接操作 localStorage/sessionStorage
    // 调用 Pinia Store 的 action 来统一处理 Token 的保存
    authStore.loginSuccess(res.data.access, res.data.refresh)

    // 以前的代码：
    // localStorage.setItem('access', res.data.access)
    // localStorage.setItem('refresh', res.data.refresh)
    // sessionStorage.setItem('access', res.data.access)
    // sessionStorage.setItem('refresh', res.data.refresh)
    
    router.push('/home')
  } catch (e) {
    alert('Login fail. Please check username and password')
    console.error('Login error:', e)
  }
}
</script>