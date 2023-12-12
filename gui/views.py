from django.http import HttpResponse
from django.shortcuts import render
from django.views import View

# Create your views here.

def home(request):
    variabile = {'context': True}
    return render(request, "gui/index.html", variabile)

def shop(request):
    context = {
        'articoli': [
            {
                'id': 1,
                'url_img': 'url1',
                'titolo' : 'titolo1',
                'descrizione' : 'descrizione1'
            },
            {
                'id': 2,
                'url_img': 'url2',
                'titolo' : 'titolo2',
                'descrizione' : 'descrizione2'
            },
        ]
    }
    return render(request, "gui/shop.html", context)

def events(request):
    variabile = {'context': 2}
    return render(request, "gui/events.html", variabile)

def ilgioco(request):
    variabile = {'context': 2}
    return render(request, "gui/ilgioco.html", variabile)

def detail(request):
    return 0


