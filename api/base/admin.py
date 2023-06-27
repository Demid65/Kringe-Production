from django.contrib import admin

# Register your models here.
from .models import File, CourseData

admin.site.register(File)
admin.site.register(CourseData, basename="CourseData")
