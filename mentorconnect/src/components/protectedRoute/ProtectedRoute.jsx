import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../utils/storage';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const user = getCurrentUser();
    const location = useLocation();

    if (!user) {
        // Redirect to login but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Role not authorized, redirect to dashboard or landing
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
