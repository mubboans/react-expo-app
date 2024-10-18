import { View, Text, Image } from 'react-native'
import React from 'react'
// import { useUser } from '@clerk/clerk-expo';


const Header = () => {
    // const { user } = useUser();
    // console.log(user, 'check user');
    const user = {
        fullName: "Mubashir Ansari",
        imageUrl: 'https://ucarecdn.com/e66e6e10-6880-4325-b54c-a768f32e8045/profile.png'
    }
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center'
        }}>
            <View>
                <Text style={{
                    fontFamily: 'outfit-regular',
                    fontSize: 18
                }}>Welcome</Text>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20
                }}>{user?.fullName}</Text>
            </View>
            <Image source={{ uri: user?.imageUrl }} style={{
                width: 40,
                height: 40,
                borderRadius: 99
            }} />
        </View>
    )
}

export default Header