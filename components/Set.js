import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Set = ({ targetReps, set, completedReps, workoutId }) => {
  const [reps, setReps] = useState(0);
  const [isDone, setIsDone] = useState(false);
  
  const handlePress = () => {
    if (!isDone) {
      setIsDone(true);
      setReps(targetReps);
    } else {
      if (reps === 1) {
        setIsDone(false);
      } else {
        setReps(reps - 1);
      }
    }
  };
  const backgroundColor = isDone ? 'green' : 'transparent';

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
      {isDone ? <Text style={{ textAlign: 'center', fontSize: 20 }}>{reps}</Text> : null}
    </TouchableOpacity>
  );
};

export default Set;
