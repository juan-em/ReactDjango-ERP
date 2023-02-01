from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('persona/', views.PersonaView.as_view()),
    path('empresa/', views.EmpresaView.as_view())


]

urlpatterns = format_suffix_patterns(urlpatterns)