import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { color } from '../../constants/constant';


function Header2({ screenname }) {

    const navigation = useNavigation();

    return (
        <View style={{ height: responsiveHeight(7), flexDirection: 'row', backgroundColor: color.white, width: responsiveWidth(100) }}>
            <TouchableOpacity style={styles.backicon} onPress={() => {
                navigation.goBack();
            }}>
                <Image source={require('../../assets/left-arrow.png')} style={{ height: responsiveHeight(3.3), width: responsiveHeight(3.3) }} />
                <Text style={{ fontSize: responsiveFontSize(2.6), fontWeight: '700', letterSpacing: 1 }}>{screenname}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    backicon: {
        // alignItems:'center',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', gap: responsiveWidth(4),
        marginLeft: responsiveWidth(2)
    }
})

export default Header2
