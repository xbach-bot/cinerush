import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // Adjust according to your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for tokens if needed
Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here (e.g. 401 Unauthorized)
    return Promise.reject(error);
  }
);

export default Api;
