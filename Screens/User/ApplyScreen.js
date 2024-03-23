import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import Header2 from '../Components/Header2';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { color } from '../../constants/constant';
import { MaterialCommunityIcons } from '@expo/vector-icons';



export default function ApplyScreen() {
    const [selectedDocument, setSelectedDocument] = useState(null);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({});
            console.log(result)
            if (!result.canceled) {
                console.log("Picked");
                setSelectedDocument(result);
            } else {
                console.log('Document picking canceled');
            }
        } catch (error) {
            console.log('Error picking document:', error);
        }
    };
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Header2 screenname={"Application"} />
            <Text style={styles.text}>Why we should hire you ?</Text>
            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />
            <Text style={styles.text}>Why you are fit for this role?</Text>
            <TextInput
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />
            <Text style={styles.text}>Are you ready to Join Immediately ?</Text>
            <Text style={styles.text}>Attach your Resume </Text>

            {selectedDocument && <TouchableOpacity style={styles.container} onPress={() => {
                setSelectedDocument(null);
            }}>
                <MaterialCommunityIcons name="file-pdf-box" size={50} color="red" />
                <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "700" }}>{selectedDocument?.assets[0]?.name}</Text>
            </TouchableOpacity>}
            {!selectedDocument && <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.btnContainer}>
                <TouchableOpacity onPress={pickDocument} style={{ height: responsiveHeight(5), width: responsiveWidth(80), alignItems: 'center', justifyContent: 'center', backgroundColor: color.blue, borderRadius: responsiveHeight(2) }} >
                    <Text style={{ fontWeight: '700', fontSize: responsiveFontSize(2.4), letterSpacing: 1, color: color.white }}>Upload Resume</Text>
                </TouchableOpacity>
            </Animated.View>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: responsiveWidth(80),
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 8,
        gap: responsiveWidth(3),
        backgroundColor: color.white,
        marginTop: responsiveHeight(2)
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

    input: {
        marginTop: responsiveHeight(2),
        width: responsiveWidth(80),
        borderColor: color.border,
        borderWidth: 1,
        borderRadius: responsiveWidth(3),
        paddingHorizontal: 10,
        paddingTop: 10,
        fontSize: 16,
    },
    text: { textAlign: 'left', width: responsiveWidth(80), fontSize: responsiveFontSize(2), fontWeight: '600', marginTop: responsiveHeight(2) }

})
