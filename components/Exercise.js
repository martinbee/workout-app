import React from 'react';
import { View, Text } from 'react-native';

const Exercise = ({ exercise }) => {
  const {
    name,
    reps,
    sets,
    weight,
  } = exercise;

  return (
    <View>
      <Text>{name}</Text>
      <Text>{reps}</Text>
      <Text>{sets}</Text>
      <Text>{weight}</Text>
    </View>
  );
};

export default Exercise;
