from django.contrib import admin
from .models import Article, Event, Comic, Manga, TableGame, RoleGame, ActionFigure, Gadget, Product, Showcase



@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    pass

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    pass

@admin.register(Comic, Manga, TableGame, RoleGame, ActionFigure, Gadget)
class ProductAdmin(admin.ModelAdmin):
    exclude = ["creation", 'last_update']

@admin.register(Showcase)
class ShowcaseAdmin(admin.ModelAdmin):
    exclude = ["creation", 'last_update']