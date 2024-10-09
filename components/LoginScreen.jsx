import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Alert, Dimensions } from 'react-native';
import React, { useState } from 'react';
import logImage from "../assets/images/log_nav.png";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { Colors } from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPressLogin = React.useCallback(async () => {
    console.log('Login Pressed');

    try {
      const { createdSessionId } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'apnschool' }),
      });
      console.log(createdSessionId, 'createdSessionId');

      if (createdSessionId) {
        // Handle successful login
        // router.push('/home');
      } else {
        // Handle failed login
      }
    } catch (err) {
      console.log('OAuth error', err);
    }
  }, []);

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Forgot Password functionality not implemented.');
  };

  const handleRegister = () => {
    Alert.alert('Register', 'Register functionality not implemented.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logImage} style={styles.logo} />
        <Text style={styles.sessionExpiredText}>It Seems Your Session Expired..!</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={onPressLogin} style={styles.loginButton}>
        <AntDesign name="google" size={24} color="white" style={styles.icon} />
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.subText}>
        Your Ultimate App for all problems
      </Text>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,  // Adjusted for responsiveness
    height: width * 0.45, // Adjusted for responsiveness
    borderRadius: 20,
  },
  sessionExpiredText: {
    fontFamily: 'outfit-medium',
    fontSize: 20,  // Reduced font size for better scaling
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    width: '90%',  // Use percentage for responsiveness
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',  // Ensure inputs are responsive
  },
  loginButton: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'outfit-medium',
    fontSize: 16,
  },
  subText: {
    color: Colors.primaryColor,
    fontFamily: 'outfit-bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',  // Responsive width
  },
  linkText: {
    color: Colors.primaryColor,
    fontFamily: 'outfit-medium',
    textDecorationLine: 'underline',
  },
});
