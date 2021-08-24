import React from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    FlatList,
    StatusBar,
    Image,
    TextInput,
    TouchableOpacity,

} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const Add = ({ navigation }) => {

    const [nativeText, setNativeText] = useState('')
    const [englishTrans, setEnglishTrans] = useState('')
    const [english, setEnglish] = useState('')

    const addIem = async () => {
        const obj = {
            id: 1,
            nativeText: nativeText,
            englishTrans: englishTrans,
            english: english
        }

        try {
            const value = await AsyncStorage.getItem('data');
            const pars = JSON.parse(value) //pars is a varriable

            if (pars == null) {
                await AsyncStorage.setItem('data', JSON.stringify([obj]));
            }
            else {
                let data = [...pars, obj]
                await AsyncStorage.setItem('data', JSON.stringify(data));
                navigation.navigate('HomeScreen')
            }

        } catch (error) {
            // Error saving data
        }
    }



    return (
        <View style={styles.container}>
            <View style={styles.inputBox}>
                <Text style={styles.label}>Native</Text>
                <View style={styles.searchView}>
                    <TextInput style={styles.inputStyle}
                        keyboardType="default"
                        onChangeText={(e) => setNativeText(e)}
                    />

                </View>
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>English Translate</Text>
                <View style={styles.searchView}>
                    <TextInput style={styles.inputStyle}
                        keyboardType="default"
                        onChangeText={(e) => setEnglishTrans(e)}
                    />

                </View>
            </View>
            <View style={styles.inputBox}>
                <Text style={styles.label}>English</Text>
                <View style={styles.searchView}>
                    <TextInput style={styles.inputStyle}
                        keyboardType="default"
                        onChangeText={(e) => setEnglish(e)}
                    />

                </View>
            </View>
            
            <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, width: 60, }} onPress={() => addIem()}>
                <Text>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Add


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    inputBox: {
        marginVertical: 10
    },
    label: {
        marginVertical: 5,
        fontSize: 18
    },
    //input fields
    searchView: {
        flexDirection: 'row',

        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#c4c5c6',
        backgroundColor: 'white',
    },
    inputStyle: {
        flex: 1,
        fontSize: 20,
        marginLeft: 40,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
    },
})