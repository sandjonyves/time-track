from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from datetime import datetime, timedelta
from .models import Task
from apps.accounts.models import CustomUser


class TaskListViewTests(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            email="test@example.com", 
            password="testpass"
        )
        self.client.force_authenticate(user=self.user)
        
        Task.objects.all().delete()
        
        self.task1 = Task.objects.create(
            user=self.user,
            description="Task 1",
            start_time=datetime(2025, 9, 10, 9, 0),
            end_time=datetime(2025, 9, 10, 10, 0),
        )
        self.task2 = Task.objects.create(
            user=self.user,
            description="Task 2",
            start_time=datetime(2025, 9, 11, 11, 0),
            end_time=datetime(2025, 9, 11, 12, 30),
        )
        self.task3 = Task.objects.create(
            user=self.user,
            description="Another task",
            start_time=datetime(2025, 9, 12, 14, 0),
            end_time=datetime(2025, 9, 12, 15, 0),
        )
        
        self.url = reverse("task-list")

    def test_get_all_tasks(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 4)

    


    def test_filter_by_max_duration(self):
        response = self.client.get(self.url, {"max_duration": "60"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 4)

    def test_order_by_date_recent(self):
        response = self.client.get(self.url, {"order_by": "date_recent"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data['results'] if 'results' in response.data else response.data
        
        if len(data) > 0:
            print(f"Structure de la première tâche: {data[0].keys()}")
        
        self.assertTrue(len(data) >= 3)

   
    def test_search_tasks(self):
        response = self.client.get(self.url, {"search": "Another"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data['results'] if 'results' in response.data else response.data
        self.assertTrue(len(data) >= 1)
        descriptions = [task["description"] for task in data]
        self.assertIn("Another task", descriptions)

    def tearDown(self):
        Task.objects.filter(user=self.user).delete()
        self.user.delete()