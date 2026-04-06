# MentorConnect - A Mentoring Platform

A modern web platform connecting mentors and mentees for knowledge sharing and professional growth. Built with React, Vite, and JWT-based authentication.

## 📋 Project Status

**Phase 1: Authentication & Backend Integration** ✅ COMPLETE

### What's Implemented
- JWT-based authentication system
- Registration with role selection (MENTEE, MENTOR, ADMIN)
- Secure login with token management
- Protected routes with role-based access control
- Three role-specific dashboards
- Modern glassmorphic UI design
- Axios API integration
- Error handling and validation

### What's Next (Phase 2+)
- Dashboard functionality for each role
- Mentor-mentee matching system
- Session scheduling and management
- Progress tracking and analytics
- User profile management
- Messaging/notification system

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- Backend API running on `http://localhost:2026/api`

### Installation

```bash
# Navigate to frontend directory
cd mentorconnect

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

### Building for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
mentorconnect/
├── src/
│   ├── context/
│   │   └── AuthContext.jsx              # Global auth state
│   ├── services/
│   │   └── api.js                       # API client with interceptors
│   ├── pages/
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboards/
│   │   │   ├── MentorDashboard.jsx
│   │   │   ├── MenteeDashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   └── [other pages]
│   ├── components/
│   │   └── protectedRoute/
│   │       └── ProtectedRoute.jsx       # Route protection
│   ├── utils/
│   │   └── auth.js                      # Auth utilities
│   ├── App.jsx                          # Main app component
│   ├── main.jsx                         # Entry point
│   └── [styles and assets]
├── AUTH_SETUP.md                        # Detailed auth documentation
├── QUICK_START.md                       # Getting started guide
├── TESTING_CHECKLIST.md                 # Complete testing guide
├── package.json
└── vite.config.js
```

## 🔐 Authentication Flow

### Registration
```
User → Register Form → API (/auth/register) → Redirect to Login
```

### Login
```
User → Login Form → API (/auth/login) → 
JWT Token → Decode Role → AuthContext → 
Role-based Redirect
  - MENTEE → /mentee-dashboard
  - MENTOR → /mentor-dashboard
  - ADMIN → /admin-dashboard
```

### Token Management
```
Login → Store Token in localStorage →
Attach to All Requests (Interceptor) →
Auto-logout on 401 Response
```

## 🎨 Design Features

- **Modern Glassmorphism**: Semi-transparent frosted glass effect
- **Gradient Backgrounds**: Purple-themed gradients
- **Smooth Animations**: Floating shapes and transitions
- **Responsive Design**: Mobile-first, works on all devices
- **Loading States**: Visual feedback during API calls
- **Error Messages**: Clear, styled error displays

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19.2 |
| **Build Tool** | Vite 7.3 |
| **Routing** | React Router DOM 7.13 |
| **HTTP Client** | Axios 1.7 |
| **Authentication** | JWT with jwt-decode |
| **Icons** | Lucide React |
| **Styling** | CSS3 with modern features |

## 📚 Documentation

- **[QUICK_START.md](./mentorconnect/QUICK_START.md)** - Get started in 5 minutes
- **[AUTH_SETUP.md](./mentorconnect/AUTH_SETUP.md)** - Detailed authentication architecture
- **[TESTING_CHECKLIST.md](./mentorconnect/TESTING_CHECKLIST.md)** - Complete testing guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was built and how

## 🔗 API Requirements

The frontend expects the following API endpoints on `http://localhost:2026/api`:

### POST /auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /auth/register
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "MENTEE" | "MENTOR" | "ADMIN"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

**JWT Token Requirements:**
The token must contain:
- `email` - User's email address
- `role` - User's role (MENTEE, MENTOR, or ADMIN)

## 🧪 Testing

### Quick Test
1. Start the development server
2. Go to http://localhost:5173/register
3. Create an account with any role
4. Login with your credentials
5. Verify you're redirected to the correct dashboard

### Complete Testing
See [TESTING_CHECKLIST.md](./mentorconnect/TESTING_CHECKLIST.md) for comprehensive testing guide covering:
- Registration with all roles
- Login functionality
- Token persistence
- Protected routes
- Role-based access control
- UI/UX testing
- Cross-browser compatibility
- Security testing

## ⚙️ Configuration

### Change API URL
Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-api-url/api';
```

### Environment Variables (Future)
Create `.env` file in `mentorconnect/`:
```
VITE_API_BASE_URL=http://localhost:2026/api
```

## 🔒 Security Considerations

### Current Implementation
- ✅ JWT token storage in localStorage
- ✅ Token attachment via request interceptor
- ✅ Automatic logout on 401 response
- ✅ Protected routes with auth checks
- ✅ Role-based access control

### Production Recommendations
- 🔐 Use HTTPS only
- 🔐 Implement token refresh/rotation
- 🔐 Use HttpOnly cookies instead of localStorage
- 🔐 Add CSRF protection
- 🔐 Implement rate limiting on auth endpoints
- 🔐 Add comprehensive input validation
- 🔐 Use secure password hashing on backend
- 🔐 Implement account lockout mechanisms
- 🔐 Add audit logging for security events

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Components** | 15+ |
| **Pages** | 5+ |
| **Lines of Code** | 3000+ |
| **CSS Animations** | 10+ |
| **API Endpoints** | 2 implemented |
| **Authentication Methods** | JWT |
| **User Roles** | 3 (MENTEE, MENTOR, ADMIN) |

## 🎯 Core Features

### ✅ Implemented (Phase 1)
- [x] User registration with role selection
- [x] Secure login with JWT
- [x] JWT token management
- [x] Auth Context for state management
- [x] Protected route components
- [x] Role-based access control
- [x] Role-specific dashboards
- [x] Logout functionality
- [x] Axios API integration
- [x] Error handling
- [x] Modern UI design
- [x] Input validation
- [x] Loading states

### 🔄 Planned (Phase 2)
- [ ] Dashboard functionality
- [ ] Mentor-mentee matching
- [ ] Session scheduling
- [ ] Progress tracking
- [ ] User profiles
- [ ] Messaging system

### 🚀 Future Enhancements (Phase 3+)
- [ ] Notifications
- [ ] File uploads
- [ ] Search functionality
- [ ] Two-factor authentication
- [ ] OAuth integration
- [ ] Analytics dashboard
- [ ] Admin panel

## 🐛 Known Issues

None at this time. See [TESTING_CHECKLIST.md](./mentorconnect/TESTING_CHECKLIST.md) for complete test coverage.

## 📞 Support

For detailed information:
- Architecture: See [AUTH_SETUP.md](./mentorconnect/AUTH_SETUP.md)
- Getting Started: See [QUICK_START.md](./mentorconnect/QUICK_START.md)
- Testing: See [TESTING_CHECKLIST.md](./mentorconnect/TESTING_CHECKLIST.md)
- Implementation: See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

## 📝 License

This project is part of the MentorConnect platform.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for React development.

---

## Next Steps

1. ✅ Start development server: `npm run dev`
2. ✅ Test registration and login
3. ✅ Verify role-based redirection
4. ✅ Review [TESTING_CHECKLIST.md](./mentorconnect/TESTING_CHECKLIST.md)
5. 🔄 Begin Phase 2 dashboard development

**Status**: Phase 1 Complete ✅ | Ready for Phase 2 🚀

Last Updated: April 6, 2026
