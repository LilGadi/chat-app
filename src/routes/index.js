import React from 'react';
import { Dimensions } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Add from '../screens/Add';
import ChatRoom from '../screens/ChatRoom';
import Home from '../screens/Home';

const RootNavigator = createStackNavigator({
    HomeScreen: {
        screen: Home,
        navigationOptions: {
            headerShown: false
        }
    },
    ChatRoomScreen: {
        screen: ChatRoom,
        navigationOptions: {
            // headerShown: false
            headerTitle: '', 
        }
    },
    AddScreen:{
        screen: Add,
        navigationOptions:{
            headerTitle: '',
        
        }
    }

},
    {
        defaultNavigationOptions: {
            ...TransitionPresets.SlideFromRightIOS,
        }
    })

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;