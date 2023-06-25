from django.db import models

# Create your models here.
from django.db import models


class Course(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class File(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    path = models.CharField(max_length=255)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)


class Category(models.Model):
    COURSE_CATEGORIES = (
        ('lectures', 'Lectures'),
        ('tutorials', 'Tutorials'),
        ('labs', 'Labs'),
        ('shared', 'Shared'),
        ('exams', 'Exams'),
        ('additional', 'Additional'),
        ('info', 'Info'),
    )
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    category = models.CharField(max_length=255, choices=COURSE_CATEGORIES)
    text = models.TextField(blank=True, null=True)
