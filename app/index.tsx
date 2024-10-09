import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const { user } = useUser();
  const rootNavigation = useRootNavigationState()
  useEffect(() => {
    checkNavLoaded()
  }, [])
  const checkNavLoaded = () => {
    if (!rootNavigation.key) return null
  }
  return user && (
    <View
      style={{
        flex: 1
      }}
    >
      {/* {
        user ? <Redirect href={'/home'} /> : <Redirect href={'/login'} />
      } */}
      <Redirect href={'/login'} />
    </View>
  )
}
