from django.contrib import admin

# Register your models here.
from base import models

admin.site.register(models.Course)
admin.site.register(models.File)
admin.site.register(models.Category)
