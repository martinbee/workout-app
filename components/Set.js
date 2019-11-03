import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Set = ({ 
  targetReps, 
  set, 
  completedReps, 
  workoutId, 
  exerciseId,
}) => {
  const handlePress = async () => {
    const setPath = `exercises.${exerciseId}.sets.${set}`;

    if (!completedReps) {
      await firestore()
        .collection('workouts')
        .doc(workoutId)
        .update({
          [setPath]: targetReps,
        });
    } else {
      await firestore()
        .collection('workouts')
        .doc(workoutId)
        .update({
          [setPath]: completedReps - 1,
        });
    }
  };

  const backgroundColor = completedReps ? 'green' : 'transparent';

  return (
    <TouchableOpacity onPress={handlePress} style={{ 
      marginRight: 10,
      width: 40, 
      height: 40, 
      borderWidth: 1, 
      borderColor: 'black',
      backgroundColor,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {completedReps ? <Text style={{ textAlign: 'center', fontSize: 20 }}>{completedReps}</Text> : null}
    </TouchableOpacity>
  );
};

export default Set;
