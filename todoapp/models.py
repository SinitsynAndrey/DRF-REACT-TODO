from django.contrib.auth.models import User
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=150, unique=True, verbose_name='название категории')

    def __str__(self):
        return self.name


class TODO(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text_todo = models.TextField(verbose_name='текст')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="время добавления")
    updated_at = models.DateTimeField(auto_now=True, verbose_name='время обновления')
