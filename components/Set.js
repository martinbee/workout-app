import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

const Set = ({ targetReps }) => {
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

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginRight: 10 }}>
      <View style={{ width: 50, height: 50, borderWidth: 1, borderColor: 'black'}}>
        {isDone ? <Text>{reps}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

export default Set;
