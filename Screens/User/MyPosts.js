import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { AuthContext } from '../../Context/AuthContext'
import Drawer from '../Components/Drawer'
// import Header from '../Components/Header'
import InternShipAdmin from '../Components/InternshipAdmin'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { color, ip } from '../../constants/constant'
import Animated, { FadeIn, FadeInDown, FadeOut, SlideInDown } from 'react-native-reanimated'
import { Bubbles } from 'react-native-loader'
import Header2 from '../Components/Header2'

export default function MyPosts() {
    const drawerRef = useRef(null)
    const [drawer, setDrawer] = useState(false)
    const navigation = useNavigation()
    const { token } = useContext(AuthContext)
    const [internship, setInternships] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`http://${ip}:5001/internships/myinternships`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status === 200)
                    return res.json();
                return Promise.reject(new Error("Failed to fetch internship"))
            })
            .then(resData => {
                console.log(resData);
                setInternships(prev => {
                    return [...resData.internships]
                })
                setLoading(false)

            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    const handleoutclick = (event) => {
        const isInsideDrawer = drawerRef.current && event.target === drawerRef.current;
        if (!isInsideDrawer) {
            setDrawer(false)
        }
    }
    if (loading) {
        return (<View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <ActivityIndicator color={color.blue} size={50} />
        </View>)
    }
    return (
        <View style={{ flex: 1 }} >
            <StatusBar backgroundColor={color.white} />

            <TouchableWithoutFeedback onPress={handleoutclick}>
                <View style={{ flex: 1 ,marginHorizontal :0}}>
                    <Header2 screenname={"My Posts"} />
                    <FlatList
                        data={internship}
                        renderItem={({ item, index }) => {
                            return (
                                <Animated.View entering={SlideInDown.duration(500).delay((index + 1) * 10)} exiting={FadeOut.duration(100)}>
                                    <InternShipAdmin internship={item} setInternships={setInternships} />
                                </Animated.View>
                            )
                        }}
                    />
                </View>
            </TouchableWithoutFeedback>
            {drawer ? <Drawer ref={drawerRef} openDrawer={setDrawer} /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden'
    },
})
