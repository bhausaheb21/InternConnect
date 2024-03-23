import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header2 from '../Components/Header2'
import { color } from '../../constants/constant'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

function InternShipDetails() {
    return (
        <View style={styles.container}>
            <Header2 screenname={"Details"} />
            <View style={{ marginLeft: responsiveWidth(3) }}>
                <Text style={styles.title}>Title</Text>
                <Text style={{ fontSize: responsiveFontSize(2) }}>Software Engineering Intern</Text>
                <Text style={[styles.title,{marginTop : responsiveHeight(1.3)}]}>Location</Text>
                <Text style={{ fontSize: responsiveFontSize(2) }}>Pune</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    title: {
        fontFamily: "Roboto",
        fontSize: responsiveFontSize(2.4),
        fontWeight: "800",
        letterSpacing: 1,
        marginBottom: responsiveHeight(0.4)
    }
})

export default InternShipDetails
