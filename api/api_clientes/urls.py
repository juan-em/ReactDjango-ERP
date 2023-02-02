from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('ver/per/', views.ClientePersonaView.as_view()),
    path('ver/emp/', views.ClienteEmpresaView.as_view())


]

urlpatterns = format_suffix_patterns(urlpatterns)