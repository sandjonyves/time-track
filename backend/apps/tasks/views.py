from django.shortcuts import render
from .serializers import TaskSerializer
from rest_framework import viewsets
from .models import Task
from datetime import timedelta
from rest_framework import generics, filters
from rest_framework.response import Response



class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer



class TaskListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = [
        "description",
        "start_time",
        "duration",
        "end_time",
        "start_date",
        "end_date",
    ]
    
    def paginate_queryset(self, queryset):
        """Désactive la pagination pour cette vue"""
        return None
    
    def get_paginated_response(self, data):
        """Retourne la réponse sans pagination"""
        return Response(data)
    
    def get_queryset(self):
        queryset = Task.objects.all()
        date = self.request.query_params.get("date")
        if date:
            queryset = queryset.filter(end_date=date)
        min_duration = self.request.query_params.get("min_duration")
        if min_duration:
            queryset = queryset.filter(duration__gte=timedelta(minutes=int(min_duration)))
        max_duration = self.request.query_params.get("max_duration")
        if max_duration:
            queryset = queryset.filter(duration__lte=timedelta(minutes=int(max_duration)))
        order_by = self.request.query_params.get("order_by")
        if order_by == "date_recent":
            queryset = queryset.order_by("-end_date")
        elif order_by == "date_old":
            queryset = queryset.order_by("end_date")
        elif order_by == "duration_recent":
            queryset = queryset.order_by("-duration")
        elif order_by == "duration_old":
            queryset = queryset.order_by("duration")
        return queryset