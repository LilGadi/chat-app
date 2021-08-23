import React from 'react';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  
} from 'react-native';
import MainNavigator from './src/routes';

const App = () => {
 
  return (
    <View style={styles.container}>
      <MainNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default App;
