import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}
