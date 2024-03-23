// import { StatusBar } from 'expo-status-bar';
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import Animated, { BounceIn, BounceInLeft, FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'; import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
// import { registerEventHandler } from 'react-native-reanimated/lib/typescript/reanimated2/core';
import { AuthContext } from '../../Context/AuthContext';
import { color } from '../../constants/constant';


export default function SignUp() {
    const navigation = useNavigation()

    const { register } = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("")
    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar backgroundColor={'#000'} />
            <ImageBackground source={require('../../assets/background.png')} style={styles.imgbackground}>
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
                    <Animated.Text entering={FadeIn.duration(500)} style={styles.logintext}>Sign Up</Animated.Text>
                </View>
                <ScrollView style={styles.logincontainer}>
                    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>

                        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                            <TextInput placeholder='Name' style={styles.input} value={name} onChangeText={(val) => { setname(val) }} />
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
                            <TextInput placeholder='Email' style={styles.input} value={email} onChangeText={(val) => setEmail(val)} />
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
                            <TextInput cursorColor={'#fff'} placeholder='Password' style={styles.input} value={password} secureTextEntry={true} onChangeText={(val) => setpassword(val)} />
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={() => register(email, password, name)}>
                                <Text style={{ fontWeight: '700', fontSize: responsiveFontSize(2.4), letterSpacing: 1, color: '#fff' }}>Register</Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.createcredentials}>
                            <Text> Already have a account? </Text><TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ color: '#00A1C9' }}>SignIn</Text></TouchableOpacity>
                        </Animated.View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: responsiveHeight(100),
        backgroundColor: '#fff',
    },
    imgbackground: {
        width: responsiveWidth(100),
        height: responsiveHeight(100)
    },
    imgflex: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    logincontainer: {
        flex: 1,
        // alignItems: 'center'
    },
    logintext: {
        fontSize: responsiveFontSize(4),
        fontWeight: '700',
        letterSpacing: 1,
        fontFamily: 'Roboto',
        textAlign: 'center',
        marginTop: responsiveHeight(6),
        // marginBottom:responsiveHeight(8)
    },
    input: {
        width: responsiveWidth(80),
        marginVertical: responsiveHeight(2),
        borderColor: color.border,
        borderWidth: 1,
        paddingVertical: responsiveHeight(1),
        textAlign: 'center',
        fontSize: responsiveFontSize(2),
        borderRadius: responsiveWidth(5),
        fontWeight: '700',
        letterSpacing: 1
    },
    btnContainer: {
        width: responsiveWidth(70),
        height: responsiveHeight(6),

        borderRadius: responsiveHeight(2),
        marginTop: responsiveHeight(2),
        backgroundColor: color.blue,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: color.shadow,
        elevation: 2
    },
    btn: {
        height: '98%',
        width: '99%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
        borderRadius: responsiveHeight(2),
    },
    createcredentials: {
        flexDirection: 'row',
        marginTop: responsiveHeight(1.5),
        gap: responsiveWidth(0.5)
    }

});
