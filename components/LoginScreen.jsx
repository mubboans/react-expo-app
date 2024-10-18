import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { AntDesign, Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native'; // Import Lottie

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onPressLogin = React.useCallback(async () => {
    console.log('Login Pressed');

    try {
      console.log('Login Hit');
    } catch (err) {
      console.log('OAuth error', err);
    }
  }, []);

  const handleForgotPassword = () => {
    router.navigate('/forgot-password');
  };

  const handleRegister = () => {
    router.navigate('/register');
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {/* Lottie Animation */}
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../assets/lottie/lott_login.json')} // Lottie animation file path
          autoPlay
          loop
          style={{ flex: 1 }} // Styling the Lottie animation
        />
      </View>

      <View style={styles.logoContainer}>
        {/* <Image source={require('../assets/images/log_nav.png')} style={styles.logo} /> */}
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={onPressLogin} style={styles.loginButton}>
        <AntDesign name="login" size={24} color="white" style={styles.icon} />
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.subText}>Your Ultimate App for all problems</Text>

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
    marginTop: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  lottieContainer: {
    height: 300,
    aspectRatio: 1
  },
  lottieAnimation: {
    flex: 1
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: width * 0.45,
    borderRadius: 20,
  },
  sessionExpiredText: {
    fontFamily: 'outfit-medium',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
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
    width: '90%',
  },
  linkText: {
    color: Colors.primaryColor,
    fontFamily: 'outfit-medium',
    textDecorationLine: 'underline',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
});
