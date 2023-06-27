from enum import Enum

from django.db import models

# Create your models here.
from django.db import models


class Category(models.TextChoices):
    LECTURES = "LECTURES"
    TUTORIALS = "TUTORIALS"
    LABS = "LABS"
    SHARED = "SHARED"
    EXAMS = "EXAMS"
    ADDITIONAL = "ADDITIONAL"
    INFO = "INFO"


class File(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    path = models.CharField(max_length=255)
    category = models.CharField(choices=Category.choices)
    course = models.ForeignKey('base.CourseData', on_delete=models.CASCADE, null=False)


class CourseData(models.Model):
    class Meta:
        verbose_name = "Course Data"
        verbose_name_plural = "Course Data"

    id = models.AutoField(primary_key=True)
    title = models.TextField(blank=True, null=True)
