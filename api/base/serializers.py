from drf_yasg.utils import swagger_serializer_method
from rest_framework import serializers
from .models import File, Course, Category


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ('retrieve_count',)


class CourseForMainPageSerializer(serializers.Serializer):
    popular = serializers.SerializerMethodField()
    new = serializers.SerializerMethodField()

    class Meta:
        fields = ('popular', 'new')

    def __init__(self, *args, **kwargs):
        self.search_result_size = kwargs['context'].pop('search_result_size', 5)
        super().__init__(*args, **kwargs)

    @swagger_serializer_method(CourseSerializer)
    def get_new(self, obj):
        new_courses = Course.objects.order_by('-created_time')[:self.search_result_size]
        return CourseSerializer(new_courses, many=True).data

    @swagger_serializer_method(CourseSerializer)
    def get_popular(self, obj):
        popular_courses = Course.objects.order_by('-retrieve_count')[:self.search_result_size]
        return CourseSerializer(popular_courses, many=True).data


class CourseWithFilesSerializer(serializers.ModelSerializer):
    lectures = serializers.SerializerMethodField()
    tutorials = serializers.SerializerMethodField()
    labs = serializers.SerializerMethodField()
    shared = serializers.SerializerMethodField()
    exams = serializers.SerializerMethodField()
    additional = serializers.SerializerMethodField()
    info = serializers.SerializerMethodField()

    class CategorySerializer(serializers.Serializer):
        files = FileSerializer(many=True)

    class Meta:
        model = Course
        fields = "__all__"

    @swagger_serializer_method(CategorySerializer)
    def get_lectures(self, obj):
        lectures_files = obj.file_set.filter(category=Category.LECTURES)
        return {'files': FileSerializer(lectures_files, many=True).data}

    @swagger_serializer_method(CategorySerializer)
    def get_tutorials(self, obj):
        tutorials_files = obj.file_set.filter(category=Category.TUTORIALS)
        return {'files': FileSerializer(tutorials_files, many=True).data}

    @swagger_serializer_method(CategorySerializer)
    def get_labs(self, obj):
        labs_files = obj.file_set.filter(category=Category.LABS)
        return {'files': FileSerializer(labs_files, many=True).data}

    @swagger_serializer_method(CategorySerializer)
    def get_shared(self, obj):
        shared_files = obj.file_set.filter(category=Category.SHARED)
        return {'files': FileSerializer(shared_files, many=True).data}

    @swagger_serializer_method(CategorySerializer)
    def get_exams(self, obj):
        exams_files = obj.file_set.filter(category=Category.EXAMS)
        return {'files': FileSerializer(exams_files, many=True).data}

    @swagger_serializer_method(CategorySerializer)
    def get_additional(self, obj):
        additional_files = obj.file_set.filter(category=Category.ADDITIONAL)
        return {'files': FileSerializer(additional_files, many=True).data}

    @swagger_serializer_method(CategorySerializer)
    def get_info(self, obj):
        info_files = obj.file_set.filter(category=Category.INFO)
        return {'files': FileSerializer(info_files, many=True).data}
