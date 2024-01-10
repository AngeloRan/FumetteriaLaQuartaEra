from django.http import HttpResponse
from django.shortcuts import render
from django.views import View
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.core.paginator import Paginator

from LQEsite.models import *


# Create your views here.

def get_title(i):
    return i.title.lower().split()

def get_timestamp(i):
    return i.last_update

def get_prods(prods_ids):

    prods = []

    prods += list(Comic.objects.filter(product_ptr_id__in=prods_ids))
    prods += list(Manga.objects.filter(product_ptr_id__in=prods_ids))
    prods += list(TableGame.objects.filter(product_ptr_id__in=prods_ids))
    prods += list(RoleGame.objects.filter(product_ptr_id__in=prods_ids))
    prods += list(ActionFigure.objects.filter(product_ptr_id__in=prods_ids))
    prods += list(Gadget.objects.filter(product_ptr_id__in=prods_ids))

    return prods

def home(request):
    variabile = {'context': True}
    return render(request, "gui/index.html", variabile)

@require_http_methods(["GET"])
def shop(request):  

    if request.method == 'GET':

        #@TODO set it in settings
        pagination_count = 1

        data_only = request.GET.get('data_only', False)
        page = request.GET.get('page', 1)

        category = request.GET.get('category', None)
        sort = request.GET.get('sort', None)
        keyWord = request.GET.get('keyWord', None)

        product_list = []

        quantity = request.GET.get('quantity', None)

        if keyWord:
            product_list = [x.id for x in Product.objects.filter(title__icontains=keyWord)]
            product_list = get_prods(product_list)


        elif category:
            if category == 'comic':
                product_list = list(Comic.objects.all().order_by('-creation'))

            
            elif category == 'manga':
                product_list = list(Manga.objects.all().order_by('-creation'))

            
            elif category == 'tablegame':
                product_list = list(TableGame.objects.all().order_by('-creation'))

            
            elif category == 'rolegame':
                product_list = list(RoleGame.objects.all().order_by('-creation'))

            
            elif category == 'actionfigure':
                product_list = list(ActionFigure.objects.all().order_by('-creation'))

            
            elif category == 'gadget':
                product_list = list(Gadget.objects.all().order_by('-creation'))

        else:

            comic = list(Comic.objects.all().order_by('-creation')[:quantity])
            manga = list(Manga.objects.all().order_by('-creation')[:quantity])
            tablegame = list(TableGame.objects.all().order_by('-creation')[:quantity])
            rolegame = list(RoleGame.objects.all().order_by('-creation')[:quantity])
            actionfigure = list(ActionFigure.objects.all().order_by('-creation')[:quantity])
            gadget = list(Gadget.objects.all().order_by('-creation')[:quantity])
        
            product_list = comic + manga + tablegame + rolegame + actionfigure + gadget


        if sort:
            if sort == 'a-z':
                product_list = product_list.sort(reverse=False, key=get_title)
            elif sort == 'z-a':
                product_list = product_list.sort(reverse=True, key=get_title)
            elif sort == 'lastu':
                product_list = product_list.sort(reverse=True, key=get_timestamp)
            elif sort == 'firstu':
                product_list = product_list.sort(reverse=False, key=get_timestamp)


        paginator = Paginator(product_list, pagination_count)
        page_number = page
        page_obj = paginator.get_page(page_number)
        res_objs = list(page_obj)

        rendered_product = []
        for prod in res_objs:
            product =  {
                        'id': prod.id,
                        'url_img': str(prod.image),
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
                'url_img': str(prod.image),
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
            'pagine_totali': paginator.num_pages,
            'query': {
                'category': category,
                'sort' : sort,
                "keyWord": keyWord
            }
        }

        if data_only == 'true':
            return JsonResponse(context, status=200)

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
