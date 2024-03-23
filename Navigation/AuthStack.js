import React, { useContext, useState } from 'react'
import { createStackNavigator, cardStyleInterpolator, TransitionPresets } from '@react-navigation/stack'
import Login from '../Screens/Auth/Login'
import SignUp from '../Screens/Auth/Signup'


const Stack = createStackNavigator()
function AuthStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            // cardStyleInterpolator: cardStyleInterpolator.forHorizontalIOS, // Example: Horizontal slide animation
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS
        }}>
            <Stack.Screen component={Login} name='Login' />
            <Stack.Screen component={SignUp} name='SignUp' />
        </Stack.Navigator>
    )
}

export default AuthStack
