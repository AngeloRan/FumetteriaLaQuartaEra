from django.http import HttpResponse
from django.shortcuts import render
from django.views import View

# Create your views here.

def home(request):
    variabile = {'context': True}
    return render(request, "gui/index.html", variabile)

def shop(request):
    variabile = {'context': 2}
    return render(request, "gui/shop.html", variabile)

def events(request):
    variabile = {'context': 2}
    return render(request, "gui/events.html", variabile)

def ilgioco(request):
    variabile = {'context': 2}
    return render(request, "gui/ilgioco.html", variabile)

