import React, { forwardRef, useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigation } from '@react-navigation/native'

export default Drawer = forwardRef(({drawer, setDrawer},ref) => {
    const navigation = useNavigation();
    const { name, email, logout } = useContext(AuthContext)
    return (
        <Animated.View entering={FadeInLeft.duration(400)} exiting={FadeOutLeft.duration(300)} style={[styles.drcontainer, { left: drawer ? responsiveWidth(-60) : null }]} >
            <TouchableOpacity style={{ marginTop: responsiveHeight(2), marginRight: responsiveHeight(1) }} onPress={() => { setDrawer(false) }}>
                <Image source={require('../../assets/close1.png')} style={{ height: responsiveHeight(2.5), width: responsiveHeight(2.5), alignSelf: 'flex-end' }} />
            </TouchableOpacity>
            <View style={styles.profilesection}>
                <Image source={require('../../assets/user.png')} style={{ height: responsiveHeight(12), width: responsiveHeight(12) }} />
                <Text style={{ marginTop: responsiveHeight(4), fontSize: responsiveFontSize(2.1), fontWeight: '700' }}>{name}</Text>
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '600', color: 'grey' }}>View Profile</Text>
            </View>
            <View style={styles.navigation}>
                <TouchableOpacity style={[styles.nav_item]} onPress={() => { navigation.navigate('Home'); setDrawer(false) }}>
                    <Image source={require('../../assets/home.png')} style={{ height: responsiveHeight(2.6), width: responsiveHeight(2.6) }} />
                    <Text style={styles.navtext}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.nav_item]} onPress={() => { navigation.navigate('Internship'); setDrawer(false) }}>
                    <Image source={require('../../assets/graduate.png')} style={{ height: responsiveHeight(3), width: responsiveHeight(3) }} />
                    <Text style={styles.navtext}>Internship</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.nav_item, { alignContent: 'center' }]} onPress={() => {
                    navigation.navigate('Chats');
                    setDrawer(false)
                }}>
                    <Image source={require('../../assets/comment.png')} style={{ height: responsiveHeight(2.7), width: responsiveHeight(2.7) }} />
                    <Text style={[styles.navtext, { marginBottom: responsiveWidth(1) }]}>Messages</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.nav_item, { alignContent: 'center' }]} onPress={() => {
                    navigation.navigate('Post Internship');
                    setDrawer(false)
                }}>
                    <Image source={require('../../assets/smartphone.png')} style={{ height: responsiveHeight(3.3), width: responsiveHeight(3.2) }} />
                    <Text style={[styles.navtext, { marginBottom: responsiveWidth(1) }]}>Post Opportunity</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.nav_item, { alignContent: 'center' }]} onPress={() => {
                    navigation.navigate('My Posts');
                    setDrawer(false)
                }}>
                    <Image source={require('../../assets/yourposts.png')} style={{ height: responsiveHeight(3), width: responsiveHeight(3) }} />
                    <Text style={[styles.navtext, { marginBottom: responsiveWidth(1) }]}>My Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.nav_item, { alignContent: 'center' }]}>
                    <Image source={require('../../assets/settings.png')} style={{ height: responsiveHeight(2.7), width: responsiveHeight(2.7) }} />
                    <Text style={[styles.navtext, { marginBottom: responsiveWidth(1) }]}>Setting</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.logoutbtn}>
                <TouchableOpacity style={[styles.controller, { flexDirection: 'row', gap: responsiveWidth(3) }]} onPress={logout}>
                    <Image source={require('../../assets/logout.png')} style={{ height: responsiveHeight(3), width: responsiveHeight(3) }} tintColor={'red'} />
                    <Text style={{ fontSize: responsiveFontSize(2), fontFamily: 'Roboto', fontWeight: '700', letterSpacing: 1, color: "red" }}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.controller, { flexDirection: 'row', gap: responsiveWidth(3) }]} onPress={() => { setDrawer(false) }}>
                    <Image source={require('../../assets/close.png')} style={{ height: responsiveHeight(3), width: responsiveHeight(3) }} />
                    <Text style={{ fontSize: responsiveFontSize(2), fontFamily: 'Roboto', fontWeight: '700', letterSpacing: 1, color: "red" }}>Close</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
})

const styles = StyleSheet.create({
    drcontainer: {
        position: 'absolute',
        // marginLeft : responsiveWidth(3),
        zIndex: 1,
        elevation: 1,
        backgroundColor: '#ffffff',
        width: responsiveWidth(65),
        height: responsiveHeight(100),
        left:0,
        bottom: 0,
        shadowColor: '#000',
        shadowColor: 0.7,
        elevation: 5
    },
    profilesection: {
        flexDirection: 'column',
        // gap: -17,
        alignItems: 'center',
        borderBottomColor: '#999999',
        borderBottomWidth: 1,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(3),
        borderBottomRightRadius: 5,
        // shadowColor: '#000',
        // elevation: 1
        // gap:0

    },
    logoutbtn: {
        position: 'absolute',
        bottom: responsiveHeight(4),
        borderTopWidth: 1,
        borderTopColor: '#999999',
        width: '100%',
        height: responsiveHeight(8),
        gap: responsiveHeight(1),
        // marginLeft: responsiveWidth(10),
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    nav_item: {
        flexDirection: 'row',
        height: responsiveHeight(7),
        width: '100%',
        // alignContent: 'center',
        alignItems: 'center',
        // justifyContent: 'center',
        shadowColor: '#000',
        elevation: 1,
        marginLeft: responsiveWidth(5)
    },
    navtext: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: '700',
        paddingLeft: responsiveWidth(5),
    },
    controller: {
        paddingLeft: responsiveWidth(10),
        paddingVertical: responsiveHeight(1)
    }
})