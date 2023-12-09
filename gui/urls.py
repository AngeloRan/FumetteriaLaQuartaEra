from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('dashboard', views.dashboard, name='home2'),
    path('shop', views.home3, name='home3'),
    path('gioco', views.home4, name='home4'),
]
