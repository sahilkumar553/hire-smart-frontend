import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to add token to every request
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Request to ${config.url} - Token attached: ${token.substring(0, 10)}...`);
    } else {
      console.warn(`Request to ${config.url} - No auth token available`);
    }
    return config;
  },
  error => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    // Handle authentication errors
    if (error.response) {
      console.error(`API Error ${error.response.status} for ${error.config.url}:`, error.response.data);
      
      if (error.response.status === 401) {
        console.error('Authentication error. Token may be invalid or expired.');
        // You could redirect to login page or show a notification here
      } else if (error.response.status === 404) {
        console.error('Endpoint not found. Check URL path and API configuration.');
      }
    } else if (error.request) {
      console.error('No response received from API:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 