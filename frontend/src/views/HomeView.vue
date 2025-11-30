

<template>
  <div class="container mt-4">
    <h3 class="d-flex justify-content-center">
      Warehouse Management System
    </h3>

    <nav class="navbar navbar-expand-sm bg-light navbar-light my-3">
      <ul class="navbar-nav">
        <li class="nav-item m-1">
          <router-link class="btn btn-light btn-outline-primary" to="/home">Home</router-link>
        </li>
        <li class="nav-item m-1">
          <router-link class="btn btn-light btn-outline-primary" to="/home/products">Products</router-link>
        </li>
        <li class="nav-item m-1">
          <router-link class="btn btn-light btn-outline-primary" to="/home/inventory">Inventory</router-link>
        </li>
        <li class="nav-item m-1">
          <router-link class="btn btn-light btn-outline-primary" to="/home/orderdetail">B2B</router-link>
        </li>
        <li class="nav-item m-1">
          <router-link class="btn btn-light btn-outline-primary" to="/home/orderdetail">OrderDetail</router-link>
        </li>
        <li class="nav-item m-1">
          <button class="btn btn-danger" @click="logout">Logout</button>
        </li>
      </ul>
    </nav>
<table class="table table-striped">
  <thead>
      <tr>
          <th>
            SKU
          </th>
          <th>
            V Code Name
          </th>
          <th>
            Product Name
          </th>
          <th>
            ShelfOArea
          </th> 
          <th>
            Quantity
          </th>
          <th>
            Expired Date
          </th>
          <th>
            Memo
          </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="p in probInventory" >
        <td>{{p.ProductId}}</td>
        <td>{{p.VCodeName}}</td>
        <td>{{p.ProductName}}</td>
        <td>{{p.Location}}</td>
        <td>{{p.Quantity}}</td>
        <td>{{formatDate(p.ExpiryDate)}}</td>
        <td>dasfdsf</td>

    </tr>

  </tbody>

</table>
    <!-- 子页面区域 -->
    <router-view></router-view>
  </div>


</template>

<script>
//import { logout } from '../stores/auth.js';
export default {
  data(){
    return{
        probInventory:[],
        ExpiryDate:"",
    }
  },
  methods:{
    refreshData(){
      axios.get(variables.API_URL+"probProduct")
      .then((response)=>{
          this.probInventory=response.data;
      });
    },
    logout() {
      logout();

    },

    // ✅ 放这里
    formatDate(dateString) {
      const date = new Date(dateString);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hour = String(date.getHours()).padStart(2, '0');
      const minute = String(date.getMinutes()).padStart(2, '0');
      const second = String(date.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
  },

  mounted(){
    this.refreshData();
  }
};
</script>