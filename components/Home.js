import React from 'react';
import { Button } from 'react-native-material-ui';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

const Home = ({ navigation }) => (
  <View>
    <Text>Workouts</Text>
    <Button primary text="Primary" onPress={() => navigation.navigate('Workout', { workoutName: 'test' })} /> 
  </View>
);

export default withNavigation(Home);
