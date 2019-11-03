import React from 'react';
import { View, Text } from 'react-native';

import Set from '@components/Set';

const Exercise = ({ exercise }) => {
  const {
    name,
    reps,
    sets,
    weight,
  } = exercise;

  return (
    <View style={{ marginBottom: 15 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text>{name}</Text>
        <Text>{weight}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {new Array(sets).fill(1).map((_, index) => <Set key={index} targetReps={reps} />)}
      </View>
    </View>
  );
};

export default Exercise;
