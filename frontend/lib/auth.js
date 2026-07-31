'use client';
import Cookies from 'js-cookie';

export const setAuth = (token, user) => {
  Cookies.set('token', token, { expires: 7 });
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUser = () => {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
};

export const logout = () => {
  Cookies.remove('token');
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

export const isLoggedIn = () => !!Cookies.get('token');
