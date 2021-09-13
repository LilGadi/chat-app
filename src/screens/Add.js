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

class Add extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recordSecs: 0,
            recordTime: '0:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            duration: '00:00:00',
            startAudio: false,
            currentTime: 0,
            recordDuration: 0,
            audioUri: '',
            cursorColor: 'black',
            nativeText: '',
            englishTrans: '',
            english: ''
        };
        this.timer = null;
        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }

    addIem = async () => {
        const { nativeText, english, englishTrans, audioUri } = this.state
        const obj = {
            id: 1,
            nativeText: nativeText,
            englishTrans: englishTrans,
            english: english,
            uri: audioUri
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

    onStartRecording = async () => {
        this.setState({
            startAudio: true,
            recordDuration: 0
        });
        try {
            const dirAudio = await getAudioFolderPath()
            const path = `${dirAudio}/${uuid.v4()}.mp3`;
            const meteringEnabled = false;
            const audioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC,
                AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                AVNumberOfChannelsKeyIOS: 2,
                AVFormatIDKeyIOS: AVEncodingOption.aac,
            };
            const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet, meteringEnabled);
            this.audioRecorderPlayer.addRecordBackListener((e) => {
                this.convertRecordingTimeToMinAndSec(e.currentPosition);
            });
        } catch (error) {

        }
    };

    convertRecordingTimeToMinAndSec(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        this.setState({ recordTime: time, recordDuration: millis });
    }

    onStopRecord = async () => {
        const { audioUri, recordTime, recordDuration } = this.state
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        if (recordTime == '0:00') {
            this.setState({
                recordSecs: 0,
                recordTime: '0:00',
                startAudio: false,
                recordDuration: 0,
                audioUri: ''
            });
        }
        else {
            this.setState({ audioUri: result })
        }
    };

    renderAudioRecordingTime = () => {
        const { recordTime } = this.state
        return (
            <View style={styles.iconContainer}>
                <Text style={styles.audioTimerText}>{recordTime}</Text>
            </View>
        )
    }

    stopTime = () => {
        const { recordTime } = this.state
        return (
            <View style={styles.iconContainer}>
                <Text style={styles.audioTimerText}>{recordTime}</Text>
            </View>
        )
    }

    render() {
        const { startAudio } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.inputBox}>
                    <Text style={styles.label}>Native</Text>
                    <View style={styles.searchView}>
                        <TextInput style={styles.inputStyle}
                            keyboardType="default"
                            onChangeText={(e) => this.setState({ nativeText: e })}
                        />

                    </View>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.label}>English Translate</Text>
                    <View style={styles.searchView}>
                        <TextInput style={styles.inputStyle}
                            keyboardType="default"
                            onChangeText={(e) => this.setState({ englishTrans: e })}
                        />

                    </View>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.label}>English</Text>
                    <View style={styles.searchView}>
                        <TextInput style={styles.inputStyle}
                            keyboardType="default"
                            onChangeText={(e) => this.setState({ english: e })}
                        />

                    </View>
                </View>
                {startAudio ? this.renderAudioRecordingTime() : this.stopTime()}
                <View style={styles.row}>
                    <TouchableOpacity style={styles.recordBtn} onPress={() => this.onStartRecording()}>
                        <Text style={styles.btnText}>Record</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.stopButton} onPress={() => this.onStopRecord()}>
                        <Text style={styles.btnText}>Stop</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={{ backgroundColor: 'gray', padding: 10, width: 60, marginTop: 50 }} onPress={() => this.addIem()}>
                    <Text style={styles.btnText}>Send</Text>
                </TouchableOpacity>
            </View>
        )
    }
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