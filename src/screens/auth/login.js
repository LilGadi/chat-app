import React, { useState } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
import { login } from '../../config/firebase'


const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [hidePassword, setHidePassword] = useState(true)

    const onLogin = async () => {
        try {
            const res = await login(email, pwd)
            console.log(res);
            navigation.navigate('HomeScreen')
        } catch (error) {

        }
    }

    const togglePassword = () => {
        setHidePassword(!hidePassword)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.headerText}>Create New Account</Text>
                </View>
                <View style={styles.inputContainer}>
                    <KeyboardAvoidingView>
                        <View style={styles.inputSection}>
                            <TextInput
                                placeholder="Email / Phone number"
                                style={styles.inputBox}
                                onChangeText={(e) => setEmail(e)}
                            />
                        </View>
                        <View style={[styles.inputSection, { justifyContent: 'center', alignItems: 'center' }]}>
                            <View style={{ flex: 1 }}>

                                <TextInput
                                    onChangeText={(e) => setPwd(e)}
                                    secureTextEntry={hidePassword}
                                    placeholder="Password"
                                    style={styles.inputBox}
                                />
                            </View>
                            <TouchableOpacity onPress={() => togglePassword()} style={{ backgroundColor: 'yellow' }}>
                                {hidePassword ?
                                    <Image source={require('../../assets/greenview.png')} />
                                    :
                                    <Image source={require('../../assets/greenview.png')} />
                                }
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => onLogin()}>
                            <Text style={styles.buttonTextStyle}>
                                Login

                            </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 18
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
    },
    inputSection: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        marginVertical: 10
    },
    inputBox: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        // fontFamily: Fonts.medium,
        fontSize: 14,
        height: 45,
    },
    buttonStyle: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 30,
        width: '100%',
        marginTop: 8,
        backgroundColor: 'red',
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: 16,
        // fontFamily: font.fonts.RalewayBold,
    },
})