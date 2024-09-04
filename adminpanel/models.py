from django.conf import settings
from django.db import models
from enum import Enum
from django.contrib.auth.models import AbstractUser


class Item(models.Model):
    name = models.CharField(unique=True, max_length=100)
    price = models.PositiveSmallIntegerField()
    stock = models.PositiveSmallIntegerField()
    add_time = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.PROTECT, related_name="order_item")
    quantity = models.PositiveSmallIntegerField()
    discount = models.FloatField()
    price = models.PositiveSmallIntegerField()
    
class EditType(Enum):
    PRICE = 'price'
    STOCK = 'stock'

class Edit(models.Model):
    item = models.ForeignKey(Item, on_delete=models.PROTECT, related_name="edits")
    edit_time = models.DateTimeField(auto_now_add=True)
    edit_type = models.CharField(max_length=10, choices=[(tag.value, tag.value) for tag in EditType])
    value = models.PositiveSmallIntegerField()

class Order(models.Model):
    order_time = models.PositiveIntegerField()
    total = models.PositiveSmallIntegerField()

#USERS
class UserGroup(models.Model):
    name = models.CharField(unique=True, max_length=50)

class User(AbstractUser):
    email = models.EmailField(blank=False, max_length=255, verbose_name='email', unique=True)
    group = models.ForeignKey(UserGroup, on_delete=models.PROTECT)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


#TASKS
class Task(models.Model):
    name = models.CharField(max_length=50, unique=True)
        
class GroupTaskPermission(models.Model):
    group = models.ForeignKey(UserGroup, on_delete=models.PROTECT)
    task = models.ForeignKey(Task, on_delete=models.PROTECT)

    class Meta:
        unique_together = (('group', 'task'),)