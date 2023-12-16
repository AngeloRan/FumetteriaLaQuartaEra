from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('shop', views.shop, name='shop'),
    path('events', views.events, name='events'),
    path('ilgioco', views.ilgioco, name='ilgioco'),
    path('detail', views.detail, name='detail'),
    path('test', views.test, name='test'),
]

