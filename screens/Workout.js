import React from 'react';
import { View, Text } from 'react-native';

const Workout = ({ navigation }) => (
  <View>
    <Text>{navigation.state.params.workoutName}</Text>
  </View>
);

export default Workout;
