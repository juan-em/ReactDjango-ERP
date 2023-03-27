from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', VentasView.as_view()),
    path('<int:id>/', VentasDetailView.as_view()),
    path('sesion/', Sesion_ventaView.as_view()),
    path('sesion/<int:id>/', Sesion_ventaDetailView.as_view()),
    path('puntoventa/', Punto_ventaView.as_view()),
    path('puntoventa/<int:id>/', Punto_ventaDetailView.as_view()),



    # path('remisiones/', RemisionesView.as_view()),
    # path('remisiones_detalles/<int:id>/', RemisionDetailView.as_view()),
    # path('entrada_almacen/<int:id>/', RemisionDetailView.as_view()),
]