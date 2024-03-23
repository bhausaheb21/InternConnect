import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { ip } from '../constants/constant'
import Toast from 'react-native-toast-message'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
// import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext()

export const AuthProvider = ({ childrens }) => {
    // const navigation = useNavigation();
    const [name, setname] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [token, setToken] = useState(null)
    const [isAutheticated, setisauthenticated] = useState(false)
    const [Loading, setLoading] = useState(true)
    // const [drawer,setDrawer] = useState(false);

    useEffect(() => {
        setLoading(true)
        const getUser = async () => {
            const res = await AsyncStorage.getItem('user')
            if (res) {
                const user = JSON.parse(res);
                setEmail(user.email)
                setToken(user.token)
                setisauthenticated(true)
                setname(user.name)
                setLoading(false)
            }
        }
        getUser()
        setLoading(false)
    }, [])

    const register = (email, password, name) => {
        // setLoading(true);
        console.log(email, password, name)

        fetch(`http://${ip}:5001/auth/signup`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: name, email, password
            })
        })
            .then(res => {
                if (res.status == 201)
                    return res.json()

                return Promise.reject(new Error("Validation failed"));
            })
            .then(resData => {
                console.log(resData);
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Signup Successful',
                    text1Style: { fontSize: responsiveFontSize(2), letterSpacing: 1 },
                    autoHide: 2000
                })
                navigation.navigate('Login')
            })
            .catch(err => {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: err.message,
                    text1Style: { fontSize: responsiveFontSize(2), letterSpacing: 1 },
                    autoHide: 2000
                })
                console.log(err);
            })
    }

    const login = (email, password) => {
        setLoading(true)
        console.log(email, password)
        fetch(`http://${ip}:5001/auth/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            })
            .then(response => {
                // console.log(response);
                if (response.status == 200 || response.status == 201)
                    return response.json();
                return Promise.reject(new Error("Invalid Credentials"))
            })
            .then(res => {
                console.log(res);
                AsyncStorage.setItem('user', JSON.stringify(res));
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Login Successful',
                    text1Style: { fontSize: responsiveFontSize(2), letterSpacing: 1 },
                    autoHide: 2000
                })
                setTimeout(() => {
                    setLoading(false)
                    setEmail(res.email)
                    setname(res.name);
                    setToken(res.token)
                    setisauthenticated(true)
                }, 2000)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: err.message,
                    text1Style: { fontSize: responsiveFontSize(2), letterSpacing: 1 },
                    autoHide: 2000
                })
            })
    }

    const logout = () => {
        setEmail(undefined)
        setname(undefined)
        setToken(undefined)
        setisauthenticated(false)

        AsyncStorage.removeItem('user')

    }
    return (
        Loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size={50} color={'skyblue'} /><Toast /></View> :
            <AuthContext.Provider value={{ isAutheticated, email, name, token, login, logout, register}}>
                {childrens}
                <Toast />
            </AuthContext.Provider>
    )
}

