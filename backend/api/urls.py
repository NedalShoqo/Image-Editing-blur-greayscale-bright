from django.urls import path
from .views import upload_image, filter_image

urlpatterns = [
    path('upload/', upload_image),
    path('filter/<int:image_id>/', filter_image),
]