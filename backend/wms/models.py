from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True)
    role = models.CharField(max_length=20, default='user')

    def __str__(self):
        return self.username

class Inventory(models.Model):
    ProductId = models.CharField(primary_key=True, max_length = 50)
    Quantity = models.IntegerField()
    BatchNo = models.CharField(max_length = 45, null=True)
    SafeStock = models.IntegerField( null=True)
    LastUpdated = models.DateTimeField(auto_now=True)
    Location = models.CharField(max_length = 20, null=True)
    ExpiryDate = models.DateTimeField(null=True)
    PhotoLocation = models.CharField(max_length = 100, null=True)

class Orders(models.Model):
    OrdersID = models.CharField(primary_key=True, max_length = 30)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    Notes = models.TextField(null=True)   
    Status = models.IntegerField()
    CustomerID = models.CharField(max_length = 45, null=True)
    Priority = models.IntegerField(null=True)

class OrdersDetail(models.Model):
    ItemNo = models.IntegerField()
    OrderNo = models.CharField(max_length = 45)
    ProductSKU = models.CharField(max_length = 45)
    Quantity = models.IntegerField()
    Remark = models.CharField(max_length = 45, null=True)
    OutOfStock = models.IntegerField()

class Products(models.Model):
    SKU = models.CharField(primary_key=True,max_length=45)
    VCodeName = models.CharField(max_length=45, null=True)
    ProductName = models.CharField(max_length=45, null=True)
    Unit = models.CharField(max_length=45, null=True)
    Category = models.CharField(max_length=45, null=True)
    Status = models.IntegerField()
    CreateAt = models.DateTimeField(auto_now_add=True) 
    Colour = models.CharField(max_length=20, null=True)
    ShelfOArea = models.CharField(max_length=45, null=True)
    Vendor = models.CharField(max_length=45, null=True)
    PhotoProduct = models.CharField(max_length=45, null=True)