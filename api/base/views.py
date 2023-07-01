from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView, \
    DestroyAPIView, UpdateAPIView, CreateAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from base.models import File, Course
from base.serializers import FileSerializer, CourseWithFilesSerializer, CourseSerializer, CourseForMainPageSerializer


# Create your views here


class ListFileView(ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class SingleFileView(RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class ListCourseView(ListCreateAPIView):
    queryset = Course.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CourseWithFilesSerializer
        else:
            return CourseSerializer

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        courses = self.get_queryset()
        for course in courses:
            course.retrieve_count += 1
            course.save()
        return response


class SingleCourseView(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CourseWithFilesSerializer
        else:
            return CourseSerializer

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        courses = self.get_queryset()
        for course in courses:
            course.retrieve_count += 1
            course.save()
        return response


class CourseViewForMainPage(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseForMainPageSerializer(courses, context={'search_result_size': 5})
        return Response(serializer.data)
