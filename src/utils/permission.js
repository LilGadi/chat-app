import { PermissionsAndroid, Platform, Alert } from "react-native";

function askForPermission() {
    return new Promise(async (resolve, reject) => {
        if (Platform.OS !== 'android') {
            resolve(true)
        }
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the storage');
                    resolve(true)

                } else {
                    reject(false)
                }
            } catch (err) {
                console.warn(err);
            }
        }
    })

}

function askForAudioPermission() {
    return new Promise(async (resolve, reject) => {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    resolve(true)

                } else {
                    reject(false)
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    })

}

export {
    askForPermission,
    askForAudioPermission
}