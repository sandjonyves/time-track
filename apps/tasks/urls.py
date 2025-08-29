from .views import TaskSerializerViewSet
from django.urls import path


urlpatterns = [
    path('tasks/', TaskSerializerViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-list'),
    path('tasks/<int:pk>/', TaskSerializerViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='task-detail'),
]
