from rest_framework import serializers
from wms.models import Products, Inventory

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields=('SKU','VCodeName', 'ProductName','Unit','Category',
        'Status','CreateAt','Colour','ShelfOArea','Vendor','PhotoProduct')

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields=('ProductId','Quantity','BatchNo','SafeStock',
        'LastUpdated','PhotoLocation','Location','ExpiryDate')