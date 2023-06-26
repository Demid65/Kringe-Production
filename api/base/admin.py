from django.contrib import admin

# Register your models here.
from .models import Course, File, Category

admin.site.register(Course)
admin.site.register(File)
admin.site.register(Category)
