from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate

class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields =('id', 'email','username')


class RegisterModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields =('id', 'email','username','password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self ,validated_data):
        user= CustomUser.objects.create_user(**validated_data)

        return user


class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        # authentification avec email
        user = authenticate(username=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password")

        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")

       
        return user