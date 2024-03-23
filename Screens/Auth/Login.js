
import {
    Image, ImageBackground,
    KeyboardAvoidingView, ScrollView, StatusBar,
    StyleSheet, Text, TextInput, TouchableOpacity, View
}
    from 'react-native';

import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

export default function Login() {

    //States
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigation = useNavigation()
    const { login } = useContext(AuthContext)

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <StatusBar backgroundColor={'#000'} />
            <ImageBackground source={require('../../assets/background.png')} style={styles.imgbackground}>
                <View style={styles.imgflex}>
                    {/* <Animated.Image entering={FadeInUp.delay(200).duration(1000)} source={require('../../assets/light.png')} style={{ height: responsiveHeight(30), width: responsiveWidth(25) }} />
                    <Animated.Image entering={FadeInUp.delay(400).duration(1000)} source={require('../../assets/light.png')} style={{ height: responsiveHeight(20), width: responsiveWidth(17) }} /> */}
                    <Animated.Text entering={FadeIn.duration(1000)} style={styles.logintext}>Login</Animated.Text>
                </View>

                <ScrollView style={styles.logincontainer}>
                    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>

                        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
                            <TextInput placeholder='Email' keyboardType="email-address" style={styles.input} value={email} onChangeText={(val) => setemail(val)} />
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
                            <TextInput placeholder='Password' style={styles.input} secureTextEntry={true} value={password} onChangeText={(value) => setpassword(value)} />
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.btnContainer}>
                            <TouchableOpacity style={styles.btn} onPress={() => login(email, password)}>
                                <Text style={{ fontWeight: '700', fontSize: responsiveFontSize(2.4), letterSpacing: 1, color: '#fff' }}>Login</Text>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.createcredentials}>
                            <Text> Don't have a account? </Text><TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={{ color: '#00A1C9' }}>SignUp</Text></TouchableOpacity>
                        </Animated.View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imgbackground: {
        width: '100%',
        height: '100%'
    },
    imgflex: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
        // flexDirection: 'row',
        // justifyContent: 'space-around'
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
        textAlign: 'center'
    },
    input: {
        width: responsiveWidth(80),
        marginVertical: responsiveHeight(2),
        borderColor: 'rgba(0,0,0,0.1)',
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
        backgroundColor: '#00A1C9',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
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
