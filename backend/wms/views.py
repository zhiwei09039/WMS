from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from wms.models import Products, Inventory
from wms.serializers import ProductsSerializer, InventorySerializer

from django.core.files.storage import default_storage
from django.db import connection

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
        'role': user.role,
    })

@csrf_exempt
def productsApi(request, id=0):
    if request.method=='GET':
        with connection.cursor() as cursor:
            '''
            cursor.execute("""
                SELECT 
                    p.SKU,
                    p.VCodeName,
                    p.ProductName,
                    p.Unit,
                    p.Category,
                    p.Status,
                    p.CreateAt,
                    p.Colour,
                    p.ShelfOArea,
                    p.Vendor,
                    p.PhotoProduct,
                    m.VSKU
                FROM 
                    wms_products p
                left JOIN 
                    wms_productcodemap m
                ON 
                    p.CodeId = m.OurSKU
            """)
            '''
            cursor.execute("""
                SELECT 
                    p.SKU,
                    p.VCodeName,
                    p.ProductName,
                    p.Unit,
                    p.Category,
                    p.Status,
                    p.CreateAt,
                    p.Colour,
                    p.ShelfOArea,
                    p.Vendor,
                    p.PhotoProduct
                FROM 
                    wms_products p

            """)
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            data = [dict(zip(columns, row)) for row in rows]
        
        return JsonResponse(data, safe=False)
        #products = Products.objects.select_related('ProductCode').all()
        #products_serializer = ProductsSerializer(products, many=True)
        #return JsonResponse(products_serializer.data, safe = False)
    
    elif request.method == 'POST':#新增
        product_data = JSONParser().parse(request)
        #product_data['CreatedAt'] = timezone.now()
        products_serializer = ProductsSerializer(data = product_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("Added Successfully", safe = False)
        return JsonResponse(str(products_serializer.errors) +"Failed to Add", safe = False)
    elif request.method == 'PUT':#修改
        product_data = JSONParser().parse(request)
        product = Products.objects.get(SKU = product_data['SKU'])
        products_serializer = ProductsSerializer(product, data = product_data)
        if products_serializer.is_valid():
            products_serializer.save()
            return JsonResponse("Update Successfully", safe = False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        #product = Products.objects.get(SKU = id)
        product = Products.objects.get(SKU = id)
        product.delete()
        return JsonResponse("Deleted Successfully", safe = False)

@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False) 

@csrf_exempt
def inventoryApi(request, id=0):
    if request.method=='GET':
        inventory_data = Inventory.objects.all()
        code_serializer = InventorySerializer(inventory_data, many=True)
        return JsonResponse(code_serializer.data, safe = False)
    
    elif request.method == 'POST':#新增
        inventory_data = JSONParser().parse(request)
        code_serializer = InventorySerializer(data = inventory_data)
        if code_serializer.is_valid():
            code_serializer.save()
            return JsonResponse("Added Successfully", safe = False)
        return JsonResponse(str(code_serializer.errors) +"Failed to Add", safe = False)
    elif request.method == 'PUT':#修改
        inventory_data = JSONParser().parse(request)
        Into = Inventory.objects.get(ProductId = inventory_data['ProductId'])
        code_serializer = InventorySerializer(Into, data = inventory_data)
        if code_serializer.is_valid():
            code_serializer.save()
            return JsonResponse("Update Successfully", safe = False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        Into = Inventory.objects.get(ProductId = id)
        Into.delete()
        return JsonResponse("Deleted Successfully", safe = False)

@csrf_exempt
def getorderdetailApi(request, id=0):
    if request.method == 'GET':
        external_api_url = 'https://api.example.com/data'
        try:
            response = requests.get(external_api_url, timeout=10)
            response.raise_for_status()
        except requests.RequestException as e:
            return JsonResponse({'error': '请求外部API失败', 'details': str(e)}, status=500)

        data = response.json()

        # 假设 data 是列表，每个元素包含需要存库的字段
        saved_count = 0
        for item in data:
            # 例如 item = {'name': 'xxx', 'value': 123}
            obj, created = MyModel.objects.update_or_create(
                external_id=item['id'],
                defaults={
                    'name': item['name'],
                    'value': item['value']
                }
            )
            if created:
                saved_count += 1

        return JsonResponse({'message': f'成功保存 {saved_count} 条数据'})

    return JsonResponse({'error': '只支持GET请求'}, status=405)

@csrf_exempt
def probProduct(request):
    if request.method=='GET':
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT 
                    i.ProductId,
                    p.VCodeName,
                    p.ProductName,
                    i.Location,
                    i.Quantity,
                    i.ExpiryDate
                FROM 
                    wmsdb.wms_inventory  i
                left JOIN 
                    wmsdb.wms_products p
                on i.ProductId = p.SKU
                where i.quantity <= i.safestock 
                or ExpiryDate <= DATE_ADD(CURDATE(), INTERVAL 3 DAY)

            """)
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]
            data = [dict(zip(columns, row)) for row in rows]
        
        return JsonResponse(data, safe=False)
        #products = Products.objects.select_related('ProductCode').all()
        #products_serializer = ProductsSerializer(products, many=True)
        #return JsonResponse(products_serializer.data, safe = False)
 