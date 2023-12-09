from django.http import HttpResponse
from django.shortcuts import render
from django.views import View

# Create your views here.

def home(request):
    variabile = {'context': True}
    return render(request, "gui/index.html", variabile)

def dashboard(request):
    variabile = {'context': 2}
    return render(request, "gui/dashboard.html", variabile)
