from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.permissions import AllowAny
from .serializers import RegisterModelSerializer, LoginUserSerializer, CustomUserSerializer
from rest_framework_simplejwt.views import TokenRefreshView
# Create your views here.

from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView
from .serializers import RegisterModelSerializer, CustomUserSerializer
from .models import CustomUser


class UserRegistrationView(CreateAPIView):
    permission_classes= [AllowAny]
    serializer_class = RegisterModelSerializer
    queryset = CustomUser.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()  

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response(
            {
                "user": CustomUserSerializer(user).data,
                "message": "User registered successfully"
            },
            status=status.HTTP_201_CREATED
        )

        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite="Strict"
        )
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=True,
            samesite="Strict"
        )

        return response


class UserLoginView(APIView):
    permission_classes= [AllowAny]
    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)  

        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user) 
            access_token = str(refresh.access_token)

            response = Response(
                {
                    "user": CustomUserSerializer(user).data,
                    "message": "User logged in successfully",
                },
                
                status=status.HTTP_200_OK
            )

            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="Strict"
            )
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite="Strict"
            )

            return response

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogoutView(APIView):
    permission_classes= [AllowAny]
    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")
        if refresh_token:
            try:
                RefreshToken(refresh_token).blacklist()
            except Exception as e:
                return Response({"detail": "Error logging out. {}".format(e)}, status=status.HTTP_400_BAD_REQUEST)
        response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response


class CookieTokenRefreshView(TokenRefreshView):
    permission_classes= [AllowAny]
    def post (self, request):

        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"message": "No refresh token provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            refresh.blacklist()
            response = Response({"message": "Token refreshed successfully"}, status=status.HTTP_200_OK)
    
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="Strict"
            )
            return response
        except InvalidToken as e:
            return Response({"detail": "Error refreshing token. {}".format(e)}, status=status.HTTP_400_BAD_REQUEST)

       