from django.urls import path
from .views import *

urlpatterns = [
    #Bienes
    path('', OrdenBienView.as_view()),
    # path('bien/<int:id>/', SolicitudBienView.as_view()),
    
    #Servicios
    # path('servicio/', SolicitudBienView.as_view()),
    # path('servicio/<int:id>/', SolicitudBienView.as_view()),

]