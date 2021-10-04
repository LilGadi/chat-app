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
    TouchableOpacity, Dimensions
} from 'react-native';


const OptionScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('login')}>
                    <Text style={styles.btnText}>
                        Sign in
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('register')}>
                    <Text style={styles.btnText}>
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.socailbtn}>
                <Text style={styles.socailBtnText}>
                    Login with Facebook
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socailbtn}>
                <Text style={styles.socailBtnText}>
                    Twitter
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socailbtn}>
                <Text style={styles.socailBtnText}>
                    Google
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default OptionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        // alignItems:'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: 'blue',
        paddingVertical: 20,
        paddingHorizontal: 50
    },
    btnText: {
        color: 'white'
    },
    socailbtn: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
        backgroundColor: 'blue'
    },
    socailBtnText: {
        color: 'white'
    },
})