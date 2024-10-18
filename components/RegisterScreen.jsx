import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // For Dropdown
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';


export default function RegisterScreen() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [role, setRole] = useState('student');  // Default role
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  // Axios Interceptor for Registration API
  axios.interceptors.response.use(
    response => response,
    error => {
      console.error("API Error: ", error);
      return Promise.reject(error);
    }
  );

  const onPressRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('https://apna-school.onrender.com/apna-school/v1/auth/register', {
        name,
        email,
        contact,
        password,
        DOB: dob,
        role,
      });

      const { token } = response.data.data;

      // Save token in AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      alert('Registration Successful!');

      // Navigate to login
      router.replace('/login');
    } catch (err) {
      console.log('Registration Error', err);
      alert('Failed to register. Please try again.');
    }
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleLoginRedirect = () => router.replace('/login');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      
      {/* Name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Contact */}
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
        keyboardType="phone-pad"
      />

      {/* Date of Birth */}
      <TextInput
        style={styles.input}
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dob}
        onChangeText={setDob}
      />

      {/* Role Dropdown */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Teacher" value="teacher" />
          <Picker.Item label="Staff" value="staff" />
        </Picker>
      </View>

      {/* Password */}
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

      {/* Confirm Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
        />
        <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
          <Feather name={isConfirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Register Button */}
      <TouchableOpacity onPress={onPressRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      {/* Redirect to Login */}
      <TouchableOpacity onPress={handleLoginRedirect} style={styles.loginRedirect}>
        <Text style={styles.linkText}>Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
  registerButton: {
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginRedirect: {
    marginTop: 10,
  },
  linkText: {
    color: Colors.primaryColor,
    textDecorationLine: 'underline',
  },
});
