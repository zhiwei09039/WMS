import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import InventoryView from '../views/InventoryView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { 
    path: '/home',
    component: HomeView,
    children: [
      { path: 'products', component: ProductsView },
      { path: 'inventory', component: InventoryView },
      { path: 'orderdetail', component: OrderDetailView },
    ],
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('access')
      if (!token) next('/login')
      else next()
    }

  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})