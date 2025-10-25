// src/lib/mongoApi.ts
// API helper for MongoDB backend

const API_BASE = import.meta.env.VITE_API_BASE || 
  (import.meta.env.PROD ? 'https://crypto-premium-backend.vercel.app' : 'http://localhost:5050');

// Get token from localStorage
const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Set token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem('authToken');
};

// Generic API request function
async function apiRequest<T>(
  path: string,
  method: string = 'GET',
  body?: any,
  requiresAuth: boolean = true
): Promise<T> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include',
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    console.log(`[API] ${method} ${API_BASE}${path}`, body || '');

    const response = await fetch(`${API_BASE}${path}`, config);
    
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(`Server returned invalid JSON. Status: ${response.status}`);
    }

    console.log(`[API] Response:`, data);

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error(`[API] Error in ${method} ${path}:`, error);
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Cannot connect to server. Please ensure the backend is running on port 5050.');
    }
    throw error;
  }
}

// Auth APIs
export const authAPI = {
  register: (name: string, email: string, password: string) =>
    apiRequest('/api/auth/register', 'POST', { name, email, password }, false),

  login: (email: string, password: string) =>
    apiRequest('/api/auth/login', 'POST', { email, password }, false),

  googleAuth: (email: string, name: string, picture: string, googleId: string) =>
    apiRequest('/api/auth/google', 'POST', { email, name, picture, googleId }, false),

  logout: () =>
    apiRequest('/api/auth/logout', 'POST'),

  getMe: () =>
    apiRequest('/api/auth/me', 'GET'),
};

// User APIs
export const userAPI = {
  getStatus: () =>
    apiRequest('/api/user-status', 'GET'),

  upgrade: () =>
    apiRequest('/api/upgrade', 'POST'),
};

// Health check
export const healthCheck = () =>
  apiRequest('/api/health', 'GET', undefined, false);
