import { View, Text, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import logImage from "../assets/images/log_nav.png"
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser"
import * as WebBrowser from "expo-web-browser"
import { Colors } from '@/constants/Colors'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons'
WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  const router = useRouter();
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })
  const onPress = React.useCallback(async () => {
    console.log('onPress Hit');

    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow(
        {
          redirectUrl: Linking.createURL('/home', { scheme: 'apnschool' }),
        }
      )
      console.log(createdSessionId, 'createdSessionId');

      if (createdSessionId) {
        // setActive({ session: createdSessionId })
        // router.push('/home');
      } else {
        // console.log('enter in else blcok');
        // router.push('/home');
      }
    } catch (err) {
      console.log('OAuth error', err)
    }
  }, [])
  return (
    <View>
      <View style={
        {
          margin: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }
      }>
        <Image source={logImage}
          style={{
            width: 220,
            height: 180,
            borderRadius: 20,
            // borderColor: "black",
            // borderWidth: 2
          }}
        />
        <Text style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'outfit-medium',
          fonstSize: 30
        }}>Its Seem Your Session Expired..!</Text>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: Colors.primaryColor,
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center', // Align items center vertically
            justifyContent: 'center' // Center content horizontally
          }}
        >
          <AntDesign name="google" size={24} color="white" style={{ marginRight: 10 }} />
          <Text
            style={{
              color: '#fff',
              fontFamily: 'outfit-medium',
              fontSize: 16
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        {/* Subtext */}
        <Text style={{
          color: Colors.primaryColor,
          fontFamily: 'outfit-bold',
          marginTop: 20
        }}>
          Your Ultimate App for all problems
        </Text>
      </View>
    </View>
  )
}