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
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import uuid from 'react-native-uuid';
import { getAudioFolderPath } from '../utils/directory';

const Add = ({ navigation }) => {

    const [nativeText, setNativeText] = useState('')
    const [englishTrans, setEnglishTrans] = useState('')
    const [english, setEnglish] = useState('')
    const [recordSecs, setRecordSecs] = useState(0)
    const [recordTime, setRecordTime] = useState('0:00')
    const [currentPositionSec, setCurrentPositionSec] = useState(0)
    const [currentDurationSec, setCurrentDurationSec] = useState(0)
    const [duration, setDuration] = useState('00:00:00')
    const [startAudio, setStartAudio] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [recordDuration, setRecordDuration] = useState(0)
    const [audioUri, setAudioUri] = useState('')

    const timer = null;
    const audioRecorderPlayer = new AudioRecorderPlayer();
    audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1

    const addIem = async () => {

        const obj = {
            id: 1,
            nativeText: nativeText,
            englishTrans: englishTrans,
            english: english,
            uri: audioUri
        }
        console.log(obj);
        // try {
        //     const value = await AsyncStorage.getItem('data');
        //     const pars = JSON.parse(value) //pars is a varriable
        //     if (pars == null) {
        //         await AsyncStorage.setItem('data', JSON.stringify([obj]));
        //     }
        //     else {
        //         let data = [...pars, obj]
        //         await AsyncStorage.setItem('data', JSON.stringify(data));
        //         navigation.navigate('HomeScreen')
        //     }

        // } catch (error) {
        //     // Error saving data
        // }
    }

    const onStartRecording = async () => {
        setStartAudio(true)
        try {
            const dirAudio = await getAudioFolderPath()
            const path = `${dirAudio}/${uuid.v4()}.mp3`;
            const audioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC,
                AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                AVNumberOfChannelsKeyIOS: 2,
                AVFormatIDKeyIOS: AVEncodingOption.aac,
            };
            const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
            audioRecorderPlayer.addRecordBackListener((e) => {
                convertRecordingTimeToMinAndSec(e.currentPosition);
            });
        } catch (error) {

        }
    };

    const convertRecordingTimeToMinAndSec = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        setRecordTime(time)
        setRecordDuration(millis)
        console.log(millis);
    }

    const onStopRecord = async () => {
        console.log("stop======");
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        
        if (recordTime == '0:00') {
            setRecordSecs(0)
            setRecordTime('0:00')
            setStartAudio(false)
            setRecordDuration(0)
            setAudioUri('')

        }
        else {
            setStartAudio(false)
            setAudioUri(result)
        }


    };

    const renderAudioRecordingTime = () => {
        return (
            <View style={styles.iconContainer}>
                <Text style={styles.audioTimerText}>{recordTime}</Text>
            </View>
        )
    }

    const stopTime = () => {
        return (
            <View style={styles.iconContainer}>
                <Text style={styles.audioTimerText}>{recordTime}</Text>
            </View>
        )
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
            {startAudio ? renderAudioRecordingTime() : stopTime()}
            <View style={styles.row}>
                <TouchableOpacity style={styles.recordBtn} onPress={() => onStartRecording()}>
                    <Text style={styles.btnText}>Record</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.stopButton} onPress={() => onStopRecord()}>
                    <Text style={styles.btnText}>Stop</Text>
                </TouchableOpacity>

            </View>
            <TouchableOpacity style={{ backgroundColor: 'gray', padding: 10, width: 60, marginTop: 50 }} onPress={() => addIem()}>
                <Text style={styles.btnText}>Send</Text>
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    recordBtn: {
        backgroundColor: 'red',
        padding: 10,
    },
    stopButton: {
        backgroundColor: 'black',
        padding: 10,
    },
    btnText: {
        color: 'white'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 6,
    },
    audioTimerText: {
        color: 'black',
        fontSize: 18,
    },
})