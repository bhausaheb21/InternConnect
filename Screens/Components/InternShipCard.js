import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { color } from '../../constants/constant'
import { useNavigation } from '@react-navigation/native'

function InternShipCard({ internship }) {
    const navigation = useNavigation();
    function differenceInMonths(date1, date2) {
        const diffInMilliseconds = Math.abs(date2 - date1);
        const months = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30.44));
        return months;
    }
    return (
        <View style={styles.card}>
            <Text style={{ marginTop: responsiveHeight(1), marginBottom: responsiveHeight(0.5), marginLeft: responsiveWidth(2), fontSize: responsiveFontSize(1.7), fontWeight: '700', color: 'grey' }}>Posted By {internship?.postedBy.firstName}</Text>
            <Text style={{ marginBottom: responsiveHeight(1), marginLeft: responsiveWidth(2), fontSize: responsiveFontSize(2.5), fontWeight: 'bold', }}>{internship?.title}</Text>
            <Text style={{ marginBottom: responsiveHeight(1), marginLeft: responsiveWidth(2), fontSize: responsiveFontSize(2), fontWeight: 'bold', color: 'grey' }}>{internship?.company_name}</Text>
            <View style={[styles.locationdetails]}>
                <Image source={require('../../assets/location.png')} style={{ height: responsiveHeight(2), width: responsiveHeight(2) }} />
                <Text>{internship?.location}</Text>
            </View>
            <View style={[styles.durationdetails]}>
                <View style={[styles.subdiv]}>
                    <Image source={require('../../assets/play-button.png')} style={{ height: responsiveHeight(2), width: responsiveHeight(2) }} />
                    <Text> 4 Apr- 15 Apr'24</Text>
                </View>
                <View style={[styles.subdiv]}>
                    <Image source={require('../../assets/calendar.png')} style={{ height: responsiveHeight(2), width: responsiveHeight(2) }} />
                    <Text> {differenceInMonths(new Date(internship.start_date), new Date(internship.expiry_date))} Months</Text>
                </View>
            </View>
            <View style={[styles.locationdetails]}>
                <Image source={require('../../assets/money.png')} style={{ height: responsiveHeight(2.5), width: responsiveHeight(2.5) }} />
                <Text>₹ 2500/week </Text>
            </View>
            <View style={{ width: '30%', marginLeft: responsiveWidth(2), marginBottom: responsiveHeight(1), borderRadius: 5, backgroundColor: color.border }}>
                <Text style={{ textAlign: 'center', paddingHorizontal: responsiveWidth(3), paddingVertical: responsiveHeight(0.7), flexWrap: 'wrap' }}>Internship</Text>
            </View>
            <View style={styles.controllers}>
                <TouchableOpacity style={[styles.control, { backgroundColor: color.white }]} onPress={() => {
                    navigation.navigate("Details", { internship: internship});
                    console.log("Navigating");
                }}>
                    <Text style={[styles.btn, { color: color.blue }]}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.control, { backgroundColor: color.blue }]}>
                    <Text style={[styles.btn, { color: color.white }]}>Apply Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default InternShipCard


const styles = StyleSheet.create({
    card: {
        height: responsiveHeight(39),
        borderColor: color.border,
        borderRadius : responsiveHeight(1),
        backgroundColor: color.white,
        marginVertical: responsiveHeight(.7),
        shadowColor: color.shadow,
        elevation: 10,
        marginHorizontal : responsiveWidth(2)
    },
    locationdetails: {
        flexDirection: 'row',
        marginVertical: responsiveHeight(1),
        gap: responsiveWidth(2),
        alignItems: 'center',
        marginLeft: responsiveWidth(2)
        // justifyContent:'center'
    },
    durationdetails: {
        flexDirection: 'row',
        marginLeft: responsiveWidth(2),
        // justifyContent:'space-between',
        gap: responsiveWidth(5),
        alignItems: 'center',
        marginVertical: responsiveHeight(0.5)
    },
    subdiv: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    controllers: {
        borderTopColor: color.border,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
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
    btn: {
        fontWeight: '700',
        letterSpacing: 1,
        fontFamily: 'Roboto',
        fontSize: responsiveFontSize(2)
    }
})