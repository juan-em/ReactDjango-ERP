from django.urls import path
from .views import *

urlpatterns = [
    path('bien/', RequerimientoBienView.as_view()),
    path('servicio/', RequerimientoServicioView.as_view()),

    path('bien/<int:id>/', RequerimientoBienDetailView.as_view()),
    path('servicio/<int:id>/', RequerimientoServicioDetailView.as_view()),
]