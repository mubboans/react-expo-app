import { View, Text, Button } from 'react-native'
import React from 'react'
import { Link, useRouter } from 'expo-router'
export default function logout() {
    const router = useRouter();
    return (
        <View>
            {/* <Link href="/login"> */}
            <Button onPress={() => {
                router.navigate('/login')
            }} title='Go to login'></Button>
            {/* </Link> */}
        </View>
    )
}