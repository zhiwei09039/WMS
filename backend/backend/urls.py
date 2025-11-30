from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('wms.urls')),
    re_path(r'^', include('wms.urls')),
]