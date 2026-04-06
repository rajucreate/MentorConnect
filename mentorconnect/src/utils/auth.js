/**
 * auth.js - Authentication logic for MentorConnect (JWT-based)
 */
import { jwtDecode } from 'jwt-decode';
import { loginAPI, registerAPI } from '../services/api';

export const register = async (userData) => {
    try {
        const response = await registerAPI(userData.name, userData.email, userData.password, userData.role);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const login = async (email, password) => {
    try {
        const response = await loginAPI(email, password);
        const { token } = response.data;

        // Decode JWT to extract role and email
        const decoded = jwtDecode(token);

        // Store token and role
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', decoded.role);

        return {
            token,
            role: decoded.role,
            email: decoded.email,
        };
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Invalid email or password');
    }
};

export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};

export const getRole = () => {
    return localStorage.getItem('userRole');
};

export const getToken = () => {
    return localStorage.getItem('authToken');
};
