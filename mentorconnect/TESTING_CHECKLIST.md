# MentorConnect Frontend - Testing Checklist

## Pre-Testing Setup

### Environment Checks
- [ ] Backend API is running on `http://localhost:2026/api`
- [ ] Frontend is running on `http://localhost:5173`
- [ ] Node modules are installed (`npm install`)
- [ ] Browser developer tools console shows no errors
- [ ] Network tab shows API requests going to correct URL

### Dependencies Verification
- [ ] axios installed (check: `npm list axios`)
- [ ] jwt-decode installed (check: `npm list jwt-decode`)
- [ ] react-router-dom installed (check: `npm list react-router-dom`)
- [ ] All other dependencies up to date

---

## Phase 1: Registration Testing

### Registration Page Access
- [ ] Navigate to `/register` - page loads successfully
- [ ] Page displays "Join MentorConnect" header
- [ ] Role selector shows 3 options: Mentee, Mentor, Admin
- [ ] Form fields are visible: Name, Email, Password

### Registration Form Validation
- [ ] Try submitting empty form - shows required field errors
- [ ] Invalid email format shows error message
- [ ] Can type in all input fields without issues
- [ ] Can select different roles (Mentee, Mentor, Admin)
- [ ] Selected role is visually highlighted

### Registration - MENTEE Role
- [ ] Register with:
  - Name: "Test Mentee"
  - Email: "mentee@test.com"
  - Password: "password123"
  - Role: "Mentee"
- [ ] Submit button shows "Creating Account..." while loading
- [ ] No error message appears
- [ ] Redirects to `/login` page after success
- [ ] Page shows success message or login form

### Registration - MENTOR Role
- [ ] Register with:
  - Name: "Test Mentor"
  - Email: "mentor@test.com"
  - Password: "password123"
  - Role: "Mentor"
- [ ] Submit button shows "Creating Account..." while loading
- [ ] No error message appears
- [ ] Redirects to `/login` page after success

### Registration - ADMIN Role
- [ ] Register with:
  - Name: "Test Admin"
  - Email: "admin@test.com"
  - Password: "password123"
  - Role: "Admin"
- [ ] Submit button shows "Creating Account..." while loading
- [ ] No error message appears
- [ ] Redirects to `/login` page after success

### Registration Error Handling
- [ ] Try registering with duplicate email - shows error
- [ ] Try registering with weak password - shows error (if backend enforces)
- [ ] Backend connection error shows appropriate message
- [ ] Error alert is visible and can be closed

### Registration Navigation
- [ ] "Already have an account? Login here" link works
- [ ] Link redirects to `/login` page
- [ ] No data is lost when navigating back and forth

---

## Phase 2: Login Testing

### Login Page Access
- [ ] Navigate to `/login` - page loads successfully
- [ ] Page displays "Welcome Back" header
- [ ] Form fields visible: Email, Password
- [ ] "Don't have an account? Register now" link is visible

### Login with MENTEE Account
- [ ] Email: "mentee@test.com"
- [ ] Password: "password123"
- [ ] Submit button shows "Logging in..." while loading
- [ ] No error message appears
- [ ] **Redirects to `/mentee-dashboard`** ✅ CRITICAL
- [ ] Dashboard shows "Mentee Dashboard" title
- [ ] Dashboard shows role as "MENTEE"

### Login with MENTOR Account
- [ ] Email: "mentor@test.com"
- [ ] Password: "password123"
- [ ] Submit button shows "Logging in..." while loading
- [ ] No error message appears
- [ ] **Redirects to `/mentor-dashboard`** ✅ CRITICAL
- [ ] Dashboard shows "Mentor Dashboard" title
- [ ] Dashboard shows role as "MENTOR"

### Login with ADMIN Account
- [ ] Email: "admin@test.com"
- [ ] Password: "password123"
- [ ] Submit button shows "Logging in..." while loading
- [ ] No error message appears
- [ ] **Redirects to `/admin-dashboard`** ✅ CRITICAL
- [ ] Dashboard shows "Admin Dashboard" title
- [ ] Dashboard shows role as "ADMIN"

### Login Error Handling
- [ ] Invalid email shows error: "Invalid email or password"
- [ ] Wrong password shows error: "Invalid email or password"
- [ ] Non-existent email shows error: "Invalid email or password"
- [ ] Backend connection error shows appropriate message
- [ ] Error alert displays clearly

