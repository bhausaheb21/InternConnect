import { useNavigation } from '@react-navigation/native'
import React, { useContext, useRef, useState } from 'react'
import { Button, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { AuthContext } from '../../Context/AuthContext'
import Drawer from '../Components/Drawer'
import Header from '../Components/Header'

export default function Chat() {
    const drawerRef = useRef(null)
    const [drawer, setDrawer] = useState(false)
    const navigation = useNavigation()
    const handleoutclick = (event) => {
        const isInsideDrawer = drawerRef.current && event.target === drawerRef.current;
        if (!isInsideDrawer) {
            setDrawer(false)
        }
    }
    return (
        <View style={{ flex: 1 }} >
            <TouchableWithoutFeedback onPress={handleoutclick}>
                <View style={{ flex: 1 }}>
                    <Header setDrawer={setDrawer} />
                    <Text>Chats</Text>
                </View>
            </TouchableWithoutFeedback>
            {drawer ? <Drawer ref={drawerRef} setDrawer={setDrawer} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
    }
})
