import React from 'react';
import { View, Text } from 'react-native';

import Set from '@components/Set';

const Exercise = ({ exercise, workoutId }) => {
  const {
    name,
    reps,
    sets,
    weight,
  } = exercise;

  // add update weight

  const setsArray = Object.entries(sets).map(([id, completedReps]) => ({ id, completedReps }));

  return (
    <View style={{ marginBottom: 15 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text>{name}</Text>
        <Text>{weight}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {setsArray.map(({ id, completedReps }) => (
          <Set 
            key={id} 
            set={id} 
            completedReps={completedReps} 
            targetReps={reps} 
            workoutId={workoutId}
            exerciseId={exercise.id}
          />
        ))}
      </View>
    </View>
  );
};

export default Exercise;
