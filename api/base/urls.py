from django.urls import path

from base.views import ListFileView, SingleFileView, ListCourseView, SingleCourseView

urlpatterns = [

    path('files/', ListFileView.as_view()),
    path('files/<int:pk>', SingleFileView.as_view()),

    path('courses/', ListCourseView.as_view()),
    path('courses/<int:pk>', SingleCourseView.as_view()),
]
