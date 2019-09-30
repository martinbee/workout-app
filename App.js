import React from 'react';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import WorkoutsList from '@screens/WorkoutsList';
import Workout from '@screens/Workout';

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

const RootStack = createStackNavigator(
  {
    WorkoutsList: {
      screen: WorkoutsList,
      navigationOptions: ({ navigation }) => ({
        title: 'Choose a Workout',
      }),
    },
    Workout: {
      screen: Workout,
      navigationOptions: ({ navigation }) => ({
        title: `Workout ${navigation.state.params.workoutName}`,
      }),
    },
  },
  {
    initialRouteName: 'WorkoutsList',
  },
);

const AppNavigationContainer = createAppContainer(RootStack);

const App = () => {
  return (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
      <AppNavigationContainer />
    </ThemeContext.Provider>
  );
};

export default App;
