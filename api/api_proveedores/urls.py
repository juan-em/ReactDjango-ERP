from django.urls import path
from .views import *

# Proveedores
urlpatterns = [
    path('per', ProveedorPersonaView.as_view()),
    path('emp', ProveedorEmpresaView.as_view()), 
    path('per/<int:id>', ProveedorPersonaViewDetalle.as_view()),
    path('emp/<int:id>', ProveedorEmpresaViewDetalle.as_view()),
]