import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import Drawer from '../Components/Drawer'
import Header from '../Components/Header'
import InternShipCard from '../Components/InternShipCard'
import { FlatList } from 'react-native-gesture-handler'
import { ip } from '../../constants/constant'

export default function Internship() {
    const drawerRef = useRef(null)
    const [drawer, setDrawer] = useState(false)
    const navigation = useNavigation()


    const [internships, setInternShips] = useState([])
    useEffect(() => {
        const getInternships = async () => {
            try {
                const response = await fetch(`http://${ip}:5001/internships`)
                const result = await response.json()
                const internships = result.internship
                setInternShips(internships)
            } catch (err) {
                console.log(err);
            }
        }
        getInternships()
    }, [])


    const handleoutclick = (event) => {
        const isInsideDrawer = drawerRef.current && event.target === drawerRef.current;
        if (!isInsideDrawer) {
            setDrawer(false)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={handleoutclick}>
                <View style={{ flex: 1 }}>
                    <Header setDrawer={setDrawer} />
                    <FlatList
                        data={internships}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => <InternShipCard internship={item} />} />
                </View>
            </TouchableWithoutFeedback >
            {drawer ? <Drawer ref={drawerRef} setDrawer={setDrawer} /> : null
            }

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
    }

})
