from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . views import MyTokenObtainPairView

#Import de todas las urls de las aplicaciones del proyecto
from api_mantenimientos.urls import *

urlpatterns = [
    #Autenticacion de usuario
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #Cliente
    path('clientes/', include('api_clientes.urls')),

    #Proveedores
    path('proveedores/', include('api_proveedores.urls')),
    
    #Productos
    path('productos/', include('api_productos.urls')),

    #Mantenimiento
    path('mantenimientos/', include((router_mantenimiento, 'api_mantenimientos'))),

    #Articulos
    path('articulos/', include('api_articulos.urls')),

    #Compras
    path('compras/', include('api_compras.urls')),
]