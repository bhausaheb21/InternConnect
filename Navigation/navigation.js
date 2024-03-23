import { NavigationContainer } from "@react-navigation/native";

import React, { useContext } from 'react'
import AuthStack from "./AuthStack";
import { AuthContext } from "../Context/AuthContext";
import UserStack from "./UserStack";
import { StatusBar } from "react-native";

function Navigation() {
    const { isAutheticated } = useContext(AuthContext)
    return (

        <NavigationContainer>
            <StatusBar backgroundColor={'#fff'} />
            {
                !isAutheticated ?
                    <AuthStack />
                    : <UserStack />
            }
        </NavigationContainer>

    )
}

export default Navigation
