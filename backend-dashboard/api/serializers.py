from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'date_joined')


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'bio', 'role', 'client', 'avatar', 'created_at', 'updated_at')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password],
        min_length=8,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        # Additional password strength validation
        password = attrs['password']
        if len(password) < 8:
            raise serializers.ValidationError({"password": "Password must be at least 8 characters long."})
        
        if not any(char.isdigit() for char in password):
            raise serializers.ValidationError({"password": "Password must contain at least one digit."})
        
        if not any(char.isupper() for char in password):
            raise serializers.ValidationError({"password": "Password must contain at least one uppercase letter."})
        
        if not any(char.islower() for char in password):
            raise serializers.ValidationError({"password": "Password must contain at least one lowercase letter."})
        
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        required=True,
        validators=[validate_password],
        min_length=8,
        style={'input_type': 'password'}
    )
    new_password2 = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "New password fields didn't match."})
        
        # Additional password strength validation
        new_password = attrs['new_password']
        if len(new_password) < 8:
            raise serializers.ValidationError({"new_password": "Password must be at least 8 characters long."})
        
        if not any(char.isdigit() for char in new_password):
            raise serializers.ValidationError({"new_password": "Password must contain at least one digit."})
        
        if not any(char.isupper() for char in new_password):
            raise serializers.ValidationError({"new_password": "Password must contain at least one uppercase letter."})
        
        if not any(char.islower() for char in new_password):
            raise serializers.ValidationError({"new_password": "Password must contain at least one lowercase letter."})
        
        return attrs 