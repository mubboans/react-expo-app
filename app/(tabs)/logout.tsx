import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
export default function logout() {
    return (
        <View>
            <Link href="/login">
                <Button onPress={() => {

                }} title='Go to login'></Button>
            </Link>
        </View>
    )
}