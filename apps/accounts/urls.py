from django.urls import path
from .views import (UserRegistrationView, 
                    UserLoginView, 
                    UserLogoutView,
                    CookieTokenRefreshView)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='api/register'),
    path('login/', UserLoginView.as_view(), name='api/login'),
    path('logout/', UserLogoutView.as_view(), name='api/logout'),
    path('token-refresh/', CookieTokenRefreshView.as_view(), name='api/token-refresh')
]