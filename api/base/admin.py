from django.contrib import admin

# Register your models here.
from .models import File, Course

admin.site.register(File)
admin.site.register(Course, basename="CourseData")
