from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

# Proveedores
urlpatterns = [
    path('art/', ArticulosView.as_view()),
    path('art/<int:id>/', ArticuloDetailView.as_view()),

    path('compras/', ComprasView.as_view()),
    path('compras/<int:id>/', ComprasDetailView.as_view()),


    path('remisiones/', RemisionesView.as_view()),
    path('remisiones_detalles/<int:id>/', RemisionDetailView.as_view()),
    path('entrada_almacen/<int:id>/', RemisionDetailView.as_view()),
]
