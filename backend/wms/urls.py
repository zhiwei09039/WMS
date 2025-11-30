from django.urls import re_path,path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import profile
from wms import views

from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns += [
    path('profile/', profile),
    re_path(r'^product$',views.productsApi),
    #re_path(r'^product/([a-zA-Z][0-9]+)$',views.productsApi),
    re_path(r'^product/savefile',views.SaveFile),
    re_path(r'^product/([^/]+)$',views.productsApi),

    re_path(r'^probProduct$',views.probProduct),

    re_path(r'^inventory$',views.inventoryApi),
    #re_path(r'^inventory/(?P<code>.+)$', views.inventoryApi),
    #re_path(r'^inventory/([a-zA-Z][0-9]+|[0-9]+|[a-zA-Z]+-[a-zA-Z]+)$', views.inventoryApi),
    re_path(r'^inventory/savefile',views.SaveFile),
    re_path(r'^inventory/([a-zA-Z]+[0-9]+|[a-zA-Z]+)$',views.inventoryApi),
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

    