import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-material-ui';
import { Navigator, NativeModules } from 'react-native';

import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

// you can set your style right here, it'll be propagated to application
const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};
const App = () => (
  <View>
    <Button primary text="Primary" /> 
    <Button primary text="Primary" />
    <Button accent text="Accent" /> 
    <Button raised primary text="Primary" />
    <Button disabled text="Disabled" />
    <Text>Test</Text>
  </View>
);

const Main = () => {
  return (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
      <App />
    </ThemeContext.Provider>
  );
}

export default Main;