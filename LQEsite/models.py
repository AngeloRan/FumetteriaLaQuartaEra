from collections.abc import Iterable
from django.db import models
import arrow

# Create your models here.

class Product(models.Model):
    
    title = models.CharField(max_length=100, null=True, blank=True)
    short_description = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    creation = models.BigIntegerField()
    last_update = models.BigIntegerField()

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs) -> None:
        
        self.creation = self.creation or int(arrow.utcnow().timestamp())
        self.last_update = int(arrow.utcnow().timestamp())
        
        return super().save(*args, **kwargs)
    
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


class Showcase(models.Model):

    title = models.CharField(max_length=100, null=True, blank=True)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return self.title