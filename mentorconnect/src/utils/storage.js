/**
 * storage.js - LocalStorage wrappers for MentorConnect
 */

const STORAGE_KEYS = {
  USERS: 'mc_users',
  SESSIONS: 'mc_sessions',
  MATCHES: 'mc_matches',
  CURRENT_USER: 'mc_current_user'
};

export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getSessions = () => {
  const sessions = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  return sessions ? JSON.parse(sessions) : [];
};

export const saveSessions = (sessions) => {
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
};

export const getMatches = () => {
  const matches = localStorage.getItem(STORAGE_KEYS.MATCHES);
  return matches ? JSON.parse(matches) : [];
};

export const saveMatches = (matches) => {
  localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(matches));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};
