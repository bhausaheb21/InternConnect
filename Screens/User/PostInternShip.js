import { useNavigation } from '@react-navigation/native'
import React, { useContext, useRef, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, Image, TouchableWithoutFeedback, View, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../Context/AuthContext'
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown, SlideInRight } from 'react-native-reanimated'
import Drawer from '../Components/Drawer'
import Header from '../Components/Header'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { color, ip } from '../../constants/constant'
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message'

export default function PostInternShip() {
    const drawerRef = useRef(null)
    const { token } = useContext(AuthContext);
    const [start_date, setstartDate] = useState(new Date())
    const [s_visible, setsvisible] = useState(false);
    const [end_date, setendDate] = useState(new Date())
    const [e_visible, setevisible] = useState(false);
    const [drawer, setDrawer] = useState(false)
    const navigation = useNavigation()
    const { logout } = useContext(AuthContext)


    // Field Hooks
    const [title, setTitle] = useState("");
    const [company_name, setCompany] = useState("");
    const [location, setlocation] = useState("")
    const [skills, setskills] = useState([]);
    const [skill, setskill] = useState("");
    const [about, setAbout] = useState();
    const [abouts, setAbouts] = useState([])
    const [no_of_opening, setopening] = useState(0)




    const handleoutclick = (event) => {
        const isInsideDrawer = drawerRef.current && event.target === drawerRef.current;
        if (!isInsideDrawer) {
            setDrawer(false)
        }
    }

    const postInternship = () => {
        console.log("Post Internship called");
        fetch(`http://${ip}:5001/internships`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                title, company_name, location, start_date, expiry_date: end_date, skills, About: abouts, no_of_opening
            })
        })
            .then(res => {
                console.log(res);
                if (res.status == 201)
                    return res.json();
                return Promise.reject(new Error("Internship posting failed"));
            })
            .then(result => {
                console.log(result);
                Toast.show({
                    type: 'success',
                    text1: result.msg,
                    autoHide: 2000,
                    position: 'top',
                    text1Style: { fontSize: responsiveFontSize(2), fontFamily: "Roboto" },
                })

                setTimeout(() => {
                    navigation.navigate('My Posts')
                }, 3000)
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    text1: err.message,
                    autoHide: 4000,
                    position: 'top',
                    text1Style: { fontSize: responsiveFontSize(2), fontFamily: 'Roboto', letterSpacing: 1 }
                })
            })
        setAbouts([]);
        setTitle('');
        setCompany("");
        setendDate(new Date());
        setlocation('');
        setopening(0);
        setskills([]);
        setskill('');
        setstartDate(new Date())
    }

    const removeSkill = (value) => {
        setskills(prev => {
            return prev.filter((val) => {
                return value.toString() !== val.toString();
            })
        })
    }

    const removeAbout = (value) => {
        console.log(value);
        setAbouts(prev => {
            return prev.filter((val) => {
                return value.toString() !== val.toString();
            })
        })
    }
    return (
        <View style={{ flex: 1 }} >
            <TouchableWithoutFeedback onPress={handleoutclick}>
                <View style={{ flex: 1 }}>
                    <Header setDrawer={setDrawer} />
                    <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                        <ScrollView style={[styles.logincontainer, styles.scrollViewContainer]} showsVerticalScrollIndicator={false}>
                            <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.input}>
                                    <View style={styles.iplabelwrapper}>
                                        <View style={styles.autoSizedView}>
                                            <Text style={styles.iplabel}>Title</Text>
                                        </View>
                                    </View>
                                    <TextInput style={styles.ipcont} value={title} onChangeText={(val) => { setTitle(val) }} />
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.input}>
                                    <View style={styles.iplabelwrapper}>
                                        <View style={styles.autoSizedView}>
                                            <Text style={styles.iplabel}>Company</Text>
                                        </View>
                                    </View>
                                    <TextInput style={styles.ipcont} value={company_name} onChangeText={(val) => { setCompany(val) }} />
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.input}>
                                    <View style={styles.iplabelwrapper}>
                                        <View style={styles.autoSizedView}>
                                            <Text style={styles.iplabel}>Location</Text>
                                        </View>
                                    </View>
                                    <TextInput style={styles.ipcont} value={location} onChangeText={(val) => { setlocation(val) }} />
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.input}>
                                    <View style={styles.iplabelwrapper}>
                                        <View style={styles.autoSizedView}>
                                            <Text style={styles.iplabel}>Start Date</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => { setsvisible(!s_visible) }} style={styles.ipcont}>
                                        <View >
                                            <Text style={{ textAlign: 'center', paddingVertical: responsiveHeight(0.5) }}>{start_date?.toISOString()}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {s_visible && <DateTimePicker mode='date' dateFormat='DD-MM-YYYY' value={start_date} display="calendar" minimumDate={Date.now() + 1} onChange={({ type }, val) => {
                                        setstartDate(val);
                                        setsvisible(false)
                                    }} />}
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.input}>
                                    <View style={styles.iplabelwrapper}>
                                        <View style={styles.autoSizedView}>
                                            <Text style={styles.iplabel}>End Date</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => { setevisible(!e_visible) }} style={styles.ipcont}>
                                        <View >
                                            <Text style={{ textAlign: 'center', paddingVertical: responsiveHeight(0.5) }}>{end_date?.toISOString()}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    {e_visible && <DateTimePicker mode='date' dateFormat='DD-MM-YYYY' value={end_date} display="calendar" minimumDate={Date.now() + 10} onChange={({ type }, val) => {
                                        setendDate(val);
                                        setevisible(false)
                                    }} />}
                                </Animated.View>
                                <View style={styles.input}>
                                    <View style={{ flexDirection: 'row', gap: responsiveWidth(1), flexWrap: 'wrap', }}>
                                        {skills.length > 0 && skills.map((value, index) => {
                                            return (<Animated.View entering={FadeInDown.duration(300)} key={index} exiting={FadeOutDown.duration(200)} style={{ flexDirection: 'row', backgroundColor: color.red, paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(3), borderRadius: responsiveHeight(1) }}>
                                                <TouchableOpacity onPress={() => removeSkill(value)} style={{ flexDirection: 'row', gap: responsiveWidth(4), justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: color.white, fontWeight: '700' }}>{value}</Text>
                                                    <Image source={require('../../assets/trash.png')} style={{ height: responsiveHeight(1.7), width: responsiveHeight(1.7), tintColor: color.white }} />
                                                </TouchableOpacity>

                                            </Animated.View>)
                                        })}
                                    </View>
                                </View>
                                <Animated.View entering={FadeInDown.delay(200).duration(500)} style={[styles.input]}>
                                    <View style={styles.iplabelwrapper}>
                                        <View style={styles.autoSizedView}>
                                            <Text style={styles.iplabel}>Skills</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.ipcont, { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', paddingVertical: responsiveHeight(0) }]}>
                                        <TextInput value={skill} style={{ width: responsiveWidth(60) }} onChangeText={(val) => { setskill(val) }} />
                                        <TouchableOpacity style={{ height: "100%", alignItems: 'center', backgroundColor: color.blue, paddingHorizontal: responsiveWidth(3), borderRadius: responsiveHeight(1), paddingVertical: responsiveHeight(1) }}
                                            onPress={() => {
                                                if (skill.length > 0) {
                                                    setskills(prev => {
                                                        console.log(`${skill} Skill added`);
                                                        return [...prev, skill]
                                                    })
                                                    setskill("")
                                                }
                                                console.log(skills);
                                            }}>
                                            <Text style={{ textAlign: 'center', color: color.white, fontWeight: '600', fontSize: responsiveFontSize(2) }}>Add</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.input}>
                                        <View style={{ flexDirection: 'row', gap: responsiveWidth(1), flexWrap: 'wrap', }}>
                                            {abouts.length > 0 && abouts.map((value, index) => {
                                                return (<Animated.View entering={FadeInDown.duration(300)} key={index} exiting={FadeOutDown.duration(200)} style={{ flexDirection: 'row', backgroundColor: color.red, paddingVertical: responsiveHeight(1), paddingHorizontal: responsiveWidth(3), borderRadius: responsiveHeight(1) }}>
                                                    <TouchableOpacity onPress={() => removeAbout(value)} style={{ flexDirection: 'row', gap: responsiveWidth(4), justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: color.white, fontWeight: '700' }}>{value}</Text>
                                                        <Image source={require('../../assets/trash.png')} style={{ height: responsiveHeight(1.7), width: responsiveHeight(1.7), tintColor: color.white }} />
                                                    </TouchableOpacity>

                                                </Animated.View>)
                                            })}
                                        </View>
                                    </View>
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(200).duration(500)} style={[styles.input]}>
                                    <View style={styles.iplabelwrapper}>
                                        <View style={styles.autoSizedView}>
                                            <Text style={styles.iplabel}>About Job</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.ipcont, { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap', paddingVertical: responsiveHeight(0) }]}>
                                        <TextInput value={about} style={{ width: responsiveWidth(60) }} onChangeText={(val) => { setAbout(val) }} />
                                        <TouchableOpacity style={{ height: "100%", alignItems: 'center', backgroundColor: color.blue, paddingHorizontal: responsiveWidth(3), borderRadius: responsiveHeight(1), paddingVertical: responsiveHeight(1) }}
                                            onPress={() => {
                                                if (about.length > 0) {
                                                    setAbouts(prev => {
                                                        // console.log(`${skill}`);
                                                        return [...prev, about]
                                                    })
                                                    setAbout("")
                                                }
                                                console.log(skills);
                                            }}>
                                            <Text style={{ textAlign: 'center', color: color.white, fontWeight: '600', fontSize: responsiveFontSize(2) }}>Add</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.input}>
                                    <View style={styles.iplabelwrapper}>
                                        <View style={styles.autoSizedView}>
                                            <Text style={styles.iplabel}>No of Opening</Text>
                                        </View>
                                    </View>
                                    <TextInput style={styles.ipcont} multiline={true} value={no_of_opening.toString()} keyboardType='number-pad' onChangeText={(val) => { setopening(val) }} />
                                </Animated.View>
                                <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.btnContainer}>
                                    <TouchableOpacity onPress={postInternship} style={{ height: '100%', width: "100%", alignItems: 'center', justifyContent: 'center', backgroundColor: color.blue, borderRadius: responsiveHeight(2) }} >
                                        <Text style={{ fontWeight: '700', fontSize: responsiveFontSize(2.4), letterSpacing: 1, color: '#fff' }}>Post</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback >
            {drawer ? <Drawer ref={drawerRef} setDrawer={setDrawer} /> : null
            }
            <Toast />
        </View >
    )
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1, // Allows the ScrollView to take up the entire screen height
        padding: 16, // Adjust the padding as needed
        backgroundColor: color.bg
    },
    container: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: color.bg,
    },
    logincontainer: {
        backgroundColor: color.bg,
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
        marginVertical: responsiveHeight(0.5),
    },
    ipcont: {
        borderColor: color.border,
        borderWidth: 1,
        paddingVertical: responsiveHeight(1),
        textAlign: 'center',
        borderRadius: responsiveWidth(2),
        marginTop: responsiveHeight(-1.2)
    },
    iplabel: {
        marginLeft: responsiveWidth(1.5),
        fontFamily: 'Roboto',
        fontWeight: '700',
        fontSize: responsiveFontSize(2),
        letterSpacing: 1,
        color: 'rgba(0,0,0,0.7)',
        textAlign: 'center',

        backgroundColor: color.bg,
        paddingHorizontal: responsiveWidth(3)
        // backgroundColor: '#fff'

    },
    iplabelwrapper: {
        flex: 1,
        marginLeft: responsiveWidth(1),
        flexWrap: 'wrap',
        flexDirection: 'row',
        zIndex: 4
    },
    autoSizedView: {
        alignSelf: 'flex-start'
    },

    btnContainer: {
        width: responsiveWidth(80),
        height: responsiveHeight(5),
        marginBottom: responsiveHeight(4),
        borderRadius: responsiveHeight(2),
        marginTop: responsiveHeight(2),
        backgroundColor: '#00A1C9',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        elevation: 2
    },


})
