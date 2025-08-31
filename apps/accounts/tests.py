from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken

class AuthViewsTests(APITestCase):

    def setUp(self):
        self.register_url = reverse("api/register") 
        self.login_url = reverse("api/login")      
        self.logout_url = reverse("api/logout")      
        self.refresh_url = reverse("api/token-refresh")   

      
        self.user_data = {
            "email": "testuser@example.com",
            "username": "testuser",
            "password": "password123",
        }

    def test_user_registration_sets_cookies(self):
        response = self.client.post(self.register_url, self.user_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access_token", response.cookies)
        self.assertIn("refresh_token", response.cookies)
        self.assertEqual(response.data["message"], "User registered successfully")

    def test_user_logout_deletes_cookies(self):
        user = CustomUser.objects.create_user(**self.user_data)
        refresh = RefreshToken.for_user(user)
        self.client.cookies["refresh_token"] = str(refresh)
        self.client.cookies["access_token"] = str(refresh.access_token)

        response = self.client.post(self.logout_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.cookies["access_token"].value, "")
        self.assertEqual(response.cookies["refresh_token"].value, "")
        self.assertEqual(response.data["detail"], "Successfully logged out.")

    def test_user_logout_deletes_cookies(self):
        
        user = CustomUser.objects.create_user(**self.user_data)
        refresh = RefreshToken.for_user(user)
        self.client.cookies["refresh_token"] = str(refresh)
        self.client.cookies["access_token"] = str(refresh.access_token)

        response = self.client.post(self.logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.cookies["access_token"].value, "")
        self.assertEqual(response.cookies["refresh_token"].value, "")
        self.assertEqual(response.data["detail"], "Successfully logged out.")

    def test_token_refresh_sets_new_access_token(self):
        user = CustomUser.objects.create_user(**self.user_data)
        refresh = RefreshToken.for_user(user)
        self.client.cookies["refresh_token"] = str(refresh)

        response = self.client.post(self.refresh_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access_token", response.cookies)
        self.assertEqual(response.data["message"], "Token refreshed successfully")

    def test_token_refresh_without_cookie_returns_error(self):
        response = self.client.post(self.refresh_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["message"], "No refresh token provided")