### Login Form Validation
- [ ] Empty email field - shows required error
- [ ] Empty password field - shows required error
- [ ] Invalid email format - shows error
- [ ] Can retry after error without page reload

### Login Navigation
- [ ] "Don't have an account? Register now" link works
- [ ] Link redirects to `/register` page
- [ ] Can navigate back to login after registration

---

## Phase 3: Authentication State & Token Management

### Token Storage
- [ ] Open DevTools → Application → localStorage
- [ ] After login, check for `authToken` key
- [ ] Check for `userRole` key with correct value
- [ ] Token is a valid JWT (starts with `eyJ`)
- [ ] Role value matches selected role (MENTEE, MENTOR, ADMIN)

### Token Persistence
- [ ] Login as MENTEE
- [ ] Refresh page (F5)
- [ ] **Still logged in on `/mentee-dashboard`** ✅ CRITICAL
- [ ] No redirect to login
- [ ] User role still displays correctly

### Token Expiry/Invalidation
- [ ] Clear localStorage manually
- [ ] Refresh page
- [ ] **Redirected to `/login`** ✅ CRITICAL
- [ ] Cannot access dashboard routes without token

### Logout Functionality
- [ ] Login to any dashboard
- [ ] Click "Logout" button
- [ ] Redirects to home page or login
- [ ] localStorage `authToken` is removed
- [ ] localStorage `userRole` is removed
- [ ] Cannot access protected routes after logout

---

## Phase 4: Protected Routes & Role-Based Access Control

### Accessing Protected Routes Without Auth
- [ ] Clear localStorage or open in incognito
- [ ] Try to access `/mentee-dashboard` directly
- [ ] **Redirected to `/login`** ✅ CRITICAL
- [ ] Same for `/mentor-dashboard` and `/admin-dashboard`

### Role-Based Access Control
- [ ] Login as MENTEE
- [ ] Try to access `/mentor-dashboard` by URL
- [ ] **Redirected to `/dashboard`** ✅ CRITICAL (or appropriate redirect)
- [ ] Try to access `/admin-dashboard` by URL
- [ ] **Redirected to `/dashboard`** ✅ CRITICAL

### Dashboard Access by Role
- [ ] MENTEE can only access `/mentee-dashboard`
- [ ] MENTOR can only access `/mentor-dashboard`
- [ ] ADMIN can only access `/admin-dashboard`
- [ ] Navbar shows appropriate role

---

## Phase 5: UI/UX Testing

### Login Page Design
- [ ] Gradient background displays correctly
- [ ] Glassmorphic card effect is visible
- [ ] Icons display correctly in input fields
- [ ] Form is centered on page
- [ ] No horizontal scrollbar on mobile

### Register Page Design
- [ ] Gradient background matches login page
- [ ] Glassmorphic card effect is visible
- [ ] Role selector cards are visually distinct
- [ ] Selected role is highlighted clearly
- [ ] Form is centered on page

### Dashboard Design
- [ ] Gradient background displays correctly
- [ ] Dashboard card has glassmorphism effect
- [ ] Icons and styling are consistent
- [ ] Feature grid is responsive
- [ ] "Logout" button is prominent

### Input Fields
- [ ] Placeholder text is visible
- [ ] Focus state shows clear indication
- [ ] Icons are aligned properly
- [ ] Input borders are smooth

### Buttons
- [ ] Primary buttons have correct color
- [ ] Hover effect shows visual feedback
- [ ] Loading state shows spinner text
- [ ] Disabled state during loading
- [ ] Click feels responsive

### Error Messages
- [ ] Error alert has clear styling
- [ ] Error text is readable
- [ ] Error icon is visible
- [ ] Error message is specific (not generic)

### Responsive Design - Mobile (375px)
- [ ] Register/Login form fits on screen
- [ ] No horizontal scrolling
- [ ] Buttons are tap-friendly (>44px)
- [ ] Text is readable without zoom
- [ ] Role selector stacks vertically

### Responsive Design - Tablet (768px)
- [ ] Layout is balanced
- [ ] Form width is appropriate
- [ ] All elements visible without scrolling (except long content)

### Responsive Design - Desktop (1440px)
- [ ] Form is centered and not too wide
- [ ] Background animations visible
- [ ] Spacing is comfortable
- [ ] Layout is professional

---

## Phase 6: API Integration Testing

### API Request Headers
- [ ] Open DevTools → Network tab
- [ ] Login as any user
- [ ] Check POST `/auth/login` request
- [ ] Request includes correct email and password
- [ ] Response includes `token` field

