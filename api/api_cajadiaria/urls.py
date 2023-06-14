from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('caja/', CajaDiariaView.as_view()),
    path('caja/<int:id>/', CajaDiariaDetailView.as_view()),

    path('caja/ingresosventas/', IngresoVentaView.as_view()),
    path('caja/ingresosotros/', IngresosOtrosView.as_view()),
]