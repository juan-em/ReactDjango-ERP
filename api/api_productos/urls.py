from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('articulo/', views.ArticulosView.as_view()),
    path('articulo/<int:id>', views.ArticulosDetailView.as_view()),
    path('producto/', views.ProductoView.as_view()),
    path('producto/<int:id>', views.ProductoDetailView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)