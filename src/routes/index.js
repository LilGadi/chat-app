import React from 'react';
import { Dimensions } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AuthNavigator } from './auth-stack';
import { HomeStackNavigator } from './home-stack';


const RootNavigator = createSwitchNavigator({

    InitailScreen: AuthNavigator,
    HomeScreen: HomeStackNavigator
    
})

const MainNavigator = createAppContainer(RootNavigator);

export default MainNavigator;