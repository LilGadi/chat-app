import React from 'react';
import { useState, useEffect } from 'react';
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
import { askForPermission } from '../utils/permission';
import { createDirectory } from '../utils/directory';

const Home = ({ navigation }) => {
    let [data, setData] = useState([])
    const [text, setText] = useState('')
    const [result, setResult] = useState('')
    
    useEffect(() => {
        checkPermission()
        const listener = navigation.addListener('didFocus',
        () => {
            _retrieveData()
        }
        )
        return function cleanup() {
            listener.remove();
        };
        
    }, [])

    const checkPermission = async () => {
        try {
            const res = await askForPermission()
            console.log("res========",res);
            if (res) {
                await createDirectory()
            }
            
        } catch (error) {
            console.log("permission not given from patient home=======", error);
        }
    }

    const search = (e) => {
        let result = data.filter((elm) => {
            return elm.text.includes(e);
        })
        setResult(result)
        setText(e)
    }

    const goToChatRoom = () => {
        navigation.navigate('ChatRoomScreen')
    }

    const goToAdd = () => {
        navigation.navigate('AddScreen')
    }

    const _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('data');
            if (value !== null) {
                // We have data!!

                setData(JSON.parse(value))
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    const arr = text.length ? result : data;

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", backgroundColor: 'white', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.searchView}>
                    <TextInput style={styles.inputStyle}
                        placeholder="Search Conversation"
                        keyboardType="default"
                        onChangeText={(e) => search(e)}
                    />

                </View>
                <TouchableOpacity style={{ backgroundColor: 'white', paddingVertical: 10 }} onPress={() => goToAdd()}>
                    <Text>ADD</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.flatListStyle}>
                <FlatList
                    data={arr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.row} onPress={() => goToChatRoom()}>
                                <Text>{item.english}  {item.englishTrans}  {item.nativeText}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    //input fields
    searchView: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#c4c5c6',
        backgroundColor: 'white',
        width: '80%'
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
    row: {
        backgroundColor: 'red',
        marginVertical: 5,
        paddingVertical: 20
    },
    flatListStyle: {
        flex: 1, backgroundColor: 'white', paddingVertical: 10
    }

})

export default Home;
