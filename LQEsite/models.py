from django.db import models

# Create your models here.

class Product(models.Model):
    
    title = models.CharField(max_length=100, null=True, blank=True)
    short_description = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    
class Article(models.Model):
    image = models.ImageField(upload_to="article/", null=True, blank=True)


class Event(models.Model):
    image = models.ImageField(upload_to="event/", null=True, blank=True)


class Comic(Product):
    image = models.ImageField(upload_to="comic/", null=True, blank=True)


class Manga(Product):
    image = models.ImageField(upload_to="manga/", null=True, blank=True)


class TableGame(Product):
    image = models.ImageField(upload_to="tablegame/", null=True, blank=True)


class RoleGame(Product):
    image = models.ImageField(upload_to="rolegame/", null=True, blank=True)


class ActionFigure(Product):
    image = models.ImageField(upload_to="actionfigure/", null=True, blank=True)


class Gadget(Product):
    image = models.ImageField(upload_to="gadget/", null=True, blank=True)



