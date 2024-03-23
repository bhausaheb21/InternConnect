import React, { forwardRef, useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { color } from '../../constants/constant'
import { useNavigation } from '@react-navigation/native'



export default Header = forwardRef(({setDrawer}, ref) => {
    const navigation = useNavigation()


    return (
        <Animated.View style={styles.header}>
            <TouchableOpacity onPress={() => setDrawer(true)}>
                <Image source={require('../../assets/menu.png')} style={{ height: responsiveHeight(5), width: responsiveHeight(5), tintColor: color.blue, marginLeft: responsiveWidth(3) }} />
            </TouchableOpacity>
            <Text style={{ fontSize: responsiveFontSize(2.5), marginRight: responsiveWidth(4), fontWeight: '700', fontFamily: 'Roboto' }}>InternConnect</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
                <Image source={require('../../assets/chat.png')} style={{ height: responsiveHeight(3), width: responsiveHeight(3), tintColor: color.blue, marginRight: responsiveWidth(3) }} />
            </TouchableOpacity>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    header: {
        height: responsiveHeight(7),
        width: responsiveScreenWidth(100),
        flexDirection: 'row',
        paddingHorizontal: responsiveWidth(2),
        justifyContent: 'space-between',
        backgroundColor: color.white,
        alignItems: 'center',
        
    }
})
