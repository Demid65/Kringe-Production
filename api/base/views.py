from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from base.models import File, CourseData
from base.serializers import FileSerializer, CourseDataSerializer


# Create your views here


class FileView(ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class SingleFileView(RetrieveUpdateDestroyAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class CategoryView(ListCreateAPIView):
    queryset = CourseData.objects.all()
    serializer_class = CourseDataSerializer


class SingleCategoryView(RetrieveUpdateDestroyAPIView):
    queryset = CourseData.objects.all()
    serializer_class = CourseDataSerializer
