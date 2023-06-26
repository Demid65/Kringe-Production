from django.urls import path

from base.views import CourseView, SingleCourseView, FileView, SingleFileView, SingleCategoryView, CategoryView

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="API Documentation",
        default_version='v1',
        description="API documentation for your project",
        terms_of_service="https://www.example.com/policies/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny, ],
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    path('courses/', CourseView.as_view()),
    path('courses/<int:pk>', SingleCourseView.as_view()),

    path('files/', FileView.as_view()),
    path('files/<int:pk>', SingleFileView.as_view()),

    path('categories/', CategoryView.as_view()),
    path('categories/<int:pk>', SingleCategoryView.as_view()),
]
