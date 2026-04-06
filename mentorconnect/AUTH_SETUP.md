# MentorConnect Authentication Setup

This document explains the JWT-based authentication system implemented in the MentorConnect frontend.

## Overview

The frontend uses JWT (JSON Web Token) authentication with a backend API. The authentication flow includes:

1. **Login/Register** - Users authenticate via API endpoints
2. **JWT Token Management** - Tokens are stored in localStorage
3. **Auth Context** - React Context manages global authentication state
4. **Protected Routes** - Role-based access control for different user types
5. **Axios Interceptors** - Automatic token attachment to API requests

## Architecture

### Files Structure

```
src/
├── context/
│   └── AuthContext.jsx         # Global auth state management
├── services/
│   └── api.js                  # Axios instance with interceptors
├── utils/
│   └── auth.js                 # Auth utility functions
├── pages/
│   ├── login/Login.jsx         # Login page component
│   ├── register/Register.jsx   # Registration page component
│   └── dashboards/
│       ├── MentorDashboard.jsx
│       ├── MenteeDashboard.jsx
│       └── AdminDashboard.jsx
└── components/
    └── protectedRoute/ProtectedRoute.jsx  # Protected route wrapper
```

## API Configuration

**Base URL**: `http://localhost:2026/api`

### Endpoints

#### POST /auth/login
**Request**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### POST /auth/register
**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "MENTEE" | "MENTOR" | "ADMIN"
}
```

**Response**:
```json
{
  "message": "User registered successfully"
}
```

## JWT Token Details

The JWT token contains:
- `email` - User's email address
- `role` - User's role (MENTEE, MENTOR, or ADMIN)

The token is decoded on login to extract the role, which is then used for role-based redirection.

## User Roles & Redirection

After successful login, users are redirected based on their role:

| Role   | Dashboard URL         |
|--------|----------------------|
| MENTEE | `/mentee-dashboard`  |
| MENTOR | `/mentor-dashboard`  |
| ADMIN  | `/admin-dashboard`   |

## Authentication Flow

### Login Flow
1. User enters email and password on `/login`
2. Frontend sends credentials to `POST /auth/login`
3. Backend returns JWT token
4. Token is decoded to extract role and email
5. Token and role are stored in localStorage
6. Auth Context is updated with login status
7. User is redirected to their role-based dashboard

### Register Flow
1. User fills registration form on `/register`
2. Frontend sends user data to `POST /auth/register`
3. Backend validates and creates user account
4. User is redirected to `/login`
5. User logs in with their new credentials

### Protected Routes
- Wrap protected pages with `<ProtectedRoute>` component
- Specify `allowedRoles` prop for role-specific pages
- Unauthenticated users are redirected to `/login`
- Unauthorized users are redirected to `/dashboard`

### Token Management
- Token is automatically attached to all API requests via axios interceptor
- If token is expired/invalid (401 response), user is redirected to login
- Logout clears token and role from localStorage

## Environment Setup

Make sure your backend API is running on:
```
http://localhost:2026/api
```

If you need to change the base URL, update it in:
```
src/services/api.js
```

## Component Usage

### Auth Context Hook
```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { token, role, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Logged in as {role}</p>
      ) : (
        <p>Not authenticated</p>
      )}
    </div>
  );
}
```

### Protected Route
```jsx
<Route
  path="/mentor-dashboard"
  element={
    <ProtectedRoute allowedRoles={['MENTOR']}>
      <MentorDashboard />
    </ProtectedRoute>
  }
/>
```

## Testing

### Manual Testing Checklist
1. ✅ Register a new account with each role (MENTEE, MENTOR, ADMIN)
2. ✅ Login with registered credentials
3. ✅ Verify correct dashboard appears for each role
4. ✅ Test logout functionality
5. ✅ Verify protected routes redirect unauthenticated users to login
6. ✅ Verify role-based access control (e.g., MENTEE cannot access ADMIN dashboard)
7. ✅ Test error messages for invalid credentials
8. ✅ Verify token persists on page reload
9. ✅ Test navigation between protected pages

## Security Notes

⚠️ **Important**: This is a frontend implementation. For production:
- Ensure HTTPS is used
- Implement refresh token rotation
- Add CSRF protection
- Use HttpOnly cookies instead of localStorage (if possible)
- Implement proper password hashing on backend
- Add rate limiting on authentication endpoints
- Implement account lockout after failed attempts

## Troubleshooting

### "Cannot connect to API" error
- Check if backend is running on `http://localhost:2026`
- Verify API base URL in `src/services/api.js`
- Check browser console for CORS errors

### "Invalid token" after login
- Clear localStorage and try logging in again
- Verify backend JWT secret matches the token decoding
- Check if token expiration is set too short

### Role-based redirect not working
- Verify the JWT token contains the `role` field
- Check that role values match exactly (case-sensitive: MENTEE, MENTOR, ADMIN)
- Inspect browser localStorage for `userRole` key

## Related Files
- Main app setup: `src/App.jsx`
- Global styles: `src/index.css`, `src/App.css`
- Login styles: `src/pages/login/Login.css`
- Register styles: `src/pages/register/Register.css`
- Dashboard styles: `src/pages/dashboards/Dashboard.css`
