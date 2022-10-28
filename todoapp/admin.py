from django.contrib import admin

from todoapp.models import TODO, Category

admin.site.register(TODO)
admin.site.register(Category)