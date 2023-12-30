from django.db import models

# Create your models here.

class Product(models.Model):
    
    title = models.CharField(max_length=100)
    image = models.ImageField()
    short_description = models.CharField(max_length=200)
    description = models.TextField()
    
    class Meta: 
        abstract = True

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