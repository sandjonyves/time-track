from django.shortcuts import render
from .serializers import TaskSerializer
from rest_framework import viewsets
from .models import Task


class TaskSerializerViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
