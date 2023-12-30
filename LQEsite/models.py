from django.db import models

# Create your models here.

class Product(models.Model):
    
    title = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    short_description = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    
class Article(models.Model):
    pass

class Event(models.Model):
    pass

class Comic(Product):
    pass

class Manga(Product):
    pass

class TableGame(Product):
    pass

class RoleGame(Product):
    pass

class ActionFigure(Product):
    pass

class Gadget(Product):
    pass
