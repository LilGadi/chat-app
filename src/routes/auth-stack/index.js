import { Platform } from 'react-native';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import LoginScreen from '../../screens/auth/login';
import OptionScreen from '../../screens/auth/option';
import RegisterScreen from '../../screens/auth/register';

const AuthNavigator = createStackNavigator({

    OptionScreen: {
        screen: OptionScreen,
        navigationOptions: ({ navigation }) => ({
            safeAreaInsets: { top: 0 },
            headerTitle: '',
        }),
    },
    login:{
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
           headerShown: false
        }),
    },
    register: {
        screen: RegisterScreen,
        navigationOptions: {
            safeAreaInsets: { top: 0 },
            headerTitle: '',
        },
    }
},
    {
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        },
    },
);

export {
    AuthNavigator
}