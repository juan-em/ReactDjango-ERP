from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('', views.ProductoView.as_view()),
    path('<int:id>/', views.ProductoDetailView.as_view()),
    path('articulo/', views.ArticulosView.as_view()),
    path('articulo/<int:id>/', views.ArticuloDetailView.as_view()),
    path('proddet/', views.Producto_detallelView.as_view()),
    path('proddet/<int:id>/', views.Producto_detalleDetailView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)