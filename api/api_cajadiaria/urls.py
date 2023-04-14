from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', CajaDiariaView.as_view()),
    path('<int:id>/', CajaDiariaDetailView.as_view()),
    path('<int:id>/movimientos/', CajaDiariaMovimientosView.as_view()),
]