### API Request Interceptor
- [ ] Login to dashboard
- [ ] Check Network tab for subsequent requests
- [ ] Requests include `Authorization: Bearer <token>` header
- [ ] Token value matches stored token

### API Response Handling
- [ ] Success response (200/201) - form submits
- [ ] Error response (400) - shows error message
- [ ] 401 response - logs out user
- [ ] Network error - shows connection error

### CORS & Network Issues
- [ ] Backend rejects request - shows error
- [ ] Network timeout - shows error message
- [ ] Server error (500) - shows error message

---

## Phase 7: Cross-Browser Testing

### Google Chrome
- [ ] Registration page works
- [ ] Login page works
- [ ] Role-based redirection works
- [ ] Token persists on refresh
- [ ] No console errors

### Firefox
- [ ] Registration page works
- [ ] Login page works
- [ ] Role-based redirection works
- [ ] Token persists on refresh
- [ ] No console errors

### Safari
- [ ] Registration page works
- [ ] Login page works
- [ ] Role-based redirection works
- [ ] Token persists on refresh
- [ ] No console errors

### Microsoft Edge
- [ ] Registration page works
- [ ] Login page works
- [ ] Role-based redirection works
- [ ] Token persists on refresh
- [ ] No console errors

---

## Phase 8: Performance Testing

### Page Load Time
- [ ] Login page loads in < 2 seconds
- [ ] Register page loads in < 2 seconds
- [ ] Dashboard pages load in < 2 seconds

### API Response Time
- [ ] Login request completes in < 1 second
- [ ] Register request completes in < 2 seconds
- [ ] Loading spinners are smooth

### Memory Leaks
- [ ] Open DevTools → Memory tab
- [ ] Perform login/logout cycle 10 times
- [ ] Memory usage doesn't increase indefinitely
- [ ] No console warnings about memory

---

## Phase 9: Security Testing

### XSS Prevention
- [ ] Try injecting JavaScript in form fields
- [ ] No scripts execute (if properly implemented)
- [ ] Input is properly escaped

### CSRF Protection
- [ ] Token is sent with requests
- [ ] API validates token origin

### Password Security
- [ ] Password field is masked (shows dots/asterisks)
- [ ] Password is not logged anywhere
- [ ] Password is not visible in localStorage

### Token Security
- [ ] Token is not exposed in URL
- [ ] Token is not visible in console logs
- [ ] Token is only stored in localStorage

---

## Critical Success Criteria

### MUST PASS (Blocker Issues)
- ✅ Registration creates users successfully
- ✅ Login returns JWT token
- ✅ MENTEE redirects to `/mentee-dashboard`
- ✅ MENTOR redirects to `/mentor-dashboard`
- ✅ ADMIN redirects to `/admin-dashboard`
- ✅ Token persists on page reload
- ✅ Logout clears token
- ✅ Unauthenticated users redirected to login
- ✅ Invalid credentials show error
- ✅ Role-based access control works

### SHOULD PASS (High Priority)
- ✅ All styling displays correctly
- ✅ Loading states show during API calls
- ✅ Error messages are clear and helpful
- ✅ Mobile responsive design works
- ✅ Smooth animations and transitions

### NICE TO HAVE (Polish)
- ✅ Glassmorphism effects look good
- ✅ Gradient backgrounds display correctly
- ✅ Form validation is comprehensive
- ✅ User experience is smooth

---

## Testing Conclusion Checklist

### Before Deployment
- [ ] All critical tests pass
- [ ] No console errors in DevTools
- [ ] No network errors in DevTools
- [ ] All three roles have been tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing complete

### Sign-Off
- [ ] Code review completed
- [ ] Security review completed
- [ ] Performance acceptable
- [ ] Ready for Phase 2 development

---

## Bug Report Template

If you find an issue, document it:

```
### Bug: [Brief Description]
- **Severity**: Critical / High / Medium / Low
- **Steps to Reproduce**:
  1. Step 1
  2. Step 2
  3. Step 3
- **Expected Behavior**: 
- **Actual Behavior**:
- **Browser**: Chrome 120 / Firefox 121 / Safari / Edge
- **Device**: Desktop / Mobile / Tablet
- **Console Error**: [If applicable, paste error message]
- **Screenshots**: [If applicable, attach screenshots]
```

---

**Test Date**: _____________  
**Tested By**: _____________  
**Overall Status**: ✅ PASS / ❌ FAIL  
**Notes**: 
