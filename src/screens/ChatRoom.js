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

const ChatRoom = ({ navigation }) => {
    
    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'blue' }}>
                <View style={styles.profileView}>

                </View>

                <TouchableOpacity style={{ marginLeft: 20, }}>
                    <View style={styles.ImgView}>
                        <Image source={require('../assets/play.png')} style={{ height: '100%', width: '100%' }} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, paddingVertical: 10, borderTopWidth: 2, borderTopColor: "black", borderBottomColor: "black", borderBottomWidth: 2 }}>
                <Text style={{ textAlign: 'center' }}>
                    Top comments  + click to see more
                </Text>
            </View>
        </View>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    profileView: {
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: 'green'
    },
    ImgView: {
        height: 50,
        width: 50,
    }
})