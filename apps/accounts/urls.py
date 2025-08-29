from django.urls import path
from .views import (UserRegistrationView, 
                    UserLoginView, 
                    UserLogoutView,
                    CookieTokenRefreshView)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('refresh/', CookieTokenRefreshView.as_view(), name='token-refresh')
]