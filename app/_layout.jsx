// import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { SafeAreaView } from "react-native";
// import * as SecureStore from 'expo-secure-store'
// import { ClerkProvider } from '@clerk/clerk-expo';


export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const [fontLoaded] = useFonts({
    'outfit-regular': require("../assets/fonts/Outfit-Regular.ttf"),
    'outfit-bold': require("../assets/fonts/Outfit-Bold.ttf"),
    'outfit-medium': require("../assets/fonts/Outfit-Medium.ttf"),
  })
  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top, }}>
      <Stack screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login/index"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="register/index"
          options={{
            headerShown: false
          }}
        /><Stack.Screen name="forgot-password/index"
          options={{
            headerShown: false
          }}
        />
      </Stack>
    </SafeAreaView>


  );
}
