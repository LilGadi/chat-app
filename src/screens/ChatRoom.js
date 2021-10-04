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
import * as AudioManager from '../components/AudioManager';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const screenWidth = Dimensions.get('screen').width;
const ChatRoom = ({ navigation }) => {
    const uri = navigation.getParam('url');
    const [playDuration, setPlayDuration] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPositionSec, setCurrentPos] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const audioRecorderPlayer = new AudioRecorderPlayer();
    const [isPause, setIsPause] = useState(true);
    const [comments, setComments] = useState('')
    audioRecorderPlayer.setSubscriptionDuration(0.1);

    const pauseAudio = async () => {
        await AudioManager.pausePlayer();
        setIsPause(true);
        setIsPlaying(false);
    };

    const onStartPlay = async (URL) => {
        const path = Platform.select({
            ios: 'hello.m4a',
            android: URL,
        });

        await AudioManager.startPlayer(path, (res) => {
            const { status } = res;;
            switch (status) {
                case AudioManager.AUDIO_STATUS.begin: {
                    console.log('BEGIN AUDIO');
                    setIsPlaying(true);
                    break;
                }
                case AudioManager.AUDIO_STATUS.play: {
                    const { currentPosition, duration } = res.data;
                    setCurrentPos(currentPosition);
                    setDuration(duration);
                    millisToMinutesAndSeconds(currentPosition);
                    break;
                }
                case AudioManager.AUDIO_STATUS.pause: {
                    console.log('PAUSE AUDIO');
                    setIsPause(true);
                    setIsPlaying(false);
                    break;
                }
                case AudioManager.AUDIO_STATUS.resume: {
                    console.log('RESUME AUDIO');
                    setIsPause(false);
                    setIsPlaying(true);
                    break;
                }
                case AudioManager.AUDIO_STATUS.stop: {
                    console.log('STOP AUDIO');
                    setIsPlaying(false);
                    setIsPause(false);
                    break;
                }
            }
        });
    };

    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        setPlayDuration(time);
    };
    const addComments = () =>{
        console.log(comments);
    }
    let playWidth =
        (currentPositionSec / duration) *
        (screenWidth - 200);

    if (!playWidth) {
        playWidth = 0;
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <View style={styles.profileView}>

                </View>
                <View style={styles.recordingView}>
                    <TouchableOpacity onPress={() => isPlaying ? pauseAudio() : onStartPlay(uri)}>
                        <View style={styles.ImgView}>
                            <Image source={
                                isPlaying
                                    ? require('../assets/pause.png')
                                    : require('../assets/play.png')
                            }
                                style={{ height: '100%', width: '100%' }} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.progressView}>

                        <TouchableOpacity style={styles.viewBarWrapper}>
                            <View style={styles.viewBar}>
                                <View style={[styles.viewBarPlay, { width: playWidth }]} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.duration}>
                            {currentPositionSec ? playDuration : '0.00'}
                        </Text>
                    </View>
                </View>

            </View>
            <View style={{ flexDirection: "row", alignItems: 'center', width: 100, paddingVertical: 10, alignSelf: 'flex-end' }}>
                <Image source={require('../assets/like.png')} style={{ height: 50, width: 50 }} resizeMode="contain" />
                <Text>Like</Text>
            </View>
            <View style={styles.commentHeading}>
                <Text style={{ textAlign: 'center' }}>
                    Top comments  + click to see more
                </Text>

            </View>
            <View style={styles.searchView}>
                <TextInput style={styles.inputStyle}
                    placeholder="Type a comment here"
                    keyboardType="default"
                onChangeText={(e) => setComments(e)}
                />
                <TouchableOpacity style={styles.touchableButton} onPress={() => addComments()}>
                    <Image source={require('../assets/send-icon.png')} style={styles.buttonImage} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ChatRoom

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    profileView: {
        height: 100,
        width: 100,
        borderRadius: 100,
        backgroundColor: 'green'
    },
    progressView: {
        flex: 1, marginHorizontal: 10
    },
    recordingView: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 20,

    },
    ImgView: {
        height: 50,
        width: 50,
        backgroundColor: 'white'
    },
    viewBarWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    viewBar: {
        backgroundColor: '#ccc',
        height: 4,
        alignSelf: 'stretch',
    },

    viewBarPlay: {
        backgroundColor: 'black',
        height: 4,
        width: 0,
    },
    commentHeading: {
        marginTop: 20,
        paddingVertical: 10,
        borderTopWidth: 2,
        borderTopColor: "black",
        borderBottomColor: "black",
        borderBottomWidth: 2
    },
    //input fields
    searchView: {

        marginTop: 50,
        flexDirection: 'row',
        marginHorizontal: 5,
        alignSelf: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#c4c5c6',
        backgroundColor: 'white',
        width: '100%'
    },
    inputStyle: {
        flex: 1,
        fontSize: 20,
        marginLeft: 10,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'gray',
        backgroundColor: 'white'
    },
    touchableButton: {
        position: 'absolute',
        right: 3,
        height: 50,
        width: 55,
        justifyContent: 'center',
        padding: 4,
        alignItems: 'center',
        
    },
    buttonImage: {
        height: '100%',
        width: '100%',
    },
})