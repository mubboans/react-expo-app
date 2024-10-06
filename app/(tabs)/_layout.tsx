
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/Colors';
export default function Tablayout() {
    return (

        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primaryColor
        }}>
            <Tabs.Screen options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) =>
                    <AntDesign name="home" size={24} color={color} />

            }} name="home"></Tabs.Screen>
            <Tabs.Screen options={{
                tabBarLabel: "Explore",
                tabBarIcon: ({ color }) =>
                    <Feather name="more-horizontal" size={24} color={color} />

            }} name="explore"

            ></Tabs.Screen>
            <Tabs.Screen options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ color }) =>
                    <FontAwesome name="user-circle-o" size={24} color={color} />
            }} name="profile"></Tabs.Screen>

            <Tabs.Screen options={{
                tabBarLabel: "Logout",
                tabBarIcon: ({ color }) =>
                    <AntDesign name="logout" size={24} color={color} />
            }} name='logout'></Tabs.Screen>

        </Tabs>

    )
}