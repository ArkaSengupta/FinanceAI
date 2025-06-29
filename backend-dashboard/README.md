# Django Backend Dashboard

A Django 5.2.3 backend with Django REST Framework and JWT authentication for your React dashboard.

## Security Features

### Password Security
- ✅ **Strong Password Validation**: Minimum 8 characters, uppercase, lowercase, and digit requirements
- ✅ **Django's Built-in Password Hashers**: Uses PBKDF2 with SHA256 by default
- ✅ **Password Confirmation**: Registration and password change require confirmation
- ⏳ **Rate Limiting**: Login attempts limited to 5 per minute per IP (to be added)
- ✅ **Secure Error Messages**: Generic error responses to prevent user enumeration

### Authentication Security
- ✅ **JWT Tokens**: Secure token-based authentication
- ✅ **Token Blacklisting**: Secure logout with token invalidation
- ✅ **Account Status Check**: Verifies user account is active before login
- ✅ **Last Login Tracking**: Updates user's last login timestamp

### General Security
- ✅ **CORS Protection**: Configured for React frontend
- ✅ **Security Headers**: XSS protection, content type sniffing prevention
- ✅ **Session Security**: HttpOnly cookies, secure session handling
- ✅ **CSRF Protection**: Configured for cross-origin requests

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

3. **Create a superuser:**
   ```bash
   python manage.py createsuperuser
   ```

4. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/token/refresh/` - Refresh JWT token

### User Management
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/` - Update user profile
- `PUT /api/auth/change-password/` - Change password
- `GET /api/auth/users/` - List all users (authenticated only)

## API Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "TestPass123",
    "password2": "TestPass123",
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "TestPass123"
  }'
```

### Access protected endpoint
```bash
curl -X GET http://localhost:8000/api/auth/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Change password
```bash
curl -X PUT http://localhost:8000/api/auth/change-password/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "old_password": "TestPass123",
    "new_password": "NewPass456",
    "new_password2": "NewPass456"
  }'
```

## Password Requirements

- Minimum 8 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Must contain at least one digit
- Cannot be too similar to username
- Cannot be a common password
- Cannot be entirely numeric

## Features

- ✅ Django 5.2.3
- ✅ Django REST Framework
- ✅ JWT Authentication with blacklisting
- ⏳ Rate limiting protection (to be added)
- ✅ CORS support for React frontend
- ✅ User registration and login
- ✅ User profile management
- ✅ Password change functionality
- ✅ Admin interface
- ✅ Media file handling
- ✅ Comprehensive security headers

## Project Structure

```
backend-dashboard/
├── backend/                 # Django project
│   ├── api/                # API app
│   │   ├── models.py       # UserProfile model
│   │   ├── serializers.py  # API serializers with security
│   │   ├── views.py        # API views with rate limiting
│   │   ├── urls.py         # API URLs
│   │   └── admin.py        # Admin configuration
│   ├── settings.py         # Django settings with security
│   └── urls.py             # Main URLs
├── manage.py               # Django management script
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## Production Security Checklist

Before deploying to production:

1. **Environment Variables**: Move SECRET_KEY to environment variables
2. **HTTPS**: Enable HTTPS and set SECURE_SSL_REDIRECT = True
3. **Debug Mode**: Set DEBUG = False
4. **Allowed Hosts**: Configure ALLOWED_HOSTS for your domain
5. **Database**: Use PostgreSQL or MySQL instead of SQLite
6. **Static Files**: Configure proper static file serving
7. **Logging**: Set up proper logging configuration
8. **Backup**: Implement database backup strategy 