import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from './../../config/firebase-config';
export default function Slider() {

    useEffect(() => {

        async function getAllDocs() {
            try {
                const Snapshot = await getDocs(collection(db, '1'))
                Snapshot.forEach((doc) => {
                    console.log(doc, 'check doc')
                })
            } catch (error) {

            }
        }
        getAllDocs();
    }, [])
    return (
        <View>
            <Text>Slider</Text>
        </View>
    )
}