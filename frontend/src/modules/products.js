export default {
    init() {
        console.log('Products JS loaded!')
        // 原来的逻辑写在这里
    },
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