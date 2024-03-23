import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header2 from '../Components/Header2'
import { color } from '../../constants/constant'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

function InternShipDetails({ route }) {
    const { internship } = route.params;
    const navigation = useNavigation();
    useEffect(() => {
        console.log(internship.start_date);
    }, [])

    return (
        <View style={styles.container}>
            <Header2 screenname={"Details"} />

            <View style={{ marginLeft: responsiveWidth(3) }}>
                <Text style={styles.title}>Title</Text>
                <Text style={{ fontSize: responsiveFontSize(2) }}>{internship?.title}</Text>
                <Text style={[styles.title, { marginTop: responsiveHeight(1.3) }]}>Company Name</Text>
                <Text style={{ fontSize: responsiveFontSize(2) }}>{internship?.company_name}</Text>
                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(1.5), gap: responsiveWidth(2.5), alignItems: 'center' }}>
                    <Image source={require('../../assets/location.png')} style={{ width: responsiveHeight(2), height: responsiveHeight(2) }} />
                    <Text style={{ fontSize: responsiveFontSize(2) }}>{internship?.location}</Text>
                </View>
                <View style={{ marginTop: responsiveHeight(1.0), flexDirection: 'row', gap: responsiveWidth(3) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(2.5) }}>
                        <Image source={require('../../assets/play-button.png')} style={{ height: responsiveHeight(2), width: responsiveHeight(2) }} />
                        <Text style={{ fontSize: responsiveFontSize(2) }}>Starts Immediately</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: responsiveWidth(2.5) }}>
                        <Image source={require('../../assets/money.png')} style={{ marginTop: responsiveHeight(0.3), height: responsiveHeight(2.5), width: responsiveHeight(2.5) }} />
                        <Text style={{ fontSize: responsiveFontSize(2) }}>15000/Month</Text>
                    </View>
                </View>
                <Text style={[styles.title, { marginTop: responsiveHeight(1.3) }]}>Job Type</Text>
                <Text style={{ fontSize: responsiveFontSize(2) }}>Internship</Text>

                <View style={{ marginTop: responsiveHeight(2), borderTopWidth: 1, borderTopColor: color.border, paddingTop: responsiveHeight(1) }}>
                    <Text style={[styles.title, { fontSize: responsiveFontSize(2.3) }]}>Skills</Text>
                    {internship && <FlatList
                        data={internship.skills}
                        renderItem={({ item }) => {
                            return <Text style={{ marginLeft: responsiveWidth(7), marginTop: responsiveHeight(0.5), fontWeight: '600', fontSize: responsiveFontSize(2) }}>{`\u2022`}   {item}</Text>
                        }} />}
                </View>
                <View style={{ marginTop: responsiveHeight(2), borderTopWidth: 1, borderTopColor: color.border, paddingTop: responsiveHeight(1) }}>
                    <Text style={[styles.title, { fontSize: responsiveFontSize(2.3) }]}>About</Text>
                    {internship && <FlatList
                        data={internship.About}
                        renderItem={({ item }) => {
                            return <Text style={{ marginLeft: responsiveWidth(2), marginTop: responsiveHeight(0.5), fontWeight: '600', fontSize: responsiveFontSize(2) }}>{`\u2022`}   {item}</Text>
                        }} />}
                </View>
                <Text style={{ fontSize: responsiveFontSize(2), marginTop: responsiveHeight(2) }}><Text style={{ fontWeight: 'bold' }}>No of Openings : </Text>{internship?.no_of_opening}</Text>
            </View>
            <TouchableOpacity onPress={()=>{
                navigation.navigate('Apply')
            }} style={[styles.control, { marginTop: responsiveHeight(2.5), backgroundColor: color.blue, marginHorizontal: responsiveWidth(5) }]}>
                <Text style={[styles.btn, { color: color.white, textAlign: 'center', fontSize: responsiveFontSize(2), fontWeight: '800' }]}>Apply Now</Text>
            </TouchableOpacity>
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
    },
    control: {
        padding: responsiveWidth(3),
        borderRadius: 3,
        paddingHorizontal: responsiveWidth(8),
        shadowColor: color.shadow,
        elevation: 10,
        marginHorizontal: responsiveWidth(1),
        marginTop: responsiveHeight(1)
    },
})

export default InternShipDetails
