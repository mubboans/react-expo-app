import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import StorageHelper from './storageHelper';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/', // Replace with your base URL
  // baseURL: 'https://apna-school.onrender.com/', // Replace with your base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get user details from AsyncStorage
const getUserToken = async () => {
  try {
    const usertoken = await AsyncStorage.getItem('token');
    return usertoken;
  } catch (error) {
    console.error('Error fetching user Token', error);
    return null;
  }
};

// Request interceptor to attach tokens if user details are present
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getUserToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and redirection logic
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const router = useRouter();

    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized - redirect to login
      await StorageHelper.clearStorage(); // Clear the token
      router.replace('/login'); // Redirect to login screen
    }

    return Promise.reject(error);
  }
);

export default apiClient;