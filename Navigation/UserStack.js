import React from 'react'
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Home from '../Screens/User/Home';
// import About from '../Screens/User/About';
import Internship from '../Screens/User/Internship';
import Chat from '../Screens/User/About';
import PostInternShip from '../Screens/User/PostInternShip';
import MyPosts from '../Screens/User/MyPosts';
import InternShipDetails from '../Screens/User/InternShipDetails';


const Stack = createStackNavigator()

export default function UserStack() {
    return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
                // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Example: Horizontal slide animation
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                ...TransitionPresets.SlideFromRightIOS
            }}>
                <Stack.Screen component={PostInternShip} name='Post Internship' />
                <Stack.Screen component={Internship} name='Internship' />
                <Stack.Screen component={Home} name='Home' />
                {/* <Stack.Screen component={About} name='About' /> */}
                <Stack.Screen component={Chat} name='Chats' />
                <Stack.Screen component={MyPosts} name='My Posts' />
                <Stack.Screen component={InternShipDetails} name='Details' />
            </Stack.Navigator>
    )
}
