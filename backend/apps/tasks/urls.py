from .views import TaskViewSet,TaskListView
from django.urls import path


urlpatterns = [
    path('tasks/', TaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='task-list'),
    path("tasks/filter/", TaskListView.as_view(), name="task-list-filter"),
    path('tasks/<int:pk>/', TaskViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='task-detail'),
]
