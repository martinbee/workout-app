import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WorkoutScreen from './screens/Workout';
import EditorScreen from './screens/Editor';
import HistoryScreen from './screens/History';
import SettingsScreen from './screens/Settings';

const StatusBarSpacer = styled.View`
  flex: 1;
  margin-top: ${Constants.statusBarHeight}px;
`;

const Tab = createBottomTabNavigator();

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBarSpacer>
          <Tab.Navigator>
            <Tab.Screen name="Workout" component={WorkoutScreen} />
            <Tab.Screen name="Whiteboard" component={EditorScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </StatusBarSpacer>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}
