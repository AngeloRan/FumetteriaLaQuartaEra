from django.http import HttpResponse
from django.shortcuts import render
from django.views import View

# Create your views here.

def index(request):
    context = {'context': True}
    return render(request, "gui/index.html", context)