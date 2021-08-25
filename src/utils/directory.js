import { Platform } from 'react-native';
const RNFS = require('react-native-fs');

function getAudioFolderPath() {
  return new Promise((resolve, reject) => {
    //make audio folder in app folder
    const AppFolder = 'ChatApp';
    const AudioDirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder + '/audio';
    //create path 
    const dirHomeAudio = Platform.select({
      ios: 'hello.m4a',
      android: AudioDirectoryPath,
    });
    resolve(dirHomeAudio)

  })
}

function createDirectory() {
  return new Promise((resolve, reject) => {
    //make app folder
    const AppFolder = 'ChatApp';
    const DirectoryPath = RNFS.ExternalStorageDirectoryPath + '/' + AppFolder;
    RNFS.mkdir(DirectoryPath);

    //make audio folder in app folder
    const audioFolder = 'audio';
    const AudioDirectoryPath = DirectoryPath + '/' + audioFolder;
    RNFS.mkdir(AudioDirectoryPath);

    resolve(true)
  })
}

export {
  createDirectory,
  getAudioFolderPath,
}