# MentorConnect Frontend - Quick Start Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- Backend API running on `http://localhost:2026/api`

## Installation

1. **Navigate to the project directory**:
   ```bash
   cd mentorconnect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**:
   Visit `http://localhost:5173` (or the URL shown in terminal)

## Authentication System Overview

This frontend implements a **JWT-based authentication system** that works with your backend API.

### Key Features

✅ **Registration** - Users can create accounts with different roles (MENTEE, MENTOR, ADMIN)  
✅ **Login** - Secure JWT token-based authentication  
✅ **Protected Routes** - Role-based access control  
✅ **Auth Context** - Global state management for authentication  
✅ **API Integration** - Axios with automatic token attachment  
✅ **Modern UI** - Glassmorphism design with gradient backgrounds  

## Project Structure

```
src/
├── context/AuthContext.jsx           # Auth state management
├── services/api.js                   # API client with interceptors
├── pages/
│   ├── login/Login.jsx               # Login page
│   ├── register/Register.jsx         # Registration page
│   └── dashboards/
│       ├── MentorDashboard.jsx       # Mentor dashboard (MENTOR role)
│       ├── MenteeDashboard.jsx       # Mentee dashboard (MENTEE role)
│       └── AdminDashboard.jsx        # Admin dashboard (ADMIN role)
├── components/
│   └── protectedRoute/ProtectedRoute.jsx  # Route protection wrapper
├── utils/auth.js                     # Auth utility functions
├── App.jsx                           # Main app component
└── main.jsx                          # Entry point
```

## How It Works

### 1. Registration
- User fills out form with: name, email, password, and role
- Frontend sends POST request to `/api/auth/register`
- User is redirected to login page

### 2. Login
- User enters email and password
- Frontend sends POST request to `/api/auth/login`
- Backend returns JWT token
- Token is decoded to extract role and email
- User is redirected to their role-specific dashboard:
  - MENTEE → `/mentee-dashboard`
  - MENTOR → `/mentor-dashboard`
  - ADMIN → `/admin-dashboard`

### 3. Protected Routes
- Pages wrapped with `<ProtectedRoute>` require authentication
- Unauthenticated users are redirected to `/login`
- Role-based access control redirects unauthorized users

### 4. API Requests
- All API requests automatically include the JWT token
- Token is sent in `Authorization: Bearer <token>` header
- If token expires (401 response), user is logged out and redirected to login

## Testing the Authentication

### Test Credentials (If Backend Provides Demo Data)
Create test accounts by registering with different roles:

1. **Register as MENTEE**:
   - Email: `mentee@example.com`
   - Password: `test123`
   - Click "Create Account" → Login → See Mentee Dashboard

2. **Register as MENTOR**:
   - Email: `mentor@example.com`
   - Password: `test123`
   - Click "Create Account" → Login → See Mentor Dashboard

3. **Register as ADMIN**:
   - Email: `admin@example.com`
   - Password: `test123`
   - Click "Create Account" → Login → See Admin Dashboard

## Important Configuration

### Backend API URL
The frontend is configured to connect to:
```
http://localhost:2026/api
```

If your backend runs on a different URL, update it in:
```
src/services/api.js
```

Change:
```javascript
const API_BASE_URL = 'http://localhost:2026/api';
```

To your actual backend URL.

## API Endpoints

Your backend should implement these endpoints:

### POST /auth/register
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "MENTEE" | "MENTOR" | "ADMIN"
}
```

### POST /auth/login
```json
{
  "email": "string",
  "password": "string"
}
```

Response should include a JWT token with `email` and `role` claims.

## Features Implemented

### ✅ Phase 1 (Current)
- [x] Registration page with role selection
- [x] Login page with JWT token handling
- [x] Auth Context for global state
- [x] JWT token decoding for role extraction
- [x] Protected routing with role-based access control
- [x] Axios API client with request/response interceptors
- [x] Automatic token attachment to requests
- [x] Role-based dashboard redirection
- [x] Logout functionality
- [x] Modern glassmorphic UI design
- [x] Input validation and error messages
- [x] Loading states for async operations

### Future Phases (Not Yet Implemented)
- Dashboard functionality for each role
- Mentor-mentee matching system
- Session scheduling
- Progress tracking
- User profile management

## Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://localhost:2026/api`
- Check browser console for CORS or network errors
- Verify backend is accepting requests from `http://localhost:5173`

### Login Fails with "Invalid email or password"
- Ensure the account was created via registration
- Check that email and password are correct (case-sensitive)
- Verify backend is properly storing user credentials

### Token Not Persisting
- Check browser's localStorage for `authToken` and `userRole` keys
- Clear localStorage and try logging in again
- Check if browser is blocking localStorage (privacy mode)

### Wrong Dashboard After Login
- Verify JWT token contains correct `role` claim
- Check that role values are uppercase: MENTEE, MENTOR, ADMIN
- Open browser DevTools and check localStorage for `userRole` value

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Notes

- Modern glassmorphic design with animations
- Smooth transitions and loading states
- Optimized bundle size with Vite
- Lazy-loaded route components (future enhancement)

## Security Reminders

⚠️ **For Development Only**: This is a development setup. For production:
- Use HTTPS (TLS/SSL)
- Implement token refresh mechanisms
- Add CSRF protection
- Use secure HTTP-only cookies
- Implement proper server-side session management
- Add comprehensive error logging
- Implement rate limiting

## Support & Documentation

For more detailed information, see:
- `AUTH_SETUP.md` - Detailed authentication architecture
- `src/App.jsx` - Main application component
- `src/context/AuthContext.jsx` - Auth state management
- `src/services/api.js` - API client configuration

## Next Steps

1. ✅ Start the development server
2. ✅ Test registration with different roles
3. ✅ Test login functionality
4. ✅ Verify role-based redirection
5. ✅ Build out dashboard features in Phase 2

Happy coding! 🚀
