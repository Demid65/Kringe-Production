from rest_framework import serializers
from .models import File, Course, Category


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class CourseWithFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['title', 'lectures', 'tutorials', 'labs', 'shared', 'exams', 'additional', 'info']

    class FileWithCategorySerializer(serializers.Serializer):
        files = FileSerializer(many=True)

    lectures = FileWithCategorySerializer(source='get_lectures', read_only=True)
    tutorials = FileWithCategorySerializer(source='get_tutorials', read_only=True)
    labs = FileWithCategorySerializer(source='get_labs', read_only=True)
    shared = FileWithCategorySerializer(source='get_shared', read_only=True)
    exams = FileWithCategorySerializer(source='get_exams', read_only=True)
    additional = FileWithCategorySerializer(source='get_additional', read_only=True)
    info = FileWithCategorySerializer(source='get_info', read_only=True)

    def get_category_files(self, category):
        return File.objects.filter(course=self.instance, category=category)

    def get_lectures(self, obj):
        return {'files': self.get_category_files(Category.LECTURES)}

    def get_tutorials(self, obj):
        return {'files': self.get_category_files(Category.TUTORIALS)}

    def get_labs(self, obj):
        return {'files': self.get_category_files(Category.LABS)}

    def get_shared(self, obj):
        return {'files': self.get_category_files(Category.SHARED)}

    def get_exams(self, obj):
        return {'files': self.get_category_files(Category.EXAMS)}

    def get_additional(self, obj):
        return {'files': self.get_category_files(Category.ADDITIONAL)}

    def get_info(self, obj):
        return {'files': self.get_category_files(Category.INFO)}
