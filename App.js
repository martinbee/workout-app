import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-material-ui';
import { Navigator, NativeModules } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '@components/Home';
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

// class Test extends React.Component {
//   state = {
//     workouts: [],
//   };

//   async componentDidMount () {
//     try {
//       const querySnapshot = await firestore()
//         .collection('workouts')
//         .get();

//       this.setState({ workouts: querySnapshot.docs });
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   render() {
//     return this.state.workouts.map((workout) => {
//       if (!workout.exists) return null;

//       const { exercises } = workout.data();

//       return <View key={workout.id}>{exercises.map((id) => <Text key={id}>{id}</Text>)}</View>
//     });
//   }
// }

// const App = () => (
//   <View>
//     <Button primary text="Primary" /> 
//     <Button primary text="Primary" />
//     <Button accent text="Accent" /> 
//     <Button raised primary text="Primary" />
//     <Button disabled text="Disabled" />
//     <Test />
//   </View>
// );

const AppNavigator = createStackNavigator({
  Workout: {
    screen: Workout,
    navigationOptions: ({ navigation }) => ({
      title: `Workout ${navigation.state.params.workoutName}`,
    }),
  },
});

const App = () => {
  return (
    <ThemeContext.Provider value={getTheme(uiTheme)}>
      <Home />
    </ThemeContext.Provider>
  );
}

export default App;
