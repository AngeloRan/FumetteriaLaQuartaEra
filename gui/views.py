from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core.paginator import Paginator

from LQEsite.models import *


# Create your views here.

def get_prods(showcase_prods):

    prods = []

    prods += list(Comic.objects.filter(product_ptr_id__in=showcase_prods))
    prods += list(Manga.objects.filter(product_ptr_id__in=showcase_prods))
    prods += list(TableGame.objects.filter(product_ptr_id__in=showcase_prods))
    prods += list(RoleGame.objects.filter(product_ptr_id__in=showcase_prods))
    prods += list(ActionFigure.objects.filter(product_ptr_id__in=showcase_prods))
    prods += list(Gadget.objects.filter(product_ptr_id__in=showcase_prods))

    return prods

def home(request):
    variabile = {'context': True}
    return render(request, "gui/index.html", variabile)

@require_http_methods(["GET"])
def shop(request):  

    if request.method == 'GET':

        #@TODO set it in settings
        pagination_count = 5

        data_only = request.GET.get('data_only', False)
        page = request.GET.get('page', 1)

        product_list = []

        if not request.GET.get('quantity'):

            comic = list(Comic.objects.all().order_by('-creation')[:5])
            manga = list(Manga.objects.all().order_by('-creation')[:5])
            tablegame = list(TableGame.objects.all().order_by('-creation')[:5])
            rolegame = list(RoleGame.objects.all().order_by('-creation')[:5])
            actionfigure = list(ActionFigure.objects.all().order_by('-creation')[:5])
            gadget = list(Gadget.objects.all().order_by('-creation')[:5])
        
            product_list = comic + manga + tablegame + rolegame + actionfigure + gadget

        else:
            #@ TODO: filtro
            pass

        paginator = Paginator(product_list, pagination_count)
        page_number = page
        page_obj = paginator.get_page(page_number)
        res_objs = list(page_obj)

        rendered_product = []
        for prod in res_objs:
            product =  {
                        'id': prod.id,
                        'url_img': prod.image,
                        'titolo' : prod.title,
                        'descrizione_breve' : prod.short_description,
                        'descrizione' : prod.description,
                        'creation' : prod.creation,
                        'last_update' : prod.last_update,
                        }
            rendered_product.append(product)

        showcase_prods = []
        showcase = Showcase.objects.last()
        if showcase:
            showcase_prods = [x.id for x in showcase.products.all()]

            showcase_prods = get_prods(showcase_prods)

            showcase_prods =  [{
                'id': prod.id,
                'url_img': prod.image,
                'titolo' : prod.title,
                'descrizione_breve' : prod.short_description,
                'descrizione' : prod.description,
                'creation' : prod.creation,
                'last_update' : prod.last_update,
            } for prod in showcase_prods]

        context = {
            'articoli': rendered_product,
            'vetrina': showcase_prods,
            'pagina': page_number,
            'pagine_totali': paginator.num_pages
        }

        if data_only:
            return JsonResponse(context, status=200)

        # 5 ultimi prodotti per ogni categoria caricati
        # tutti i prodotti vetrina
        # paginazione

        return render(request, "gui/shop.html", context)

def events(request):
    variabile = {'context': 2}
    return render(request, "gui/events.html", variabile)

def ilgioco(request):
    variabile = {'context': 2}
    return render(request, "gui/ilgioco.html", variabile)

def detail(request):
    return 0

def test(request):
    return JsonResponse({"test":"ok"}, status=200)
