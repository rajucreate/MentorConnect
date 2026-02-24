/**
 * auth.js - Authentication logic for MentorConnect
 */
import { getUsers, saveUsers, setCurrentUser, getCurrentUser } from './storage';

export const register = (userData) => {
    const users = getUsers();
    const exists = users.find(u => u.email === userData.email);

    if (exists) {
        throw new Error('User already exists');
    }

    const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);
    return newUser;
};

export const login = (email, password) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Don't store password in session
    const sessionUser = { ...user };
    delete sessionUser.password;

    setCurrentUser(sessionUser);
    return sessionUser;
};

export const logout = () => {
    setCurrentUser(null);
};

export const isAuthenticated = () => {
    return !!getCurrentUser();
};

export const getRole = () => {
    const user = getCurrentUser();
    return user ? user.role : null;
};
