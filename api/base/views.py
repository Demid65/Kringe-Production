from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView, RetrieveAPIView, \
    DestroyAPIView, UpdateAPIView, CreateAPIView

from base.models import File, Course
from base.serializers import FileSerializer, CourseWithFilesSerializer, CourseSerializer


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


class SingleCourseView(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CourseWithFilesSerializer
        else:
            return CourseSerializer
