from django.urls import path
from .views import *
from rest_framework.urlpatterns import format_suffix_patterns

# Proveedores
urlpatterns = [
    path('', ProveedoresView.as_view()),
    path('<int:id>', ProveedoresDetailView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)