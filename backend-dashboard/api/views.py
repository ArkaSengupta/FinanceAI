from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta
from .serializers import (
    UserSerializer, 
    UserProfileSerializer, 
    RegisterSerializer, 
    ChangePasswordSerializer
)
from .models import UserProfile


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate tokens for the newly created user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data,
            'expires_in': 3600  # 1 hour in seconds
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response(
                {'error': 'Please provide both username and password'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user:
            if user.is_active:
                # Update last login
                user.last_login = timezone.now()
                user.save(update_fields=['last_login'])
                
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': UserSerializer(user).data,
                    'expires_in': 3600  # 1 hour in seconds
                })
            else:
                return Response(
                    {'error': 'Account is disabled'}, 
                    status=status.HTTP_401_UNAUTHORIZED
                )
        else:
            # Don't reveal whether username or password is wrong
            return Response(
                {'error': 'Invalid credentials'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )


class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.userprofile

    def get(self, request, *args, **kwargs):
        """Get user profile with user data"""
        profile = self.get_object()
        serializer = self.get_serializer(profile)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        """Update user profile"""
        profile = self.get_object()
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Profile updated successfully',
                'profile': serializer.data
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        """Partial update user profile"""
        return self.put(request, *args, **kwargs)


class ChangePasswordView(generics.UpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def update(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check old password
        if not user.check_password(serializer.validated_data.get('old_password')):
            return Response(
                {'error': 'Current password is incorrect'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Set new password
        new_password = serializer.validated_data.get('new_password')
        user.set_password(new_password)
        user.save()
        
        return Response({
            'message': 'Password updated successfully',
            'detail': 'Please log in again with your new password'
        })


class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response(
                    {'error': 'Refresh token is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Successfully logged out'})
        except Exception as e:
            return Response(
                {'error': 'Invalid token'}, 
                status=status.HTTP_400_BAD_REQUEST
            )


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer 