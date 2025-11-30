const inventory={template:`
<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Add Stock
</button>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            SKU
        </th>
        <th>
            Quantity
        </th>
        <th>
            Batch No
        </th>
        <th>
            Safety Stock
        </th>
        <th>
            Last Updated
        </th>
        <th>
            Location
        </th>
        <th>
            Expiry Date
        </th>
        <th>
            Out of Stock

        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="p in inventory">
        <td>{{p.ProductId}}</td>
        <td>{{p.Quantity}}</td>
        <td>{{p.BatchNo}}</td>
        <td>{{p.SafeStock}}</td>
        <td>{{formatDate(p.LastUpdated)}}</td>
        <td>{{p.Location}}</td>
        <td>{{formatDate(p.ExpiryDate)}}</td>
        <td>
            <span v-if="p.Quantity > p.SafeStock">✅ +{{ p.Quantity - p.SafeStock }}</span>
            <span v-else-if="p.Quantity < p.SafeStock">❌ -{{ p.SafeStock - p.Quantity }}</span>
            <span v-else>❓ 0</span>
        </td>

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
            <button type="button" @click="deleteClick(p.ProductId)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

        </td>
    </tr>
</tbody>
</thead>
</table>

<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body">

        <div class="input-group mb-3">
            <span class="input-group-text">SKU</span>
            <input type="text" class="form-control" v-model="ProductId">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Quantity</span>
            <input type="number" class="form-control" v-model="Quantity">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Batch No</span>
            <input type="text" class="form-control" v-model="BatchNo">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Safety Stock</span>
            <input type="number" class="form-control" v-model="SafeStock">
        </div>
        <div class="text-center mt-2">
            <img width="250px" height="250px"
                :src="PhotoPath+PhotoLocation" class="mb-2" />
            <input type="file" @change="imageUpload" class="form-control">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Location</span>
            <input type="text" class="form-control" v-model="Location">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Expiry Date</span>
            <input type="date" class="form-control" v-model="ExpiryDate">
        </div>

        <button v-if="NumClick == 1" class="btn btn-primary" @click="createClick()">Create</button>
        <button v-if="NumClick == 2" class="btn btn-primary" @click="updateClick()">Update</button>


    </div>

</div>
</div>
</div>


</div>


`,

data(){
    return{
        inventory:[],
        modalTitle:"",
        ProductId:0,
        Quantity:"",
        BatchNo:"",
        SafeStock:"",
        LastUpdated:"",
        Location:"",
        ExpiryDate:"",
        PhotoLocation:"anonymous.png",
        PhotoPath:variables.PHOTO_URL,

        statusMap: {
            0: '❓',
            1: '🔥',
            2: '❄️',
            3: '✅'
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

        InventoryWithoutFilter:[],
        InventoryFilter:"",

    }


},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"inventory")
        .then((response)=>{
            this.inventory=response.data;
        });
/*
        axios.get(variables.API_URL+"department")
        .then((response)=>{
            this.departments=response.data;
        });*/
    },
    addClick(){
        this.NumClick = 1;
        this.ProductId = "";
        this.Quantity = "0";
        this.BatchNo = "";
        this.SafeStock = "0";
        this.LastUpdated = "";
        this.PhotoLocation = "";
        this.Location = "";
        this.ExpiryDate = "";

    },
    editClick(p){
        this.NumClick = 2;
        this.modalTitle="Edit Stock";
        this.ProductId = p.ProductId;
        this.Quantity = p.Quantity;
        this.BatchNo = p.BatchNo;
        this.SafeStock = p.SafeStock;
        this.LastUpdated = p.LastUpdated.slice(0, 10);
        this.PhotoLocation = p.PhotoLocation;
        this.Location = p.Location;
        this.ExpiryDate = p.ExpiryDate.slice(0, 10);

    },
    
    createClick(){
        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();
        axios.post(variables.API_URL+"inventory",{
            ProductId:this.ProductId,
            Quantity:this.Quantity,
            BatchNo:this.BatchNo,
            SafeStock:this.SafeStock,
            LastUpdated:this.LastUpdated,
            PhotoLocation:this.PhotoLocation,
            Location:this.Location,
            ExpiryDate:this.ExpiryDate,
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
        axios.put(variables.API_URL+"inventory",{
            ProductId:this.ProductId,
            Quantity:this.Quantity,
            BatchNo:this.BatchNo,
            SafeStock:this.SafeStock,
            LastUpdated:this.LastUpdated,
            PhotoLocation:this.PhotoLocation,
            Location:this.Location,
            ExpiryDate:this.ExpiryDate,

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
        axios.delete(variables.API_URL+"inventory/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
    
    imageUpload(event){
        let formData=new FormData();
        formData.append('file',event.target.files[0]);
        axios.post(
            variables.API_URL+"inventory/savefile",
            formData)
            .then((response)=>{
                this.PhotoLocation=response.data;
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
    /* 
    sortResult(prop,asc){
        this.departments=this.departmentsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        })
    }*/

},
mounted:function(){
    this.refreshData();
}

}