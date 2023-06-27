from django.db.models import fields
from rest_framework import serializers
from .models import File, CourseData


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class CourseDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseData
        fields = '__all__'
