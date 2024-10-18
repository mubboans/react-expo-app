import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const userDetails = await AsyncStorage.getItem('userDetails');
        console.log('====================================');
        console.log(userDetails);
        console.log('====================================');
        if (userDetails) {
          router.replace('/home'); // Redirect to home if user is authenticated
        } else {
          router.replace('/login'); // Redirect to login if user is not authenticated
        }
      } catch (error) {
        console.error('Error checking authentication', error);
        router.replace('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAuthentication();
  }, [router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return null; // Return nothing while loading, as we're handling navigation
}
