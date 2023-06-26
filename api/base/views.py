from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Course
from .serializers import CourseSerializer


# Create your views here.
class CourseView(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class SingleCourseView(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class FileView(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class SingleFileView(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CategoryView(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class SingleCategoryView(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
