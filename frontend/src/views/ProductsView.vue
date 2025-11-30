<template>
<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Add Product
</button>



<table class="table table-striped">
<thead>
    <tr>
        <th>

        <div class="d-flex flex-row">

        <input class="form-control m-2"
        v-model="SKUFilter"
        placeholder="Filter SKU">

        <button type="button" class="btn btn-light"
        @click="sortResult('SKU',true)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
        </svg>
        </button>

        <button type="button" class="btn btn-light"
        @click="sortResult('SKU',false)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
        </svg>
        </button>
        </div>

            SKU
        </th>
        <th>
            V Code Name
        </th>
        <th>
            Product Name
        </th>
        <th>
            Unit
        </th>
        <th>
            Category
        </th>
        <th>
            Status
        </th>

        <th>
            Created At
        </th>
        <th>
            Colour
        </th>
        <th>
            ShelfOArea
        </th>
        <th>
        <div class="d-flex flex-row">
            <input class="form-control m-2"
                v-model="VendorFilter"
                placeholder="Filter Vendor">
        </div> 
            Vendor
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="p in filteredProducts" :key="p.SKU">
        <td>{{p.SKU}}</td>
        <td>{{p.VCodeName}}</td>
        <td>{{p.ProductName}}</td>
        <td>{{p.Unit}}</td>
        <td>{{p.Category}}</td>
        <td>{{getStatusText(p.Status)}}</td>
        <td>{{formatDate(p.CreateAt)}}</td>
        <td>{{p.Colour}}</td>
        <td>{{p.ShelfOArea}}</td>
        <td>{{p.Vendor}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(p)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(p.SKU)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

        </td>
    </tr>
</tbody>
</table>

<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">{{ modalTitle }}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <!-- Modal Body: Scrollable + 2 columns -->
    <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
      <div class="row g-3 ">
        <!-- Left column -->
        <div class="col-md-6 ">
          <div class="input-group mb-3">
            <span class="input-group-text">VCodeName</span>
            <input type="text" class="form-control" v-model="VCodeName">
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">SKU</span>
            <input type="text" class="form-control" v-model="SKU">
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">ProductName</span>
            <input type="text" class="form-control" v-model="ProductName">
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Unit</span>
            <input type="text" class="form-control" v-model="Unit">
          </div>

          <div class="input-group mb-3" >
            <span class="input-group-text">Category</span>
            <input type="text" class="form-control" v-model="Category">
          </div>

          <div class="input-group mb-3">
          <span class="input-group-text">Status</span>
            <select v-model="selectedStatus" id="fruit">
            <option
                v-for="(fruit, index) in sss"
                :key="fruit.id"
                :value="fruit.id"
            >
                {{ fruit.id }}. {{ fruit.name }}
            </option>
            </select>
          <!--
            <span class="input-group-text">Status</span>
            <input type="text" class="form-control" v-model="Status">
            -->
          </div>
        <div class="input-group mb-3">
            <span class="input-group-text">CreateAt</span>
            <input type="date" class="form-control" v-model="CreateAt">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Colour</span>
            <input type="text" class="form-control" v-model="Colour">
        </div>
        </div>

        <!-- Right column -->
        <div class="col-md-6">
          <div class="input-group mb-3">
            <span class="input-group-text">ShelfOArea</span>
            <input type="text" class="form-control" v-model="ShelfOArea">
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text">Vendor</span>
            <input type="text" class="form-control" v-model="Vendor">
          </div>

          <div class="text-center mt-2">
            <img width="250px" height="250px"
                :src="PhotoPath+PhotoProduct" class="mb-2" />
            <input type="file" @change="imageUpload" class="form-control">
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal-footer">
      <button v-if="NumClick == 1" class="btn btn-primary" @click="createClick()">Create</button>
      <button v-if="NumClick == 2" class="btn btn-primary" @click="updateClick()">Update</button>
    </div>
    
  </div>
</div>



</div>
</div>
</template>

<script>
export default {
  data(){
    return{
        products:[],
        modalTitle:"",
        VCodeName:"",
        SKU:0,
        ProductName:"",
        Unit:"",
        Category:"",
        Status:"1",
        CreateAt:"",
        Colour:"",
        ShelfOArea:"",
        Vendor:"",
        PhotoProduct:"anonymous.png",
        PhotoPath:variables.PHOTO_URL,

        statusMap: {
            0: '❓',
            1: '🔥',
            2: '❄️'
        },
        /*
        statusMap: {
            1: 'Active',
            0: 'Close'
        }*/

        NumClick : 0,

        selectedStatus: 1,
        sss:[
            { id: 1, name: 'Active' },
            { id: 2, name: 'Disable' }
        ],

        productsWithoutFilter:[],
        SKUFilter:"",
        ProductNameFilter:"",
        VendorFilter:"",

    }


},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"product")
        .then((response)=>{
            this.products=response.data;
            this.productsWithoutFilter=response.data;
        });
/*
        axios.get(variables.API_URL+"department")
        .then((response)=>{
            this.departments=response.data;
        });*/
    },
    addClick(){
        this.NumClick = 1;
        this.modalTitle="Add Product";
        this.VCodeName="";
        this.SKU="";
        this.ProductName="";
        this.Unit="";
        this.Category="";
        this.Status="";
        this.CreateAt="";
        this.Colour="";
        this.ShelfOArea="";
        this.Vendor="";
        //this.Department="",
        this.PhotoProduct="";
    },
    editClick(p){
        this.NumClick = 2;
        this.modalTitle="Edit Product";
        this.VCodeName=p.VCodeName;
        this.SKU=p.SKU;
        this.ProductName=p.ProductName;
        this.Unit=p.Unit;
        this.Category=p.Category;
        this.selectedStatus=p.Status;
        this.CreateAt = p.CreateAt.slice(0, 10);
        //this.CreateAt=p.CreateAt;
        this.Colour=p.Colour,
        this.ShelfOArea=p.ShelfOArea,
        this.Vendor=p.Vendor,
        this.PhotoProduct=p.PhotoProduct
    },
    
    createClick(){
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
        axios.post(variables.API_URL+"product",{
            VCodeName:this.VCodeName,
            SKU:this.SKU,
            ProductName:this.ProductName,
            Unit:this.Unit,
            Category:this.Category,
            Status:this.selectedStatus,
            CreateAt:this.CreateAt,
            Colour:this.Colour,
            ShelfOArea:this.ShelfOArea,
            Vendor:this.Vendor,
            PhotoProduct:this.PhotoProduct
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        }
        
    );
    },
    updateClick(){
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
        axios.put(variables.API_URL+"product",{
            VCodeName:this.VCodeName,
            SKU:this.SKU,
            ProductName:this.ProductName,
            Unit:this.Unit,
            Category:this.Category,
            Status:this.selectedStatus,
            CreateAt:this.CreateAt,
            Colour:this.Colour,
            ShelfOArea:this.ShelfOArea,
            Vendor:this.Vendor,
            PhotoProduct:this.PhotoProduct

        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(variables.API_URL+"product/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
    
    imageUpload(event){
        let formData=new FormData();
        formData.append('file',event.target.files[0]);
        axios.post(
            variables.API_URL+"product/savefile",
            formData)
            .then((response)=>{
                this.PhotoProduct=response.data;
            });
    },
    formatDate(dateString) {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    getStatusText(Status){
        return this.statusMap[Status] || '❓';
        /*
        if (this.statusMap[Status] === 1) return '🔥';
        if (this.statusMap[Status] === 2) return '❄️';
        return '❓';*/

    },

    sortResult(prop,asc){
        this.products = this.productsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        })
    }
},
computed: {
    filteredProducts() {
    // 如果未加载完成则返回空数组
    if (!this.productsWithoutFilter) return [];

    const SKUFilter = this.SKUFilter.toString().trim().toLowerCase();
    const VendorFilter = this.VendorFilter.toString().trim().toLowerCase();
    return this.productsWithoutFilter.filter(el => {
      const matchSKU = el.SKU.toString().toLowerCase().includes(SKUFilter);
      const matchVendor = (el.Vendor || "").toString().toLowerCase().includes(VendorFilter);
      return matchSKU && matchVendor; // 必须都符合
    });
    }
},
mounted:function(){
    this.refreshData();
}

};
</script>