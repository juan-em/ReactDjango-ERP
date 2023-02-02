from django.urls import path
from .views import *

# Proveedores
urlpatterns = [
    path('', ProveedoresView.as_view()),
    path('<int:id>', ProveedoresDetailView.as_view())
]